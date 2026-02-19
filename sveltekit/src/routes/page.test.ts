import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Page from "./+page.svelte";
import { WatchlistState } from "../lib/states/WatchlistState.svelte";

// Mock SvelteKit modules
vi.mock("$app/environment", () => ({
  browser: true,
}));

vi.mock("$app/navigation", () => ({
  goto: vi.fn(),
}));

// Mock matchMedia for Sonner (required for real Toaster)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// We accept using real modules for integration testing to avoid Svelte 5 mocking issues.
// Page + Widget + State work together.

describe("Watchlist Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const watchlistState = WatchlistState.getInstance();
    watchlistState.watchlist = { tickers: [] };
    watchlistState.loading = false;
    watchlistState.error = null;
    watchlistState.usingMockData = true; // Use mock mode by default in tests to avoid network

    // Mock getWatchlist to avoid real network calls
    watchlistState.getWatchlist = vi.fn().mockResolvedValue(watchlistState.watchlist);
  });

  it("should render populated table using passed data", () => {
    const watchlistState = WatchlistState.getInstance();
    watchlistState.watchlist = {
      tickers: [
        {
          ticker: { symbol: "AAPL", name: "Apple Inc.", currency: "USD" },
          ohlcv: {
            open: 145,
            high: 155,
            low: 140,
            close: 150,
            change: 5,
            change_percent: 3.4,
            volume: 100,
            last_updated_at: Date.now(),
          },
        },
      ],
    };
    watchlistState.loading = false;
    watchlistState.error = null;

    render(Page);

    // Assert that the real widget rendered the data
    expect(screen.getByText("AAPL")).toBeTruthy();
    expect(screen.getByText("150.00")).toBeTruthy();
  });

  it("should render loading state", () => {
    const watchlistState = WatchlistState.getInstance();
    watchlistState.loading = true;
    watchlistState.error = null;

    render(Page);

    expect(screen.getByText("Loading...")).toBeTruthy();
  });
});
