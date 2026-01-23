import type { IModuleBundle } from "virtual-module-core/types";
import WatchlistSummaryWidget from "./lib/widgets/WatchlistSummaryWidget.svelte";

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
  ],
};

export const init = async (_context: any): Promise<IModuleBundle> => {
  return bundle;
};
