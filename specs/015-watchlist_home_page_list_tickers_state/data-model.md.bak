# Data Model: Watchlist Home Page

## Entities

### WatchlistTicker
Represents a single row in the watchlist table.

| Field             | Type                | Description                               |
| :---------------- | :------------------ | :---------------------------------------- |
| `symbol`          | `string` (Unique)   | The ticker symbol (e.g., BTC, AAPL)       |
| `last`            | `number`            | The last traded price                     |
| `open`            | `number`            | The opening price for the current session |
| `high`            | `number`            | The session high price                    |
| `low`             | `number`            | The session low price                     |
| `volume`          | `number`            | The trading volume                        |
| `last_updated_at` | `string` (ISO 8601) | Timestamp of the last update              |

## State Management (Svelte 5 Runes)

The `WatchlistState` rune adapts the RxJS stream into reactive properties:

- `tickers`: `$state<ITicker[]>` - The collection of symbols and their current data.
- `loading`: `$state<boolean>` - Service loading state.
- `error`: `$state<string | null>` - Service error message.
- `tickerCount`: `$derived(number)` - Count of watched tickers.

## Relationships

- **WatchlistState** 1 ── * Consumes * ──> **watchlistRxService.watchlist$**
- **WatchlistState** 1 ── * Manages * ──> **WatchlistTicker**
