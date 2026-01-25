import { z } from "zod";
import { schemas, api } from "../lib/api-client";
export type WatchlistType = z.infer<typeof schemas.Watchlist>;
type ApiClient = typeof api;
/**
 * Confugration Type
 */
export interface WatchlistRxServiceConfig {
    apiBaseUrl: string;
    apiClient?: ApiClient;
    usingMockData?: boolean;
}
/**
 * WatchlistRxService - Reactive state management for watchlist data (In-Memory)
 */
export declare class WatchlistRxService {
    private static instance;
    /**
     * Initialize RxJS BehaviorSubject based on zod schema
     */
    private _watchlist$;
    private _error$;
    private _usingMockData$;
    /**
     * Initialize RxJS Observable based on zod schema
     */
    watchlist$: import("rxjs").Observable<z.objectOutputType<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    error$: import("rxjs").Observable<string | null>;
    usingMockData$: import("rxjs").Observable<boolean>;
    /**
     * Local variables declaration
     */
    private apiClient;
    /**
     * Contructor
     * @param config: PortfolioRxServiceConfig
     */
    constructor(config?: WatchlistRxServiceConfig);
    setConfig(config: WatchlistRxServiceConfig): void;
    /**
     * Singleton instance getter
     */
    static getInstance(): WatchlistRxService;
    /**
     * Getter and Setter
     */
    get watchlist(): WatchlistType;
    set watchlist(value: WatchlistType);
    get error(): string | null;
    set error(value: string);
    get usingMockData(): boolean | null;
    set usingMockData(value: boolean);
    /**
     * Actual API call
     */
    getWatchlist(): Promise<z.objectOutputType<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
}
export declare const watchlistRxService: WatchlistRxService;
export {};
