package watchlist

import (
	"context"
	"log/slog"
	"time"

	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/gen/watchlist"
)

// watchlist service implementation.
type watchlistsrvc struct {
	logger *slog.Logger
}

// Verify that watchlistsrvc implements watchlist.Service.
var _ genwatchlist.Service = (*watchlistsrvc)(nil)

// NewWatchlist returns the watchlist service implementation.
func NewWatchlist(logger *slog.Logger) genwatchlist.Service {
	return &watchlistsrvc{
		logger: logger,
	}
}

// GetWatchlist returns mock watchlist data.
// TODO: Implement real persistence layer (database/repository)
func (s *watchlistsrvc) GetWatchlist(ctx context.Context) (res *genwatchlist.Watchlist, err error) {
	s.logger.InfoContext(ctx, "watchlist.getWatchlist")
	
	// Return mock data for now
	return &genwatchlist.Watchlist{
		Tickers: []*genwatchlist.TickerItem{},
	}, nil
}

// AddWatchlistTicker returns the added ticker with mock OHLCV data.
// TODO: Implement real persistence layer (database/repository)
func (s *watchlistsrvc) AddWatchlistTicker(ctx context.Context, p *genwatchlist.AddWatchlistTickerPayload) (res *genwatchlist.TickerItem, err error) {
	s.logger.InfoContext(ctx, "watchlist.addWatchlistTicker", "symbol", p.Ticker.Symbol)
	
	// Return mock response
	now := time.Now().UnixMilli()
	return &genwatchlist.TickerItem{
		Ticker: p.Ticker,
		Ohlcv: &genwatchlist.OHLCV{
			Open:          150.0,
			High:          155.0,
			Low:           149.0,
			Close:         152.0,
			Volume:        1000000,
			Change:        2.0,
			ChangePercent: 1.3,
			LastUpdatedAt: now,
		},
	}, nil
}

// RemoveWatchlistTicker acknowledges removal.
// TODO: Implement real persistence layer (database/repository)
func (s *watchlistsrvc) RemoveWatchlistTicker(ctx context.Context, p *genwatchlist.RemoveWatchlistTickerPayload) (err error) {
	s.logger.InfoContext(ctx, "watchlist.removeWatchlistTicker", "symbol", p.Symbol)
	
	// Return success for now
	return nil
}
