# Research: Watchlist Home Page Implementation

## Decisions

### 1. Data Table Implementation
- **Decision**: Use `shadcn-svelte` Table components (Table, TableHeader, TableRow, etc.) combined with Svelte 5 `$state` and `$derived` runes.
- **Rationale**: User requested ShadCN Svelte specifically. It provides a modular, accessible foundation.
- **Alternatives considered**: DataTables (too heavy), manually building with Tailwind (high maintenance).

### 2. RxJS to Svelte 5 Rune Integration
- **Decision**: Leverage the existing `WatchlistState.svelte.ts` rune. It already subscribes to `watchlistRxService` and converts the stream into reactive Svelte state.
- **Rationale**: Encapsulation. The UI should only care about the reactive properties provided by the rune, not the underlying RxJS stream.

### 3. Sorting Implementation
- **Decision**: Implement a simple JavaScript `sort()` on the `$derived` tickers array, triggered by the Symbol header click.
- **Rationale**: User explicitly constrained sorting to Symbol only. Local sorting is highly performant for the 50-ticker scale.

### 4. Error Handling
- **Decision**: Use ShadCN Svelte `toast` for service failures.
- **Rationale**: User selected Option B in the clarification phase. Toasts provide non-intrusive feedback.

## Best Practices

- **Accessibility**: Table headers must have appropriate `aria-sort` attributes when sorting is applied.
- **Performance**: Use `$derived` for sorted data to avoid re-calculating on every render if the source data hasn't changed.
- **Responsive Design**: Ensure the table has `overflow-x-auto` on small screens or collapses gracefully.
