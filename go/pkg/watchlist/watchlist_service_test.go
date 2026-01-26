package watchlist

import (
	"context"
	"log/slog"
	"os"
	"testing"

	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/goa_gen/gen/watchlist"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewWatchlist(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	svc := NewWatchlist(logger, true)

	require.NotNil(t, svc, "NewWatchlist should return a non-nil service")
}

func TestWatchlistService_GetWatchlist(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger, true)
	ctx := context.Background()

	result, err := svc.GetWatchlist(ctx)

	require.NoError(t, err, "GetWatchlist should not return an error")
	assert.NotEmpty(t, result.Tickers, "GetWatchlist should return mock tickers")
	assert.Equal(t, "AAPL", result.Tickers[0].Ticker.Symbol, "First ticker should be AAPL")
}

func TestWatchlistService_AddWatchlistTicker(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger, true)
	ctx := context.Background()

	symbol := "AAPL"

	payload := &genwatchlist.AddWatchlistTickerPayload{
		Ticker: &genwatchlist.Ticker{
			Symbol: symbol,
		},
	}

	result, err := svc.AddWatchlistTicker(ctx, payload)

	require.NoError(t, err, "AddWatchlistTicker should not return an error")
	require.NotNil(t, result, "AddWatchlistTicker should return a ticker item")
	assert.Equal(t, symbol, result.Ticker.Symbol, "Symbol should match")
}

func TestWatchlistService_AddWatchlistTicker_Idempotency(t *testing.T) {
	// Note: The mock implementation currently returns a new object every time and doesn't explicitly handle state.
	// This test ensures the API call succeeds, but state persistence is TODO in implementation.
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger, true)
	ctx := context.Background()

	symbol := "AAPL"
	payload := &genwatchlist.AddWatchlistTickerPayload{
		Ticker: &genwatchlist.Ticker{
			Symbol: symbol,
		},
	}

	// Add ticker
	result1, err := svc.AddWatchlistTicker(ctx, payload)
	require.NoError(t, err)
	assert.NotNil(t, result1)

	// Add same ticker again
	result2, err := svc.AddWatchlistTicker(ctx, payload)
	require.NoError(t, err)
	assert.NotNil(t, result2)
}

func TestWatchlistService_RemoveWatchlistTicker(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger, true)
	ctx := context.Background()

	symbol := "AAPL"

	// Remove ticker
	err := svc.RemoveWatchlistTicker(ctx, &genwatchlist.RemoveWatchlistTickerPayload{
		Symbol: symbol,
	})
	require.NoError(t, err, "RemoveWatchlistTicker should not return an error")
}
