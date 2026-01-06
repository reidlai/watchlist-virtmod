import type { IModuleBundle } from "virtual-module-core/types";
import MyTickersWidget from "./lib/widgets/MyTickersWidget.svelte";

import MyTickersList from "./lib/pages/MyTickersList.svelte";

/**
 * Watchlist Virtual Module Bundle
 * 
 * This module provides widgets for viewing watchlist summary and browsing exchanges.
 * All widgets integrate with RxJS services backed by Go APIs.
 */
const bundle: IModuleBundle = {
  id: "watchlist-module",
  widgets: [
    {
      id: "my-tickers",
      title: "My Tickers",
      component: MyTickersWidget,
      location: "dashboard",
      size: "small",
    },

  ],
  routes: [
    {
      path: "/watchlist",
      component: MyTickersList,
    },
  ],
};

export const init = async (_context: any): Promise<IModuleBundle> => {
  return bundle;
};
