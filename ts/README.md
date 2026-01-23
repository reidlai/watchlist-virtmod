# RxJS Services Usage Guide

## Overview

The watchlist module provides two reactive services using RxJS for state management:

- **WatchlistService** - Manage user's stock watchlist
- **ExchangeService** - Browse and search stock exchanges

Both services are **framework-agnostic** and work with:

- ✅ Svelte (via `$` syntax)
- ✅ React (via `useEffect` + `subscribe`)
- ✅ Angular (via `async` pipe)
- ✅ Vue (via `watchEffect`)

---

## WatchlistService

### Svelte Usage

```svelte
<script>
import { watchlistService } from '@watchlist/services';

// Auto-subscribes with $ syntax
$: tickers = $watchlistService;
$: loading = $watchlistService.loading$;
$: error = $watchlistService.error$;

function handleAdd() {
  watchlistService.addTicker('AAPL', true).subscribe();
}

function handleRemove(symbol) {
  watchlistService.removeTicker(symbol).subscribe();
}
</script>

{#if $loading}
  <p>Loading...</p>
{:else if $error}
  <p class="error">{$error}</p>
{:else}
  {#each tickers as ticker}
    <div>
      {ticker.symbol} - {ticker.on_hand ? 'Owned' : 'Watching'}
      <button on:click={() => handleRemove(ticker.symbol)}>Remove</button>
    </div>
  {/each}
{/if}

<button on:click={handleAdd}>Add AAPL</button>
```

### React Usage

```tsx
import { useEffect, useState } from "react";
import { watchlistService, type TickerItem } from "@watchlist/services";

export const WatchlistComponent = () => {
  const [tickers, setTickers] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tickersSub = watchlistService.tickers$.subscribe(setTickers);
    const loadingSub = watchlistService.loading$.subscribe(setLoading);
    const errorSub = watchlistService.error$.subscribe(setError);

    return () => {
      tickersSub.unsubscribe();
      loadingSub.unsubscribe();
      errorSub.unsubscribe();
    };
  }, []);

  const handleAdd = () => {
    watchlistService.addTicker("AAPL", true).subscribe();
  };

  const handleRemove = (symbol: string) => {
    watchlistService.removeTicker(symbol).subscribe();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      {tickers.map((ticker) => (
        <div key={ticker.symbol}>
          {ticker.symbol} - {ticker.on_hand ? "Owned" : "Watching"}
          <button onClick={() => handleRemove(ticker.symbol)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAdd}>Add AAPL</button>
    </div>
  );
};
```

### API Methods

```typescript
// Fetch all tickers (returns Observable)
watchlistService.fetchTickers().subscribe({
  next: (tickers) => console.log("Tickers:", tickers),
  error: (err) => console.error("Error:", err),
});

// Add a ticker
watchlistService.addTicker("GOOGL", false).subscribe({
  next: (ticker) => console.log("Added:", ticker),
  error: (err) => console.error("Error:", err),
});

// Remove a ticker
watchlistService.removeTicker("AAPL").subscribe({
  next: () => console.log("Removed"),
  error: (err) => console.error("Error:", err),
});

// Set user ID (triggers re-fetch)
watchlistService.setUserId("user-456");

// Clear error
watchlistService.clearError();

// Get current state snapshot
const state = watchlistService.currentState;
console.log(state.tickers, state.loading, state.error);
```

---

## ExchangeService

### Svelte Usage

```svelte
<script>
import { exchangeService } from '@watchlist/services';

let searchQuery = '';

$: exchanges = $exchangeService;
$: loading = $exchangeService.loading$;

function handleSearch() {
  exchangeService.searchExchanges(searchQuery).subscribe();
}
</script>

<input bind:value={searchQuery} placeholder="Search exchanges..." />
<button on:click={handleSearch}>Search</button>

{#if $loading}
  <p>Loading...</p>
{:else}
  {#each exchanges as exchange}
    <div>
      <strong>{exchange.display_name}</strong>
      <p>{exchange.operating_mic} - {exchange.city}, {exchange.country}</p>
    </div>
  {/each}
{/if}
```

### React Usage

```tsx
import { useEffect, useState } from "react";
import { exchangeService, type Exchange } from "@watchlist/services";

export const ExchangeList = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const sub = exchangeService.exchanges$.subscribe(setExchanges);
    const loadingSub = exchangeService.loading$.subscribe(setLoading);
    return () => {
      sub.unsubscribe();
      loadingSub.unsubscribe();
    };
  }, []);

  const handleSearch = () => {
    exchangeService.searchExchanges(query).subscribe();
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search exchanges..."
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        exchanges.map((exchange) => (
          <div key={exchange.operating_mic}>
            <strong>{exchange.display_name}</strong>
            <p>
              {exchange.operating_mic} - {exchange.city}, {exchange.country}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
```

### API Methods

```typescript
// Fetch all exchanges
exchangeService.fetchExchanges().subscribe({
  next: (exchanges) => console.log("Exchanges:", exchanges),
  error: (err) => console.error("Error:", err),
});

// Search exchanges by query
exchangeService.searchExchanges("New York").subscribe({
  next: (exchanges) => console.log("Results:", exchanges),
});

// Get specific exchange by MIC
exchangeService.getExchange("XNYS").subscribe({
  next: (exchange) => console.log("NYSE:", exchange),
  error: (err) => console.error("Not found:", err),
});

// Clear error
exchangeService.clearError();

// Get current state snapshot
const state = exchangeService.currentState;
console.log(state.exchanges, state.loading, state.error);
```

---

## Advanced RxJS Patterns

### Combining Multiple Streams

```typescript
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { watchlistService, exchangeService } from "@watchlist/services";

// Combine tickers with exchange data
const enrichedTickers$ = combineLatest([
  watchlistService.tickers$,
  exchangeService.exchanges$,
]).pipe(
  map(([tickers, exchanges]) => {
    return tickers.map((ticker) => ({
      ...ticker,
      // Add exchange info if available
      exchangeInfo: exchanges.find((ex) => ex.acronym === ticker.symbol),
    }));
  }),
);

enrichedTickers$.subscribe((enriched) => {
  console.log("Enriched tickers:", enriched);
});
```

### Debounced Search

```typescript
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

const searchInput$ = new Subject<string>();

searchInput$
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => exchangeService.searchExchanges(query)),
  )
  .subscribe();

// In your component:
function onSearchInput(value: string) {
  searchInput$.next(value);
}
```

### Error Recovery

```typescript
import { retry, catchError, of } from "rxjs";

watchlistService
  .fetchTickers()
  .pipe(
    retry(3), // Retry up to 3 times
    catchError((err) => {
      console.error("Failed after retries:", err);
      return of([]); // Return empty array as fallback
    }),
  )
  .subscribe((tickers) => {
    console.log("Tickers:", tickers);
  });
```

---

## State Management Features

Both services provide:

✅ **Reactive State** - BehaviorSubject for current value + history  
✅ **Loading States** - Track API call progress  
✅ **Error Handling** - Capture and expose errors  
✅ **Immutable Updates** - State updates don't mutate  
✅ **Svelte Compatible** - Works with `$` syntax  
✅ **Framework Agnostic** - Works with any framework  
✅ **Type Safe** - Full TypeScript support  
✅ **Singleton Pattern** - Shared state across components
