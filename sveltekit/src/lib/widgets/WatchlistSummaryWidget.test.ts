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
vi.mock("../runes/WatchlistState.svelte", () => ({
  watchlistState: {
    tickerCount: 0,
    loading: false,
    error: null,
    tickers: [],
    getWatchlist: vi.fn(),
  },
}));

import { watchlistState } from "../runes/WatchlistState.svelte";

describe("WatchlistSummaryWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset state defaults
    // @ts-ignore
    watchlistState.tickerCount = 0;
    watchlistState.loading = false;
    watchlistState.error = null;
  });

  it("should render loading state", () => {
    // @ts-ignore
    watchlistState.loading = true;
    const { getByText } = render(WatchlistSummaryWidget);
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("should render error state", () => {
    // @ts-ignore
    watchlistState.error = "Failed to load";
    const { getByText } = render(WatchlistSummaryWidget);
    expect(getByText("Failed to load")).toBeTruthy();
  });

  it("should render data state", () => {
    // @ts-ignore
    watchlistState.tickers = new Array(5).fill({});
    watchlistState.tickerCount = 5;

    const { getByText } = render(WatchlistSummaryWidget);
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
