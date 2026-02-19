import { describe, it, expect, vi, beforeEach } from "vitest";
import { WatchlistState } from "./WatchlistState.svelte";

// Mock the API client or schemas if needed
const { mockApi } = vi.hoisted(() => ({
  mockApi: {
    get: vi.fn(),
  },
}));

vi.mock("../api-client", () => ({
  api: mockApi,
  schemas: {
    Watchlist: {
      parse: vi.fn(),
    },
  },
  createApiClient: vi.fn(() => mockApi),
}));

describe("Watchlist Runes", () => {
  const watchlistState = WatchlistState.getInstance();

  beforeEach(() => {
    vi.clearAllMocks();
    watchlistState.watchlist = { tickers: [] };
    watchlistState.error = null;
    watchlistState.loading = false;
    watchlistState.usingMockData = false;
  });

  it("should initialize with default state", () => {
    expect(watchlistState.tickers).toEqual([]);
    expect(watchlistState.loading).toBe(false);
    expect(watchlistState.error).toBe(null);
  });

  it("should update state when getWatchlist is called with mock data", async () => {
    watchlistState.usingMockData = true;
    await watchlistState.getWatchlist();

    expect(watchlistState.tickers.length).toBeGreaterThan(0);
    expect(watchlistState.loading).toBe(false);
    expect(watchlistState.error).toBe(null);
  });

  it("should handle errors in getWatchlist", async () => {
    // Import api from the mock to control it
    const { api } = await import("../api-client");
    (api.get as any).mockRejectedValue(new Error("Network Error"));

    // Ensure we are NOT using mock data so it calls the real API mock
    watchlistState.usingMockData = false;

    await expect(watchlistState.getWatchlist()).rejects.toThrow(
      "Network Error",
    );
    expect(watchlistState.error).toBe("Network Error");
    expect(watchlistState.loading).toBe(false);
  });
});
