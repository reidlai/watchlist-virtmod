package watchlist

import (
	"context"
	"log/slog"
	"os"
	"testing"

	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/gen/watchlist"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewWatchlist(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	
	svc := NewWatchlist(logger)
	
	require.NotNil(t, svc, "NewWatchlist should return a non-nil service")
}

func TestWatchlistService_List_EmptyUser(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger)
	ctx := context.Background()
	
	payload := &genwatchlist.ListPayload{
		UserID: "user123",
	}
	
	result, err := svc.List(ctx, payload)
	
	require.NoError(t, err, "List should not return an error for empty user")
	assert.Empty(t, result, "List should return empty slice for user with no tickers")
}

func TestWatchlistService_Add(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger)
	ctx := context.Background()
	
	userID := "user123"
	symbol := "AAPL"
	onHand := true
	
	payload := &genwatchlist.AddPayload{
		UserID: userID,
		Symbol: symbol,
		OnHand: onHand,
	}
	
	result, err := svc.Add(ctx, payload)
	
	require.NoError(t, err, "Add should not return an error")
	require.NotNil(t, result, "Add should return a ticker item")
	assert.Equal(t, symbol, result.Symbol, "Symbol should match")
	assert.Equal(t, onHand, result.OnHand, "OnHand should match")
	assert.NotNil(t, result.CreatedAt, "CreatedAt should be set")
}

func TestWatchlistService_List_AfterAdd(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger)
	ctx := context.Background()
	
	userID := "user123"
	
	// Add first ticker
	_, err := svc.Add(ctx, &genwatchlist.AddPayload{
		UserID: userID,
		Symbol: "AAPL",
		OnHand: true,
	})
	require.NoError(t, err)
	
	// Add second ticker
	_, err = svc.Add(ctx, &genwatchlist.AddPayload{
		UserID: userID,
		Symbol: "GOOGL",
		OnHand: false,
	})
	require.NoError(t, err)
	
	// List tickers
	result, err := svc.List(ctx, &genwatchlist.ListPayload{UserID: userID})
	
	require.NoError(t, err, "List should not return an error")
	assert.Len(t, result, 2, "List should return 2 tickers")
	
	// Verify symbols are present (order not guaranteed due to map iteration)
	symbols := make(map[string]bool)
	for _, item := range result {
		symbols[item.Symbol] = true
	}
	assert.True(t, symbols["AAPL"], "AAPL should be in the list")
	assert.True(t, symbols["GOOGL"], "GOOGL should be in the list")
}

func TestWatchlistService_Remove(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger)
	ctx := context.Background()
	
	userID := "user123"
	symbol := "AAPL"
	
	// Add ticker
	_, err := svc.Add(ctx, &genwatchlist.AddPayload{
		UserID: userID,
		Symbol: symbol,
		OnHand: true,
	})
	require.NoError(t, err)
	
	// Verify it's there
	list, err := svc.List(ctx, &genwatchlist.ListPayload{UserID: userID})
	require.NoError(t, err)
	assert.Len(t, list, 1, "Should have 1 ticker before removal")
	
	// Remove ticker
	err = svc.Remove(ctx, &genwatchlist.RemovePayload{
		UserID: userID,
		Symbol: symbol,
	})
	require.NoError(t, err, "Remove should not return an error")
	
	// Verify it's gone
	list, err = svc.List(ctx, &genwatchlist.ListPayload{UserID: userID})
	require.NoError(t, err)
	assert.Empty(t, list, "List should be empty after removal")
}

func TestWatchlistService_Remove_NonExistentTicker(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger)
	ctx := context.Background()
	
	// Remove non-existent ticker (should not error)
	err := svc.Remove(ctx, &genwatchlist.RemovePayload{
		UserID: "user123",
		Symbol: "NONEXISTENT",
	})
	
	assert.NoError(t, err, "Remove should not error for non-existent ticker")
}

func TestWatchlistService_MultipleUsers(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger)
	ctx := context.Background()
	
	// Add ticker for user1
	_, err := svc.Add(ctx, &genwatchlist.AddPayload{
		UserID: "user1",
		Symbol: "AAPL",
		OnHand: true,
	})
	require.NoError(t, err)
	
	// Add ticker for user2
	_, err = svc.Add(ctx, &genwatchlist.AddPayload{
		UserID: "user2",
		Symbol: "GOOGL",
		OnHand: false,
	})
	require.NoError(t, err)
	
	// Verify user1's list
	list1, err := svc.List(ctx, &genwatchlist.ListPayload{UserID: "user1"})
	require.NoError(t, err)
	assert.Len(t, list1, 1, "User1 should have 1 ticker")
	assert.Equal(t, "AAPL", list1[0].Symbol)
	
	// Verify user2's list
	list2, err := svc.List(ctx, &genwatchlist.ListPayload{UserID: "user2"})
	require.NoError(t, err)
	assert.Len(t, list2, 1, "User2 should have 1 ticker")
	assert.Equal(t, "GOOGL", list2[0].Symbol)
}

func TestWatchlistService_Add_UpdateExisting(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	svc := NewWatchlist(logger)
	ctx := context.Background()
	
	userID := "user123"
	symbol := "AAPL"
	
	// Add ticker with OnHand=true
	result1, err := svc.Add(ctx, &genwatchlist.AddPayload{
		UserID: userID,
		Symbol: symbol,
		OnHand: true,
	})
	require.NoError(t, err)
	assert.True(t, result1.OnHand)
	
	// Add same ticker with OnHand=false (should update)
	result2, err := svc.Add(ctx, &genwatchlist.AddPayload{
		UserID: userID,
		Symbol: symbol,
		OnHand: false,
	})
	require.NoError(t, err)
	assert.False(t, result2.OnHand, "OnHand should be updated to false")
	
	// Verify only one ticker exists
	list, err := svc.List(ctx, &genwatchlist.ListPayload{UserID: userID})
	require.NoError(t, err)
	assert.Len(t, list, 1, "Should still have only 1 ticker")
	assert.False(t, list[0].OnHand, "OnHand should be false")
}
