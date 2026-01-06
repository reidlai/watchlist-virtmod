import { readable, derived } from "svelte/store";
import { watchlistService } from "@modules/watchlist-ts";

/**
 * Svelte store wrappers for WatchlistService
 * 
 * These stores wrap the RxJS observables to work seamlessly with Svelte's $ syntax.
 * They automatically subscribe/unsubscribe as components mount/unmount.
 */

/**
 * Store for all tickers in the watchlist
 * @example
 * <script>
 *   import { tickers } from '$lib/stores/watchlist';
 * </script>
 * {#each $tickers as ticker}
 *   <div>{ticker.symbol}</div>
 * {/each}
 */
export const tickers = readable([], (set) => {
    const subscription = watchlistService.tickers$.subscribe(set);

    // Fetch tickers on first subscription
    watchlistService.fetchTickers().subscribe();

    return () => subscription.unsubscribe();
});

/**
 * Store for loading state
 */
export const loading = readable(false, (set) => {
    const subscription = watchlistService.loading$.subscribe(set);
    return () => subscription.unsubscribe();
});

/**
 * Store for error state
 */
export const error = readable<string | null>(null, (set) => {
    const subscription = watchlistService.error$.subscribe(set);
    return () => subscription.unsubscribe();
});

/**
 * Derived store: Count of tickers
 */
export const tickerCount = derived(tickers, ($tickers) => $tickers.length);

/**
 * Derived store: Count of tickers on hand
 */
export const tickersOnHand = derived(
    tickers,
    ($tickers) => $tickers.filter((t) => t.on_hand).length
);

/**
 * Derived store: Unique exchanges (requires exchange data)
 * This will be enhanced once we integrate with ExchangeService
 */
export const uniqueExchanges = derived(tickers, ($tickers) => {
    const exchanges = new Set($tickers.map((t) => t.symbol.substring(0, 2)));
    return Array.from(exchanges);
});

/**
 * Actions for watchlist management
 */
export const watchlistActions = {
    /**
     * Add a ticker to the watchlist
     */
    addTicker: (symbol: string, onHand: boolean) => {
        return watchlistService.addTicker(symbol, onHand);
    },

    /**
     * Remove a ticker from the watchlist
     */
    removeTicker: (symbol: string) => {
        return watchlistService.removeTicker(symbol);
    },

    /**
     * Refresh the watchlist
     */
    refresh: () => {
        return watchlistService.fetchTickers();
    },

    /**
     * Clear error state
     */
    clearError: () => {
        watchlistService.clearError();
    },

    /**
     * Set user ID
     */
    setUserId: (userId: string) => {
        watchlistService.setUserId(userId);
    },
};
