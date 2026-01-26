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

### 4. Error Handling & Accessibility
- **Decision**: Use ShadCN Svelte `toast` with `role="alert"` (non-modal) and auto-dismiss (5s). Do NOT move focus automatically.
- **Rationale**: Prevents disorienting screen reader users. Standard pattern for transient network errors.

## Best Practices

- **Accessibility**: 
  - Table headers must have appropriate `aria-sort` attributes.
  - Sort headers must have min 44px height (WCAG AAA) with visible icons.
- **Performance**: 
  - Use `$derived` for sorted data to avoid re-calculation.
  - Validate 500ms load under Standard 4G throttling.
- **Responsive Design**: 
  - Vertical scrolling constrained by `max-h-[70vh]`.
  - Ensure `overflow-x-auto` for small screens.
