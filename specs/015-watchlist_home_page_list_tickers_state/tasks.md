# Tasks: Watchlist Home Page

**Input**: Design documents from `/specs/015-watchlist_home_page_list_tickers_state/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: BDD and Unit Tests are **MANDATORY** per project constitution Rules 6 & 7.

**Architecture**: Following the developer guide, the ticker table is implemented as a reusable `WatchlistTickerTableWidget`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- **Include exact file paths in descriptions**

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and directory creation

- [ ] T001 [P] Create the route directory `sveltekit/src/routes/` (if not existing)
- [ ] T002 [P] Initialize empty `+page.svelte` at `sveltekit/src/routes/+page.svelte`
- [ ] T003 [P] Create the widget directory `sveltekit/src/lib/widgets/` (if not existing)
- [ ] T004 Initialize threat model documentation in `threat_modelling/reports/015-watchlist_home_page.md`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and UI components

- [ ] T005 [P] Verify/Import ShadCN Svelte Table components in `sveltekit/src/lib/components/ui/table/`
- [ ] T006 [P] Verify/Import ShadCN Svelte Toast components in `sveltekit/src/lib/components/ui/toast/`
- [ ] T007 [P] Ensure `watchlistState` rune at `sveltekit/src/lib/runes/WatchlistState.svelte.ts` is exported and available

## Phase 3: User Story 1 - View Watchlist Tickers (Priority: P1) 🎯 MVP

**Goal**: Display a sorted list of watched tickers in a reusable ShadCN table widget.

### Widget Implementation (WatchlistTickerTableWidget)

- [ ] T008 [P] [US1] Create Widget Types in `sveltekit/src/lib/widgets/WatchlistTickerTableWidget.types.ts`
- [ ] T009 [P] [US1] Create Storybook stories in `sveltekit/src/lib/widgets/WatchlistTickerTableWidget.stories.ts`
- [ ] T010 [US1] Implement `WatchlistTickerTableWidget.svelte` using ShadCN Table components
- [ ] T011 [US1] Implement Symbol-only sorting logic within the widget or as a component-level derived rune
- [ ] T012 [US1] Implement empty state message within the widget ('No tickers tracked')
- [ ] T013 [US1] Create Unit Tests in `sveltekit/src/lib/widgets/WatchlistTickerTableWidget.test.ts` (Shallow testing)
- [ ] T014 [US1] Ensure widget supports vertical scrolling (max-h-[70vh]) and mobile responsiveness (overflow-x-auto)

### Page Integration & BDD

- [ ] T015 [P] [US1] Create BDD feature file `features/15-watchlist_home_page_view.feature` with Gherkin scenarios
- [ ] T016 [US1] Import and use `WatchlistTickerTableWidget` in `sveltekit/src/routes/+page.svelte`
- [ ] T017 [US1] Inject `watchlistState.tickers` into the widget via props/binding

**Checkpoint**: User Story 1 (MVP) is fully functional and independently testable at `/`.

## Phase 4: User Story 2 - Real-time State Updates & Error Handling (Priority: P2)

**Goal**: Show real-time updates and handle service errors with toasts.

### Tests for User Story 2 (MANDATORY)

- [ ] T018 [P] [US2] Add BDD scenarios for real-time updates and error toasts in `features/15-watchlist_home_page_updates.feature`
- [ ] T019 [P] [US2] Implement unit tests for error state in `sveltekit/src/lib/runes/WatchlistState.test.ts`

### Implementation for User Story 2

- [ ] T020 [P] [US2] Add reactive effect to watch for `watchlistState.error` and trigger ShadCN `toast` in `sveltekit/src/routes/+page.svelte`
- [ ] T021 [US2] Ensure the widget properties use Svelte 5's fine-grained reactivity to update when individual ticker properties change
- [ ] T022 [US2] Configure toast component with `role="alert"` and 5s auto-dismiss behavior in `sveltekit/src/routes/+page.svelte`

## Phase 5: Polish & Cross-Cutting Concerns

- [ ] T023 [P] Verify touch targets (44px) on headers for sorting columns on mobile
- [ ] T024 Add loading spinner/state while `watchlistState.loading` is true (inside the widget or page)
- [ ] T025 Verify performance goals (500ms load, 100ms update latency) via Playwright benchmarks under 4G throttling
- [ ] T026 Final code cleanup and documentation updates

---

## Dependencies & Execution Order

1. **Setup (Phase 1)**: Can start immediately.
2. **Foundational (Phase 2)**: Depends on Phase 1 completion.
3. **Widget Implementation (Phase 3)**: Depends on Phase 2 completion.
4. **Page Integration (Phase 3)**: Depends on Widget implementation completion (T010).
5. **User Story 2 (P2)**: Depends on Page Integration completion (T017).
6. **Polish**: Depends on US1 completion.

## Parallel Execution Examples

```bash
# Setup and testing can run in parallel
Task: "T001 Create route directory" & "T003 Create widget directory"
Task: "T008 Create Widget Types" & "T009 Create Storybook stories"
```

## Implementation Strategy

- **Module First**: Build and test the widget in isolation via Storybook and Vitest.
- **Incremental Integration**: Bring the fully functional widget into the home page.
- **Continuous Verification**: Run BDD and Unit tests after each implementation task.
