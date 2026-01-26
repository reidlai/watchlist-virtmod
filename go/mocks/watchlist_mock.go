package mocks

import (
	"context"
	"log/slog"
	"time"

	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/goa_gen/gen/watchlist"
)

// watchlistMock service implementation for testing.
type watchlistMock struct {
	logger *slog.Logger
}

// Verify that watchlistMock implements watchlist.Service.
var _ genwatchlist.Service = (*watchlistMock)(nil)

// NewWatchlistMock returns the watchlist mock service implementation.
func NewWatchlistMock(logger *slog.Logger) genwatchlist.Service {
	return &watchlistMock{
		logger: logger,
	}
}

// GetWatchlist returns mock watchlist data.
func (s *watchlistMock) GetWatchlist(ctx context.Context) (res *genwatchlist.Watchlist, err error) {
	s.logger.InfoContext(ctx, "watchlist.mock.getWatchlist")

	// Return mock data
	return &genwatchlist.Watchlist{
		Tickers: []*genwatchlist.TickerItem{
			{
				Ticker: &genwatchlist.Ticker{
					Symbol:      "AAPL",
					Name:        func() *string { s := "Apple Inc."; return &s }(),
					ExchangeMic: func() *string { s := "XNAS"; return &s }(),
					Currency:    func() *string { s := "USD"; return &s }(),
				},
				Ohlcv: &genwatchlist.OHLCV{
					Open:          150.0,
					High:          155.0,
					Low:           149.0,
					Close:         152.0,
					Volume:        1000000,
					Change:        2.0,
					ChangePercent: 1.3,
					LastUpdatedAt: time.Now().UnixMilli(),
				},
			},
		},
	}, nil
}

// AddWatchlistTicker returns the added ticker with mock OHLCV data.
func (s *watchlistMock) AddWatchlistTicker(ctx context.Context, p *genwatchlist.AddWatchlistTickerPayload) (res *genwatchlist.TickerItem, err error) {
	s.logger.InfoContext(ctx, "watchlist.mock.addWatchlistTicker", "symbol", p.Ticker.Symbol)

	// Return mock response
	now := time.Now().UnixMilli()

	// Simulate metadata lookup
	tickerName := "Mock Company"
	if p.Ticker.Name != nil {
		tickerName = *p.Ticker.Name
	}

	mic := "XNAS"
	if p.Ticker.ExchangeMic != nil {
		mic = *p.Ticker.ExchangeMic
	}

	currency := "USD"
	if p.Ticker.Currency != nil {
		currency = *p.Ticker.Currency
	}

	return &genwatchlist.TickerItem{
		Ticker: &genwatchlist.Ticker{
			Symbol:      p.Ticker.Symbol,
			Name:        &tickerName,
			ExchangeMic: &mic,
			Currency:    &currency,
		},
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
func (s *watchlistMock) RemoveWatchlistTicker(ctx context.Context, p *genwatchlist.RemoveWatchlistTickerPayload) (err error) {
	s.logger.InfoContext(ctx, "watchlist.mock.removeWatchlistTicker", "symbol", p.Symbol)
	return nil
}
