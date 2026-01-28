package watchlist

import (
	"context"
	"encoding/json"
	"log/slog"
	"time"

	"github.com/ThreeDotsLabs/watermill"
	"github.com/ThreeDotsLabs/watermill/message"
	"github.com/ThreeDotsLabs/watermill/message/router/middleware"
	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/goa_gen/gen/watchlist"
	"github.com/reidlai/ta-workspace/modules/watchlist/go/mocks"
)

const ReplyToMetadataKey = "reply_to"

// WatermillPublisher is an interface to decouple from concrete NATS publisher implementation
type WatermillPublisher interface {
	Publish(topic string, messages ...*message.Message) error
	Close() error
}

// WatermillSubscriber is an interface to decouple from concrete NATS subscriber implementation
type WatermillSubscriber interface {
	Subscribe(ctx context.Context, topic string) (<-chan *message.Message, error)
	Close() error
}

// watchlist service implementation.
type watchlistsrvc struct {
	logger     *slog.Logger
	publisher  WatermillPublisher
	subscriber WatermillSubscriber
}

// Verify that watchlistsrvc implements watchlist.Service.
var _ genwatchlist.Service = (*watchlistsrvc)(nil)

// NewWatchlist returns the watchlist service implementation.
// If useMockData is true, it returns the mock service.
func NewWatchlist(logger *slog.Logger, publisher WatermillPublisher, subscriber WatermillSubscriber, useMockData bool) genwatchlist.Service {
	if useMockData {
		return mocks.NewWatchlistMock(logger)
	}

	svc := &watchlistsrvc{
		logger:     logger,
		publisher:  publisher,
		subscriber: subscriber,
	}

	// Start Skeleton Worker (T011)
	// In a real app, this might be split out, but for this task/MVP we run it here.
	// We run it in a goroutine so it doesn't block startup if synchronous.
	// However, Routers in Watermill usually need to be running.
	go svc.startWorker()

	return svc
}

func (s *watchlistsrvc) startWorker() {
	// Refactored to use Watermill Router for Middleware support (T014, T015)
	logger := watermill.NewSlogLogger(s.logger)
	router, err := message.NewRouter(message.RouterConfig{}, logger)
	if err != nil {
		s.logger.Error("Failed to create router", "error", err)
		return
	}

	// T014: Add Retry functionality (Exponential Backoff)
	router.AddMiddleware(
		middleware.Retry{
			MaxRetries:      5,
			InitialInterval: time.Millisecond * 100,
			MaxInterval:     time.Second,
			Multiplier:      2,
			Logger:          logger,
		}.Middleware,
	)

	// T015: Add Poison Queue Middleware
	// Note: PoisonQueue requires a publisher to publish to the DLQ.
	pq, err := middleware.PoisonQueue(s.publisher, "dlq.watchlist.ticker.add")
	if err != nil {
		s.logger.Error("Failed to create poison queue middleware", "error", err)
		return
	}
	router.AddMiddleware(pq)

	ctx := context.Background()
	topic := "us.finance.watchlist.ticker.add"

	// Add Handler
	router.AddNoPublisherHandler(
		"watchlist_ticker_add_handler",
		topic,
		s.subscriber,
		func(msg *message.Message) error {
			s.logger.Info("Worker received message", "uuid", msg.UUID)

			// Echo Reply if ReplyTo is set (Request/Reply pattern)
			replyTopic := msg.Metadata.Get(ReplyToMetadataKey)
			if replyTopic != "" {
				s.logger.Info("Worker sending reply", "reply_topic", replyTopic)

				// Send empty success reply
				replyMsg := message.NewMessage(watermill.NewUUID(), []byte(`{"status":"ok"}`))
				replyMsg.Metadata.Set("correlation_id", msg.Metadata.Get("correlation_id"))

				if err := s.publisher.Publish(replyTopic, replyMsg); err != nil {
					s.logger.Error("Worker failed to reply", "error", err)
					return err // Return error to trigger Retry
				}
			}
			return nil
		},
	)

	// Run Router
	if err := router.Run(ctx); err != nil {
		s.logger.Error("Router failed", "error", err)
	}
}

