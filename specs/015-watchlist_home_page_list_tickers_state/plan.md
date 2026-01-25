# Implementation Plan: Watchlist Home Page

**Branch**: `015-watchlist_home_page_list_tickers_state` | **Date**: 2026-01-24 | **Spec**: [spec.md](file:///home/reidlai/GitLocal/watchlist-virtmod/specs/015-watchlist_home_page_list_tickers_state/spec.md)
**Input**: Feature specification from `/specs/015-watchlist_home_page_list_tickers_state/spec.md`

## Summary

This feature implements the core monitoring interface for the Watchlist module. It will be a SvelteKit 2 page located at the root route (`sveltekit/src/routes/+page.svelte`) utilizing Svelte 5 runes for state management. Following the project's developer guide, the ticker table will be implemented as a dedicated `WatchlistTickerTableWidget` in `src/lib/widgets/`, making it reusable and independently testable via Storybook and Vitest.

## Technical Context

**Language/Version**: TypeScript, Node.js v20 (LTS)
**Primary Dependencies**: Svelte 5, SvelteKit 2, RxJS v7, ShadCN Svelte, TailwindCSS 4
**Storage**: N/A (Consumes data from Go backend via `watchlistRxService`)
**Testing**: Vitest, Playwright (Integration)
**Target Platform**: Web Browser (Desktop/Mobile)
**Project Type**: SvelteKit Library/Service
**Performance Goals**: <500ms initial load, <100ms update latency
**Constraints**: ShadCN Svelte components, Symbol-only sorting, No row actions
**Scale/Scope**: Up to 50 tickers, scrollable list

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Tech stack matches Gemini CLI rules (Svelte 5, Tailwind 4, Go-backed)
- [x] Directory structure follows monorepo rules
- [x] CI/CD flow respects branching and PR-only main
- [x] Security gates (SCA, SAST, Secrets) are inherited from workspace configuration

## Project Structure

### Documentation (this feature)

```text
specs/015-watchlist_home_page_list_tickers_state/
├── spec.md              # Requirement definition
├── plan.md              # This file
├── research.md          # Technology decisions
├── data-model.md        # Ticker state shape
├── quickstart.md        # How to run locally
├── contracts/           # API surface definition (if new)
└── tasks.md             # Implementation steps
```

### Source Code

```text
├── routes/
│   └── +page.svelte     # The root home page (consumes the widget)
├── lib/
│   ├── components/ui/   # ShadCN Svelte table/toast components
│   ├── widgets/         # Newly created WatchlistTickerTableWidget
│   │   ├── WatchlistTickerTableWidget.svelte
│   │   ├── WatchlistTickerTableWidget.stories.ts
│   │   ├── WatchlistTickerTableWidget.test.ts
│   │   └── WatchlistTickerTableWidget.types.ts
│   └── runes/
│       └── WatchlistState.svelte.ts # Svelte 5 Rune adapter
```

**Structure Decision**: Standard SvelteKit 2 route structure in `sveltekit/src/routes/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected.
