import type { IModuleBundle } from "virtual-module-core/types";
import WatchlistSummaryWidget from "./lib/widgets/WatchlistSummaryWidget.svelte";
import WatchlistTickerTableWidget from "./lib/widgets/WatchlistTickerTableWidget.svelte";

import WatchlistPage from "./routes/+page.svelte";

/**
 * Watchlist Virtual Module Bundle
 *
 * This module provides widgets for viewing watchlist summary and browsing exchanges.
 * All widgets integrate with RxJS services backed by Go APIs.
 *
 * Routes are now handled by SvelteKit 2 routing in src/routes/
 */
const bundle: IModuleBundle = {
  id: "watchlist-module",
  widgets: [
    {
      id: "watchlist-summary",
      title: "Watchlist Summary",
      component: WatchlistSummaryWidget,
      location: "dashboard",
      size: "small",
    },
    {
      id: "my-tickers",
      title: "My Tickers",
      component: WatchlistTickerTableWidget,
      location: "dashboard",
      size: "large",
    },
  ],
  routes: [
    {
      path: "/watchlist",
      type: "page",
      component: WatchlistPage,
    },
  ],
};

export const init = async (_context: any): Promise<IModuleBundle> => {
  return bundle;
};
