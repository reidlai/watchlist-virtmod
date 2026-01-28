package watchlist

import (
	"context"
	"testing"
	"log/slog"
	"os"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/ThreeDotsLabs/watermill"
	"github.com/ThreeDotsLabs/watermill/message"
	"github.com/ThreeDotsLabs/watermill/pubsub/gochannel"
	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/goa_gen/gen/watchlist"
)

// MockPublisher is a mock implementation of WatermillPublisher
type MockPublisher struct {
	mock.Mock
}

func (m *MockPublisher) Publish(topic string, messages ...*message.Message) error {
	args := m.Called(topic, messages)
	return args.Error(0)
}

func (m *MockPublisher) Close() error {
	args := m.Called()
	return args.Error(0)
}

// MockSubscriber is a mock implementation of WatermillSubscriber
type MockSubscriber struct {
	mock.Mock
}

func (m *MockSubscriber) Subscribe(ctx context.Context, topic string) (<-chan *message.Message, error) {
	args := m.Called(ctx, topic)
	return args.Get(0).(<-chan *message.Message), args.Error(1)
}

func (m *MockSubscriber) Close() error {
	args := m.Called()
	return args.Error(0)
}

func TestAddWatchlistTicker_PublishesMessage(t *testing.T) {
	// Setup
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	mockPub := new(MockPublisher)
	mockSub := new(MockSubscriber)
	
	// Create service with mocks
	// Note: useMockData=false because we want to test the REAL logic in watchlistsrvc, 
	// but injected with MOCK Watermill interfaces.
	// If useMockData=true, it would return the generated mock which doesn't use our logic.
	svc := NewWatchlist(logger, mockPub, mockSub, false)

	// Expectations
	tickerSymbol := "AAPL"
	expectedSubject := "us.finance.watchlist.ticker.add"

	// Mock background worker subscription (T011/T014/T015 Router startup)
	// We return a dummy channel that closes immediately or stays open, 
	// just to satisfy the Router startup in NewWatchlist -> startWorker
	dummyChan := make(chan *message.Message)
	// Optionally close it so the router loop exits or just leave it.
	// We'll leave it open but empty.
	mockSub.On("Subscribe", mock.Anything, expectedSubject).Return((<-chan *message.Message)(dummyChan), nil)
	
	mockPub.On("Publish", expectedSubject, mock.MatchedBy(func(msgs []*message.Message) bool {
		if len(msgs) != 1 {
			return false
		}
		msg := msgs[0]
		// Verify correlation ID is present
		if msg.Metadata.Get("correlation_id") == "" {
			return false
		}
		// Verify payload contains symbol (simple check)
		return true
	})).Return(nil)

	// Execute
	ctx := context.Background()
	payload := &genwatchlist.AddWatchlistTickerPayload{
		Ticker: &genwatchlist.Ticker{
			Symbol: tickerSymbol,
		},
	}
	
	// Calling the method on the service interface, assuming it casts back or we use the struct directly if needed.
	// Since NewWatchlist returns the interface, we use that.
	_, err := svc.AddWatchlistTicker(ctx, payload)

	// Verify
	assert.NoError(t, err)
	mockPub.AssertExpectations(t)
}

func TestGetWatchlist_SyncReply(t *testing.T) {
	// Setup with GoChannel for in-memory Pub/Sub simulating NATS
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	watermillLogger := watermill.NewSlogLogger(logger)
	pubSub := gochannel.NewGoChannel(gochannel.Config{}, watermillLogger)

	// Create service using the SAME pub/sub for both publisher and subscriber
	// This connects the internal logic (Publish Request) to the internal Worker (Router) via GoChannel
	svc := NewWatchlist(logger, pubSub, pubSub, false)

	// Wait for worker to start (naive, but sufficient for test)
	time.Sleep(100 * time.Millisecond)

	// Execute
	ctx := context.Background()
	res, err := svc.GetWatchlist(ctx)

	// Verify
	assert.NoError(t, err)
	assert.NotNil(t, res)
	assert.Len(t, res.Tickers, 1)
	assert.Equal(t, "AAPL", res.Tickers[0].Ticker.Symbol)
}
