import type { WatchlistType } from '../WatchlistRxService';

// Mock matching the Application State (Now snake_case to match API)
export const mockGetWatchlistSuccessfulResponse: WatchlistType = {
    tickers: [
        {
            ticker: { name: "Alphabet C", symbol: "GOOG" },
            ohlcv: {
                open: 334.68,
                high: 337.02,
                low: 331.14,
                close: 336.42,
                volume: 12760000,
                change: -0.01,
                change_percent: 0,
                last_updated_at: Date.now(),
            },
        },
        {
            ticker: { name: "NVIDIA", symbol: "NVDA" },
            ohlcv: {
                open: 184.33,
                high: 184.45,
                low: 180.83,
                close: 183.27,
                volume: 141230000,
                change: -2.54,
                change_percent: -1.37,
                last_updated_at: Date.now(),
            },
        },
    ],
};

