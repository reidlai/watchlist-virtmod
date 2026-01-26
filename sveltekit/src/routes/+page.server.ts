import { watchlistState } from '$lib/runes/WatchlistState.svelte';

import type { PageServerLoad } from './$types';
import { API_BASE_URL, USE_MOCK_DATA } from '$env/static/private';
import { logger } from '$lib/utils';

export const load: PageServerLoad = async () => {
    watchlistState.setRxServiceConfig({
        apiBaseUrl: API_BASE_URL,
        usingMockData: USE_MOCK_DATA.toLowerCase() === 'true',
    });
    watchlistState.getWatchlist();
    logger.info({
        tickers: watchlistState.tickers,
        error: watchlistState.error,
        loading: watchlistState.loading,
        usingMockData: watchlistState.usingMockData
    }, "Watchlist data loaded");

    return {
        tickers: watchlistState.tickers,
        error: watchlistState.error,
        loading: !!watchlistState.loading,
        usingMockData: watchlistState.usingMockData,
    };
};