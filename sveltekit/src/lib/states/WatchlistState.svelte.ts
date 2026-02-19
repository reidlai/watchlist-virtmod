import {
  type ITicker,
  type IWatchlistSummaryWidgetStory,
} from "../widgets/WatchlistSummaryWidget.types";
import { z } from "zod";
import { schemas, createApiClient, api } from "../../lib/api-client";
import { logger } from "../utils";
import { mockGetWatchlistSuccessfulResponse } from "./mocks/watchlistMocks";

export type WatchlistType = z.infer<typeof schemas.Watchlist>;
type ApiClient = typeof api;

export interface WatchlistStateConfig {
  apiBaseUrl?: string;
  usingMockData?: boolean;
}

/**
 * WatchlistState
 * Svelte 5 Rune adapter for WatchlistService.
 * Provides reactive state and derived values for the user's watchlist.
 */
export class WatchlistState implements IWatchlistSummaryWidgetStory {
  private static instance: WatchlistState;

  private apiClient: ApiClient;

  watchlist = $state<WatchlistType>({ tickers: [] });
  loading = $state<boolean>(false);
  error = $state<string | null>(null);
  usingMockData = $state<boolean>(false);

  tickers = $derived<ITicker[]>(
    this.watchlist.tickers.map((item) => ({
      name: item.ticker.name ?? "",
      symbol: item.ticker.symbol,
      currency: item.ticker.currency,
      last: item.ohlcv.close,
      open: item.ohlcv.open,
      high: item.ohlcv.high,
      low: item.ohlcv.low,
      change: item.ohlcv.change ?? 0,
      changePercent: item.ohlcv.change_percent ?? 0,
      volume: item.ohlcv.volume,
      last_updated_at: item.ohlcv.last_updated_at,
    })),
  );

  constructor() {
    // Default to proxy-friendly relative path for browser
    this.apiClient = createApiClient("/api");
  }

  public setConfig(config: WatchlistStateConfig) {
    if (config.apiBaseUrl) {
      this.apiClient = createApiClient(config.apiBaseUrl);
    }
    if (config.usingMockData !== undefined) {
      this.usingMockData = config.usingMockData;
    }
  }

  public static getInstance(): WatchlistState {
    if (!WatchlistState.instance) {
      WatchlistState.instance = new WatchlistState();
    }
    return WatchlistState.instance;
  }

  public async getWatchlist() {
    this.loading = true;
    this.error = null;

    if (this.usingMockData) {
      this.watchlist = mockGetWatchlistSuccessfulResponse;
      this.loading = false;
      return this.watchlist;
    } else {
      try {
        const watchlist = await this.apiClient.get("/watchlist");
        schemas.Watchlist.parse(watchlist);
        this.watchlist = watchlist;
        this.loading = false;
        return this.watchlist;
      } catch (e: unknown) {
        logger.error({ err: e }, "Failed to fetch watchlist");
        const errorMessage =
          e instanceof Error ? e.message : "Failed to fetch or parse watchlist";
        this.error = errorMessage;
        this.loading = false;
        throw new Error(errorMessage);
      }
    }
  }
}
