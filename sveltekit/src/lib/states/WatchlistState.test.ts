import { describe, it, expect, vi, beforeEach } from "vitest";
import { WatchlistState } from "./WatchlistState.svelte";

const { mockApiClient } = vi.hoisted(() => ({
  mockApiClient: {
    get: vi.fn(),
  },
}));

vi.mock("../api-client", () => ({
  schemas: {
    Watchlist: {
      parse: vi.fn(),
    },
  },
  createApiClient: vi.fn(() => mockApiClient),
}));

describe("WatchlistState", () => {
  const watchlistState = WatchlistState.getInstance();

  beforeEach(() => {
    vi.clearAllMocks();
    watchlistState.apiClient = mockApiClient as any;
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
    mockApiClient.get.mockRejectedValue(new Error("Network Error"));
    watchlistState.usingMockData = false;

    await expect(watchlistState.getWatchlist()).rejects.toThrow(
      "Network Error",
    );
    expect(watchlistState.error).toBe("Network Error");
    expect(watchlistState.loading).toBe(false);
  });
});
