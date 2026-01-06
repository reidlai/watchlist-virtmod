import type { IModuleBundle } from "virtual-module-core/types";
import MyTickersWidget from "./widgets/MyTickersWidget.svelte";
import ExchangeBrowser from "./widgets/ExchangeBrowser.svelte";
import MyTickersList from "./pages/MyTickersList.svelte";

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
    {
      id: "exchange-browser",
      title: "Exchange Browser",
      component: ExchangeBrowser,
      location: "dashboard",
      size: "large",
    },
  ],
  routes: [
    {
      path: "/watchlist",
      component: MyTickersList,
    },
  ],
};

export const init = async (context: any): Promise<IModuleBundle> => {
  return bundle;
};
