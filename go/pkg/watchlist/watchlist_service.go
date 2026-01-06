package watchlist

import (
	"context"
	"log/slog"
	"sync"
	"time"

	"github.com/reidlai/ta-workspace/modules/watchlist/go/pkg/exchange"
	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/gen/watchlist"
)

// watchlist service implementation.
type watchlistsrvc struct {
	logger *slog.Logger
	mu     sync.Mutex
	// Map UserID -> Symbol -> Item
	store map[string]map[string]*genwatchlist.TickerItem
}

// NewWatchlist returns the watchlist service implementation.
func NewWatchlist(logger *slog.Logger) genwatchlist.Service {
	// Initialize exchange data (Fail Fast)
	exchange.LoadExchanges()

	return &watchlistsrvc{
		logger: logger,
		store:  make(map[string]map[string]*genwatchlist.TickerItem),
	}
}

// List all tickers for user
func (s *watchlistsrvc) List(ctx context.Context, p *genwatchlist.ListPayload) (res []*genwatchlist.TickerItem, err error) {
	s.logger.InfoContext(ctx, "genwatchlist.list", "user", p.UserID)
	s.mu.Lock()
	defer s.mu.Unlock()

	userStore, ok := s.store[p.UserID]
	if !ok {
		return []*genwatchlist.TickerItem{}, nil
	}

	res = make([]*genwatchlist.TickerItem, 0, len(userStore))
	for _, item := range userStore {
		res = append(res, item)
	}
	return
}

// Add ticker
func (s *watchlistsrvc) Add(ctx context.Context, p *genwatchlist.AddPayload) (res *genwatchlist.TickerItem, err error) {
	s.logger.InfoContext(ctx, "genwatchlist.add", "user", p.UserID, "symbol", p.Symbol)
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.store[p.UserID] == nil {
		s.store[p.UserID] = make(map[string]*genwatchlist.TickerItem)
	}

	now := time.Now().Format(time.RFC3339)
	item := &genwatchlist.TickerItem{
		Symbol:    p.Symbol,
		OnHand:    p.OnHand,
		CreatedAt: &now,
	}
	s.store[p.UserID][p.Symbol] = item
	return item, nil
}

// Remove ticker
func (s *watchlistsrvc) Remove(ctx context.Context, p *genwatchlist.RemovePayload) (err error) {
	s.logger.InfoContext(ctx, "genwatchlist.remove", "user", p.UserID, "symbol", p.Symbol)
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.store[p.UserID] != nil {
		delete(s.store[p.UserID], p.Symbol)
	}
	return nil
}