// GetWatchlist returns mock watchlist data.
// This function implements the Sync Request/Reply pattern (FR-004).
func (s *watchlistsrvc) GetWatchlist(ctx context.Context) (res *genwatchlist.Watchlist, err error) {
	s.logger.InfoContext(ctx, "GetWatchlist: Starting sync request")

	// 1. Prepare Request
	correlationID := watermill.NewUUID()
	// Unique reply subject for this request (or use a shared reply subject with subscription filtering)
	// For simplicity in NATS, we can use a unique inbox or specific subject.
	// Here we use a specific subject pattern.
	replyTopic := "us.finance.watchlist.reply." + correlationID
	
	msg := message.NewMessage(correlationID, nil) // Empty payload for Get
	msg.Metadata.Set("correlation_id", correlationID)
	// Watermill Middleware/Convention for Request/Reply
	msg.Metadata.Set(ReplyToMetadataKey, replyTopic)

	// 2. Subscribe to Reply Topic (BEFORE Publishing to avoid race)
	// Note: In NATS, we can use wildcards or ephemeral subscriptions.
	// Using the injected generic subscriber.
	// IMPORTANT: Subscribe might be blocking or async depending on implementation.
	// Standard Watermill Subscribe returns a channel.
	subCtx, cancel := context.WithCancel(ctx)
	defer cancel()

	msgs, err := s.subscriber.Subscribe(subCtx, replyTopic)
	if err != nil {
		s.logger.ErrorContext(ctx, "Failed to subscribe to reply topic", "error", err)
		return nil, genwatchlist.InternalError("Failed to prepare response channel")
	}

	// 3. Publish Request
	subject := "us.finance.watchlist.ticker.add" // Reusing same subject for demo, acting as "Get" trigger
	// In reality, this should be a different subject like "us.finance.watchlist.get"
	
	if err := s.publisher.Publish(subject, msg); err != nil {
		s.logger.ErrorContext(ctx, "Failed to publish request", "error", err)
		return nil, genwatchlist.InternalError("Failed to send request")
	}

	// 4. Wait for Reply or Timeout (FR-004, FR-008, T013)
	select {
	case reply := <-msgs:
		s.logger.InfoContext(ctx, "Received reply", "correlation_id", correlationID)
		reply.Ack()
		
		// Parse reply (Mock data)
		// in real world, unmarshal reply.Payload
		res = &genwatchlist.Watchlist{
			Tickers: []*genwatchlist.TickerItem{
				{
					Ticker: &genwatchlist.Ticker{
						Symbol: "AAPL",
						Name:   toPtr("Apple Inc"),
					},
				},
			},
		}
		return res, nil

	case <-time.After(10 * time.Second): // Fixed 10s timeout (T013)
		s.logger.WarnContext(ctx, "Request timed out", "correlation_id", correlationID)
		return nil, genwatchlist.TooManyRequests("System busy, please try again")
	}
}

// AddWatchlistTicker returns the added ticker with mock OHLCV data.
// This function implements the Async Pub/Sub pattern (FR-005).
func (s *watchlistsrvc) AddWatchlistTicker(ctx context.Context, params *genwatchlist.AddWatchlistTickerPayload) (res *genwatchlist.TickerItem, err error) {
	s.logger.InfoContext(ctx, "AddWatchlistTicker: Publishing async request")

	// Generate Correlation ID (T008)
	correlationID := watermill.NewUUID()

	// Create Payload (FR-007)
	// For MVP, we simply marshal the params as JSON.
	// In a real CloudEvent, we would wrap this.
	// We use the Watermill message structure as our envelope.
	payloadBytes, err := json.Marshal(params)
	if err != nil {
		s.logger.ErrorContext(ctx, "Failed to marshal payload", "error", err)
		return nil, genwatchlist.InternalError("Failed to encode request")
	}

	// Create Watermill Message
	msg := message.NewMessage(correlationID, payloadBytes)
	msg.Metadata.Set("correlation_id", correlationID)
	msg.Metadata.Set("type", "com.ta.watchlist.ticker.add")

	// Publish to NATS Subject (T007)
	subject := "us.finance.watchlist.ticker.add"
	if err := s.publisher.Publish(subject, msg); err != nil {
		s.logger.ErrorContext(ctx, "Failed to publish message", "error", err)
		return nil, genwatchlist.InternalError("Failed to submit request")
	}

	s.logger.InfoContext(ctx, "Request submitted", "correlation_id", correlationID)

	// Return Accept response (with Correlation ID in non-standard field for MVP check, though usually header)
	// The generated response struct doesn't have correlation ID field yet, 
	// assuming we return the "added" item or a placeholder.
	// For Async, usually we return 202 Accepted. 
	// The interface requires returning a TickerItem. 
	// We will return a placeholder item.
	res = &genwatchlist.TickerItem{
		Ticker: &genwatchlist.Ticker{
			Symbol: params.Ticker.Symbol,
			Name:   toPtr("Request Queued"),
		},
	}
	
	// Ensure we don't return an error on success
	return res, nil
}

// RemoveWatchlistTicker acknowledges removal.
// TODO: Implement real persistence layer (database/repository)
func (s *watchlistsrvc) RemoveWatchlistTicker(ctx context.Context, params *genwatchlist.RemoveWatchlistTickerPayload) (err error) {
	s.logger.InfoContext(ctx, "RemoveWatchlistTicker is running...")

	err = genwatchlist.InternalError("Not implemented")
	return err
}

func toPtr(s string) *string {
	return &s
}
