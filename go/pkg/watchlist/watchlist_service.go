package watchlist

import (
	"context"
	"log/slog"

	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/goa_gen/gen/watchlist"
	"github.com/reidlai/ta-workspace/modules/watchlist/go/mocks"
)

// watchlist service implementation.
type watchlistsrvc struct {
	logger *slog.Logger
}

// Verify that watchlistsrvc implements watchlist.Service.
var _ genwatchlist.Service = (*watchlistsrvc)(nil)

// NewWatchlist returns the watchlist service implementation.
// If useMockData is true, it returns the mock service.
func NewWatchlist(logger *slog.Logger, useMockData bool) genwatchlist.Service {
	if useMockData {
		return mocks.NewWatchlistMock(logger)
	}
	return &watchlistsrvc{
		logger: logger,
	}
}

// GetWatchlist returns mock watchlist data.
// TODO: Implement real persistence layer (database/repository)
func (s *watchlistsrvc) GetWatchlist(ctx context.Context) (res *genwatchlist.Watchlist, err error) {
	s.logger.InfoContext(ctx, "GetWatchlist is running...")
	res = &genwatchlist.Watchlist{
		Tickers: []*genwatchlist.TickerItem{},
	}
	err = genwatchlist.InternalError("Not implemented")
	return res, err
}

// AddWatchlistTicker returns the added ticker with mock OHLCV data.
// TODO: Implement real persistence layer (database/repository)
func (s *watchlistsrvc) AddWatchlistTicker(ctx context.Context, params *genwatchlist.AddWatchlistTickerPayload) (res *genwatchlist.TickerItem, err error) {
	s.logger.InfoContext(ctx, "AddWatchlistTicker is running...")

	res = &genwatchlist.TickerItem{}
	err = genwatchlist.InternalError("Not implemented")

	return res, err
}

// RemoveWatchlistTicker acknowledges removal.
// TODO: Implement real persistence layer (database/repository)
func (s *watchlistsrvc) RemoveWatchlistTicker(ctx context.Context, params *genwatchlist.RemoveWatchlistTickerPayload) (err error) {
	s.logger.InfoContext(ctx, "RemoveWatchlistTicker is running...")

	err = genwatchlist.InternalError("Not implemented")
	return err
}
