import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { WatchlistRxService } from "./WatchlistRxService";
import { firstValueFrom, filter, map } from "rxjs";

describe("WatchlistRxService (In-Memory)", () => {
  let service: WatchlistRxService;

  beforeEach(() => {
    vi.useFakeTimers();
    service = WatchlistRxService.getInstance();
    service.setConfig({
      apiBaseUrl: "http://localhost:8000",
      usingMockData: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Initialization", () => {
    it("should initialize with empty state", async () => {
      const tickers = await firstValueFrom(
        service.watchlist$.pipe(map((w) => w.tickers)),
      );
      expect(tickers).toEqual([]);
    });
  });

  describe("fetchTickers", () => {
    it("should fetch tickers successfully", async () => {
      // Trigger fetch
      service.getWatchlist();

      // Subscribe to get the update
      const promise = firstValueFrom(
        service.watchlist$.pipe(
          map((w) => w.tickers),
          filter((t) => t.length > 0),
        ),
      );

      const result = await promise;
      expect(result.length).toBe(2);
      expect(result[0].ticker.symbol).toBe("GOOG");
      expect(result[1].ticker.symbol).toBe("NVDA");
    });
  });

  describe("Error Handling", () => {
    it("should emit null error initially", async () => {
      const err = await firstValueFrom(service.error$);
      expect(err).toBeNull();
    });

    // Note: Current mocked implementation doesn't easily allow injecting errors
    // without mocking the schema parsing to fail or changing the private data source.
    // We can skip explicit error simulation for now or add a test case if we expose a way to cause failure.
  });
});
