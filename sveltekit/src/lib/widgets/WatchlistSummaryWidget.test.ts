// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import WatchlistSummaryWidget from "./WatchlistSummaryWidget.svelte";

// Mock dependencies
const { mockGoto } = vi.hoisted(() => ({
  mockGoto: vi.fn(),
}));
vi.mock("$app/navigation", () => ({
  goto: mockGoto,
}));

// Mock Runes State
// Mock Runes State - using exact alias match
vi.mock("$lib/runes/WatchlistState.svelte", () => ({
  watchlistState: {
    tickerCount: 0,
    loading: false,
    error: null,
    tickers: [],
    getWatchlist: vi.fn(),
    setRxServiceConfig: vi.fn(),
  },
}));



describe("WatchlistSummaryWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state", () => {
    const { getByText } = render(WatchlistSummaryWidget, { loading: true });
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("should render error state", () => {
    const { getByText } = render(WatchlistSummaryWidget, { error: "Failed to load" });
    expect(getByText("Failed to load")).toBeTruthy();
  });

  it("should render data state", () => {
    const { getByText } = render(WatchlistSummaryWidget, {
      tickerCount: 5,
      tickers: new Array(5).fill({})
    });
    expect(getByText("5")).toBeTruthy();
  });

  it("should navigate on click", async () => {
    const { container } = render(WatchlistSummaryWidget);
    const widget = container.querySelector('[role="button"]');
    expect(widget).toBeTruthy();

    if (widget) {
      await fireEvent.click(widget);
      expect(mockGoto).toHaveBeenCalledWith("/watchlist");
    }
  });

  it("should navigate on Enter key", async () => {
    const { container } = render(WatchlistSummaryWidget);
    const widget = container.querySelector('[role="button"]');
    expect(widget).toBeTruthy();

    if (widget) {
      await fireEvent.keyDown(widget, { key: "Enter" });
      expect(mockGoto).toHaveBeenCalledWith("/watchlist");
    }
  });
});
