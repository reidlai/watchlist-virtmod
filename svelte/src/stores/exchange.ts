import { readable, derived } from "svelte/store";
import { exchangeService } from "@modules/watchlist-ts";

/**
 * Svelte store wrappers for ExchangeService
 * 
 * These stores wrap the RxJS observables to work seamlessly with Svelte's $ syntax.
 */

/**
 * Store for all exchanges
 * @example
 * <script>
 *   import { exchanges } from '$lib/stores/exchange';
 * </script>
 * {#each $exchanges as exchange}
 *   <div>{exchange.display_name}</div>
 * {/each}
 */
export const exchanges = readable([], (set) => {
    const subscription = exchangeService.exchanges$.subscribe(set);

    // Fetch exchanges on first subscription
    exchangeService.fetchExchanges().subscribe();

    return () => subscription.unsubscribe();
});

/**
 * Store for loading state
 */
export const loading = readable(false, (set) => {
    const subscription = exchangeService.loading$.subscribe(set);
    return () => subscription.unsubscribe();
});

/**
 * Store for error state
 */
export const error = readable<string | null>(null, (set) => {
    const subscription = exchangeService.error$.subscribe(set);
    return () => subscription.unsubscribe();
});

/**
 * Derived store: Count of exchanges
 */
export const exchangeCount = derived(exchanges, ($exchanges) => $exchanges.length);

/**
 * Derived store: Exchanges grouped by country
 */
export const exchangesByCountry = derived(exchanges, ($exchanges) => {
    const grouped = new Map<string, typeof $exchanges>();

    for (const exchange of $exchanges) {
        const country = exchange.country;
        if (!grouped.has(country)) {
            grouped.set(country, []);
        }
        grouped.get(country)!.push(exchange);
    }

    return grouped;
});

/**
 * Derived store: Exchange map by Operating MIC for quick lookup
 */
export const exchangeMap = derived(exchanges, ($exchanges) => {
    const map = new Map<string, typeof $exchanges[0]>();
    for (const exchange of $exchanges) {
        map.set(exchange.operating_mic, exchange);
    }
    return map;
});

/**
 * Actions for exchange management
 */
export const exchangeActions = {
    /**
     * Search exchanges by query
     */
    search: (query: string) => {
        return exchangeService.searchExchanges(query);
    },

    /**
     * Get a specific exchange by Operating MIC
     */
    getExchange: (operatingMic: string) => {
        return exchangeService.getExchange(operatingMic);
    },

    /**
     * Refresh the exchange list
     */
    refresh: () => {
        return exchangeService.fetchExchanges();
    },

    /**
     * Clear error state
     */
    clearError: () => {
        exchangeService.clearError();
    },
};
