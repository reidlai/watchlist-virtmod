import { watchlistRxService } from "@modules/watchlist-ts";
import {
  type ITicker,
  type IWatchlistSummaryState,
  type IWatchlistSummaryWidgetStory,
} from "../widgets/WatchlistSummaryWidget.types";

/**
 * WatchlistState
 * Svelte 5 Rune adapter for WatchlistService.
 * Provides reactive state and derived values for the user's watchlist.
 */
class WatchlistState implements IWatchlistSummaryWidgetStory {
  tickers = $state<ITicker[]>([]);
  loading = $state<IWatchlistSummaryState["loading"]>(false);
  error = $state<IWatchlistSummaryState["error"]>(null);

  tickerCount = $derived(this.tickers.length);

  constructor() {
    watchlistRxService.watchlist$.subscribe((watchlist) => {
      if (!watchlist?.tickers) return;
      this.tickers = watchlist.tickers.map((item) => ({
        name: item.ticker.name ?? "",
        symbol: item.ticker.symbol,
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
    });

    watchlistRxService.error$.subscribe((err) => {
      if (err) {
        this.error = err;
        this.loading = false;
      }
    });
  }

  public getWatchlist() {
    this.loading = true;
    this.error = null;
    watchlistRxService.getWatchlist();
  }
}

export const watchlistState = new WatchlistState();
