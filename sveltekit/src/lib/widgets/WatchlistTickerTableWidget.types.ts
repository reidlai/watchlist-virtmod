import type { ITicker } from "./WatchlistSummaryWidget.types";

export type { ITicker };

export interface IWatchlistTickerTableWidgetProps {
  tickers?: ITicker[];
  loading?: boolean;
  error?: string | null;
  usingMockData?: boolean;
}
