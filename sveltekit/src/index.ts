import type { IModuleBundle } from "virtual-module-core/types";
import WatchlistSummaryWidget from "./lib/widgets/WatchlistSummaryWidget.svelte";
import WatchlistTickerTableWidget from "./lib/widgets/WatchlistTickerTableWidget.svelte";

import WatchlistPage from "./routes/+page.svelte";
import { WatchlistState } from "./lib/states/WatchlistState.svelte";
import { createApiClient } from "./lib/api-client/index";

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

export const init = async (context: any): Promise<IModuleBundle> => {
  const sharedAxios =
    typeof context.getService === "function"
      ? context.getService("apiClient")
      : (context as any).resolve
        ? (context as any).resolve("apiClient")
        : undefined;

  if (sharedAxios) {
    // @ts-ignore
    const baseURL = sharedAxios.defaults?.baseURL || "/";
    const watchlistApi = createApiClient(baseURL, {
      axiosInstance: sharedAxios,
    });
    WatchlistState.getInstance().apiClient = watchlistApi;
  }
  return bundle;
};
