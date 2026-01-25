# Feature Specification: Watchlist Home Page

**Feature Branch**: `015-watchlist_home_page_list_tickers_state`
**Created**: 2026-01-24
**Status**: Draft
**Input**: User description: "create Watchlist home page at sveltekit/src/routes/+page.svelte which shows data table to list out watchlist rune's tickers state"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Watchlist Tickers (Priority: P1)

As a user, I want to see a list of my watched tickers on the home page so that I can quickly monitor their current state.

**Why this priority**: Core value proposition of the watchlist module.
**Independent Test**: Navigate to the home page and verify that a table displays the tickers and their respective states.

**Acceptance Scenarios**:

1. **Given** I have several tickers in my watchlist, **When** I navigate to the root home page (`/`), **Then** I should see a data table listing all my tickers, sorted alphabetically by Symbol.
2. **Given** the watchlist is empty, **When** I navigate to the root home page (`/`), **Then** I should see a message "No tickers tracked in your watchlist." indicating no tickers are currently being watched.

### User Story 2 - Real-time State Updates (Priority: P2)

As a user, I want the ticker states to update automatically so that I have the most current information without manual refreshing.

**Why this priority**: Critical for financial monitoring applications.
**Independent Test**: Observe the data table and verify that ticker states (price, change, etc.) update when new data is emitted by the underlying service.

**Acceptance Scenarios**:

1. **Given** the home page is open, **When** a ticker state change is emitted by the service, **Then** the corresponding row in the data table should update to reflect the new state.
2. **Given** a service error occurs, **When** the home page is open, **Then** a toast notification should display the error message and the table should remain in its last known state or empty if no data was loaded.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The home page MUST be located at `sveltekit/src/routes/+page.svelte`.
- **FR-002**: The page MUST use a dedicated `WatchlistTickerTableWidget` (utilizing ShadCN Svelte table components) to display tickers, with sorting enabled specifically for the Symbol column.
- **FR-003**: The table MUST list "Watchlist Rune's tickers state".
- **FR-004**: The page MUST integrate with the existing Watchlist RxJS services to fetch and subscribe to ticker data.
- **FR-005**: The table MUST display prioritized ticker data: Symbol, Last Price, Open, High, Low, Volume, and Last Updated.
- **FR-006**: Service errors MUST be communicated via toast notifications.

### Key Entities

- **Watchlist Ticker State**: The current market data and status for a specific ticker symbol.
- **Watchlist Service**: The RxJS-based service providing the stream of ticker states.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: The home page loads and displays the watchlist table in under 500ms (assuming service data is available).
- **SC-002**: Ticker updates are reflected in the UI within 100ms of being received by the frontend service.
- **SC-003**: The data table is responsive and usable on desktop and mobile viewports.
- **SC-004**: The table handles up to 50 tickers via vertical scrolling without performance degradation.

## Clarifications

### Session 2026-01-24

- Q: Which specific ticker data points (Symbol, Name, Last, Change, Volume, etc.) should be prioritized in the table? → A: Option B (Symbol, Last Price, Open, High, Low, Volume) + Last Updated.
- Q: Where exactly should the home page be located? → A: The root route (`sveltekit/src/routes/+page.svelte`).
- Q: Should the table allow sorting or filtering? → A: Only sort on Symbol.
- Q: Should clicking a row navigate to a detail page or have other actions? → A: No row action at this moment.
- Q: Should the empty state include any specific call-to-action? → A: Option A (Simple message: "No tickers tracked in your watchlist.")
- Q: Which UI component library should be used for the data table? → A: ShadCN Svelte components.
- Q: What is the expected data scale for the table? → A: Option A (Up to 50 tickers, vertical scrolling).
- Q: How should service failures be handled in the UI? → A: Option B (Toast notification + empty table area).

- Q: How should the data table be structured? → A: As a newly created `WatchlistTickerTableWidget` which sticks with the developer guide method (Types, Component, Stories, Tests).

1. Sorting/Filtering: [RESOLVED] Only sort on Symbol.
2. Row Actions: [RESOLVED] No row action at this moment.
3. Column Selection: [RESOLVED] Symbol, Last Price, Open, High, Low, Volume, and Last Updated.
4. Empty State: [RESOLVED] Simple message: "No tickers tracked in your watchlist."
5. UI Library: [RESOLVED] ShadCN Svelte components.
6. Data Scale: [RESOLVED] Up to 50 tickers, vertical scrolling.
7. Error Handling: [RESOLVED] Toast notification + empty table area.
8. Component Architecture: [RESOLVED] Use `WatchlistTickerTableWidget` following the module's widget pattern.
