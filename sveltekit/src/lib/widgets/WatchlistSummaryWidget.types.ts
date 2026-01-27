// import type { PageData } from "$app/types";
export interface IWatchlistSummaryWidgetStory {
  tickers?: string[] | ITicker[];
  tickerCount?: number;
  loading?: boolean;
  error?: string | null;
  usingMockData?: boolean;
  serverData?: any;
}

export interface ITicker {
  name?: string;
  symbol?: string;

  last?: number;
  open?: number;
  high?: number;
  low?: number;
  change?: number;
  changePercent?: number;
  volume?: number;
  currency?: string;
  last_updated_at?: number;
}

export interface IWatchlistSummaryState {
  tickers?: ITicker[];
  loading?: boolean;
  error?: string | null;
  usingMockData?: boolean;
}
