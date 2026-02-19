import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const OHLCV = z
  .object({
    change: z.number(),
    change_percent: z.number(),
    close: z.number(),
    high: z.number(),
    last_updated_at: z.number().int(),
    low: z.number(),
    open: z.number(),
    volume: z.number(),
  })
  .passthrough();
const Ticker = z
  .object({
    currency: z.string().optional(),
    exchange_mic: z.string().optional(),
    name: z.string().optional(),
    symbol: z.string(),
  })
  .passthrough();
const TickerItem = z.object({ ohlcv: OHLCV, ticker: Ticker }).passthrough();
const Watchlist = z.object({ tickers: z.array(TickerItem) }).passthrough();

export const schemas = {
  OHLCV,
  Ticker,
  TickerItem,
  Watchlist,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/watchlist",
    alias: "watchlist#getWatchlist",
    requestFormat: "json",
    response: Watchlist,
    errors: [
      {
        status: 400,
        description: `bad_request: Bad Request response.`,
        schema: z.string(),
      },
      {
        status: 403,
        description: `permission_denied: Forbidden response.`,
        schema: z.string(),
      },
      {
        status: 500,
        description: `internal_error: Internal Server Error response.`,
        schema: z.string(),
      },
      {
        status: 502,
        description: `upstream_error: Bad Gateway response.`,
        schema: z.string(),
      },
      {
        status: 503,
        description: `database_unavailable: Service Unavailable response.`,
        schema: z.string(),
      },
    ],
  },
  {
    method: "delete",
    path: "/watchlist/:symbol",
    alias: "watchlist#removeWatchlistTicker",
    requestFormat: "json",
    parameters: [
      {
        name: "symbol",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `bad_request: Bad Request response.`,
        schema: z.string(),
      },
      {
        status: 403,
        description: `permission_denied: Forbidden response.`,
        schema: z.string(),
      },
      {
        status: 404,
        description: `not_found: Not Found response.`,
        schema: z.string(),
      },
      {
        status: 409,
        description: `database_record_locked: Conflict response.`,
        schema: z.string(),
      },
      {
        status: 500,
        description: `internal_error: Internal Server Error response.`,
        schema: z.string(),
      },
      {
        status: 502,
        description: `upstream_error: Bad Gateway response.`,
        schema: z.string(),
      },
      {
        status: 503,
        description: `database_unavailable: Service Unavailable response.`,
        schema: z.string(),
      },
    ],
  },
  {
    method: "post",
    path: "/watchlist/ticker",
    alias: "watchlist#addWatchlistTicker",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Ticker,
      },
    ],
    response: TickerItem,
    errors: [
      {
        status: 400,
        description: `bad_request: Bad Request response.`,
        schema: z.string(),
      },
      {
        status: 403,
        description: `permission_denied: Forbidden response.`,
        schema: z.string(),
      },
      {
        status: 409,
        description: `ticker_already_exists: Conflict response.`,
        schema: z.string(),
      },
      {
        status: 500,
        description: `internal_error: Internal Server Error response.`,
        schema: z.string(),
      },
      {
        status: 502,
        description: `upstream_error: Bad Gateway response.`,
        schema: z.string(),
      },
      {
        status: 503,
        description: `database_unavailable: Service Unavailable response.`,
        schema: z.string(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
