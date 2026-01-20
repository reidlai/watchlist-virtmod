import { BehaviorSubject } from "rxjs";
import { z } from "zod";
import { schemas, createApiClient, api } from "../lib/api-client";
import { mockGetWatchlistSuccessfulResponse } from "./mocks/watchlistMocks";
import { logger } from "../utils/logger";

// ---------------------------------------------------------------------------
// TYPE INFERENCE
// ---------------------------------------------------------------------------
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
export class WatchlistRxService {

    private static instance: WatchlistRxService;

    /**
     * Initialize RxJS BehaviorSubject based on zod schema
     */
    // Reactive state management with individual BehaviorSubjects (SOLID/DI)
    private _watchlist$ = new BehaviorSubject<z.infer<typeof schemas.Watchlist>>({ tickers: [] });
    private _error$ = new BehaviorSubject<string | null>(null);
    private _usingMockData$ = new BehaviorSubject<boolean>(false);

    /**
     * Initialize RxJS Observable based on zod schema
     */
    // Public observables (read-only)
    public watchlist$ = this._watchlist$.asObservable();
    public error$ = this._error$.asObservable();
    public usingMockData$ = this._usingMockData$.asObservable();

    /**
     * Local variables declaration
     */

    // Declare API client
    private apiClient!: ApiClient;

    /**
     * Contructor
     * @param config: PortfolioRxServiceConfig
     */
    constructor(config: WatchlistRxServiceConfig = { apiBaseUrl: "http://localhost:8000" }) {
        this.setConfig(config);
    }

    public setConfig(config: WatchlistRxServiceConfig) {
        if (config.apiClient) {
            this.apiClient = config.apiClient;
        } else {
            this.apiClient = createApiClient(config.apiBaseUrl);
        }

        this.usingMockData = !!config.usingMockData;
    }

    /**
     * Singleton instance getter
     */
    public static getInstance(): WatchlistRxService {
        if (!WatchlistRxService.instance) {
            WatchlistRxService.instance = new WatchlistRxService();
        }
        return WatchlistRxService.instance;
    }

    /**
     * Getter and Setter 
     */

    // Synchronous watchlist getter to access watchlist value
    public get watchlist(): WatchlistType {
        return this._watchlist$.getValue();
    }

    // Watchlist setter to change watchlist submit value
    public set watchlist(value: WatchlistType) {
        this._watchlist$.next(value);
    }

    public get error(): string | null {
        return this._error$.getValue();
    }

    public set error(value: string) {
        this._error$.next(value)
    }

    public get usingMockData(): boolean | null {
        return this._usingMockData$.getValue();
    }

    public set usingMockData(value: boolean) {
        this._usingMockData$.next(value)
    }


    /**  
     * Actual API call
     */
    public async getWatchlist() {
        this._error$.next(null);

        if (this.usingMockData) { // Mock data is for local test without API integration

            this.watchlist = mockGetWatchlistSuccessfulResponse;
            return this.watchlist;

        } else { // When API server is ready

            try {
                const watchlist = await this.apiClient.get("/watchlist");

                // Validate against schema. Raise error if not compatible
                schemas.Watchlist.parse(watchlist)

                // Update summary if no schema check error
                this.watchlist = watchlist;
                return this.watchlist;

            } catch (e: unknown) { // Use 'unknown' because anything can be thrown in JS; this forces us to verify the type safely (e.g. instanceof Error) rather than assuming 'any'
                logger.error({ err: e }, 'Failed to fetch watchlist');
                const errorMessage = e instanceof Error ? e.message : "Failed to fetch or parse watchlist";
                this.error = errorMessage;
                throw new Error(errorMessage);
            }

        }

    }

}

export const watchlistRxService = new WatchlistRxService();
