import {
  watchlistRxService,
  type WatchlistRxServiceConfig,
} from "@modules/watchlist-ts";
import {
  type ITicker,
  type IWatchlistSummaryWidgetStory,
} from "../widgets/WatchlistSummaryWidget.types";

/**
 * WatchlistState
 * Svelte 5 Rune adapter for WatchlistService.
 * Provides reactive state and derived values for the user's watchlist.
 */
class WatchlistState implements IWatchlistSummaryWidgetStory {
  private static instance: WatchlistState;

  tickers = $state<ITicker[]>([]);
  loading = $state<boolean>(false);
  error = $state<string | null>(null);
  usingMockData = $state<boolean>(false);

  tickerCount = $derived(this.tickers.length);

  constructor() {
    watchlistRxService.watchlist$.subscribe((watchlist) => {
      if (!watchlist?.tickers) return;
      this.tickers = watchlist.tickers.map((item) => ({
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
      }));
      this.loading = false;
      this.usingMockData = false;
    });

    watchlistRxService.error$.subscribe((err) => {
      if (err) {
        this.error = err;
        this.loading = false;
      }
    });

    watchlistRxService.usingMockData$.subscribe((usingMockData) => {
      this.usingMockData = usingMockData;
    });
  }

  public static getInstance(): WatchlistState {
    if (!WatchlistState.instance) {
      WatchlistState.instance = new WatchlistState();
    }
    return WatchlistState.instance;
  }

  public setRxServiceConfig(config: WatchlistRxServiceConfig) {
    watchlistRxService.setConfig(config);
  }

  public getWatchlist() {
    this.loading = true;
    this.error = null;
    watchlistRxService.getWatchlist();
  }
}

export const watchlistState = WatchlistState.getInstance();
