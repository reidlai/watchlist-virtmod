// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import WatchlistSummaryWidget from "./WatchlistSummaryWidget.svelte";

// Mock dependencies
// $app modules are mocked in vitest.config.ts aliases

// Mock Runes State
const mockWatchlistState = {
  tickerCount: 0,
  loading: false,
  error: null,
  tickers: [],
  getWatchlist: vi.fn(),
  setConfig: vi.fn(),
};

vi.mock("../states/WatchlistState.svelte", () => ({
  WatchlistState: {
    getInstance: () => mockWatchlistState,
  },
}));

import { goto } from "$app/navigation";

describe("WatchlistSummaryWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state", () => {
    const { getByText } = render(WatchlistSummaryWidget, {
      props: { loading: true },
    });
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("should render error state", () => {
    const { getByText } = render(WatchlistSummaryWidget, {
      props: { error: "Failed to load" },
    });
    expect(getByText("Failed to load")).toBeTruthy();
  });

  it("should render data state", () => {
    const { getByText } = render(WatchlistSummaryWidget, {
      props: {
        tickerCount: 5,
        tickers: new Array(5).fill({}),
      },
    });
    expect(getByText("5")).toBeTruthy();
  });

  it("should navigate on click", async () => {
    const { container } = render(WatchlistSummaryWidget);
    const widget = container.querySelector('[role="button"]');
    expect(widget).toBeTruthy();

    if (widget) {
      await fireEvent.click(widget);
      expect(goto).toHaveBeenCalledWith("/watchlist");
    }
  });

  it("should navigate on Enter key", async () => {
    const { container } = render(WatchlistSummaryWidget);
    const widget = container.querySelector('[role="button"]');
    expect(widget).toBeTruthy();

    if (widget) {
      await fireEvent.keyDown(widget, { key: "Enter" });
      expect(goto).toHaveBeenCalledWith("/watchlist");
    }
  });
});
