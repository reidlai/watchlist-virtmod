/**
 * Centralized store exports for watchlist module
 * 
 * Import stores from here to use in Svelte components:
 * 
 * @example
 * import { tickers, loading, error } from './stores';
 * import { exchanges } from './stores';
 */

// Watchlist stores
export {
    tickers,
    loading as watchlistLoading,
    error as watchlistError,
    tickerCount,

    uniqueExchanges,
    uniqueExchangeCount,
    watchlistActions,
} from "./watchlist";

// Exchange stores
export {
    exchanges,
    loading as exchangeLoading,
    error as exchangeError,
    exchangeCount,
    exchangesByCountry,
    exchangeMap,
    exchangeActions,
} from "./exchange";
