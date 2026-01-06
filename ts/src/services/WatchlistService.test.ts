import { describe, it, expect, beforeEach, vi } from "vitest";
import { WatchlistService, type TickerItem } from "./WatchlistService";
import { firstValueFrom } from "rxjs";

// Mock fetch globally
global.fetch = vi.fn();

describe("WatchlistService", () => {
    let service: WatchlistService;

    beforeEach(() => {
        // Reset singleton instance before each test
        (WatchlistService as any).instance = undefined;
        vi.clearAllMocks();
    });

    describe("Initialization", () => {
        it("should create a singleton instance", () => {
            const instance1 = WatchlistService.getInstance();
            const instance2 = WatchlistService.getInstance();
            expect(instance1).toBe(instance2);
        });

        it("should initialize with empty state", () => {
            service = WatchlistService.getInstance();
            const state = service.currentState;
            expect(state.tickers).toEqual([]);
            expect(state.loading).toBe(false);
            expect(state.error).toBe(null);
        });
    });

    describe("fetchTickers", () => {
        it("should fetch tickers successfully", async () => {
            const mockTickers: TickerItem[] = [
                { symbol: "AAPL", on_hand: true, created_at: "2024-01-01" },
                { symbol: "GOOGL", on_hand: false, created_at: "2024-01-02" },
            ];

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockTickers,
            });

            service = WatchlistService.getInstance();
            const result = await firstValueFrom(service.fetchTickers());

            expect(result).toEqual(mockTickers);
            expect(service.currentState.tickers).toEqual(mockTickers);
            expect(service.currentState.loading).toBe(false);
            expect(service.currentState.error).toBe(null);
        });

        it("should handle fetch errors", async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
            });

            service = WatchlistService.getInstance();

            try {
                await firstValueFrom(service.fetchTickers());
                expect.fail("Should have thrown an error");
            } catch (error: any) {
                expect(error.message).toContain("HTTP 500");
                expect(service.currentState.error).toContain("HTTP 500");
                expect(service.currentState.loading).toBe(false);
            }
        });

        it("should set loading state during fetch", (done) => {
            (global.fetch as any).mockImplementationOnce(
                () =>
                    new Promise((resolve) =>
                        setTimeout(
                            () =>
                                resolve({
                                    ok: true,
                                    json: async () => [],
                                }),
                            100
                        )
                    )
            );

            service = WatchlistService.getInstance();

            // Check loading state immediately after calling fetch
            service.fetchTickers().subscribe();

            setTimeout(() => {
                expect(service.currentState.loading).toBe(true);
                done();
            }, 10);
        });
    });

    describe("addTicker", () => {
        it("should add a ticker successfully", async () => {
            const newTicker: TickerItem = {
                symbol: "TSLA",
                on_hand: true,
                created_at: "2024-01-03",
            };

            // Mock POST response
            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => newTicker,
            });

            // Mock GET response for refresh
            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => [newTicker],
            });

            service = WatchlistService.getInstance();
            const result = await firstValueFrom(service.addTicker("TSLA", true));

            expect(result).toEqual(newTicker);
            expect(global.fetch).toHaveBeenCalledWith(
                "/watchlist",
                expect.objectContaining({
                    method: "POST",
                    headers: expect.objectContaining({
                        "Content-Type": "application/json",
                        "X-User-ID": "demo-user",
                    }),
                })
            );
        });

        it("should handle add errors", async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: "Bad Request",
            });

            service = WatchlistService.getInstance();

            try {
                await firstValueFrom(service.addTicker("INVALID", true));
                expect.fail("Should have thrown an error");
            } catch (error: any) {
                expect(error.message).toContain("HTTP 400");
                expect(service.currentState.error).toContain("HTTP 400");
            }
        });
    });

    describe("removeTicker", () => {
        it("should remove a ticker successfully", async () => {
            // Mock DELETE response
            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
            });

            // Mock GET response for refresh
            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => [],
            });

            service = WatchlistService.getInstance();
            await firstValueFrom(service.removeTicker("AAPL"));

            expect(global.fetch).toHaveBeenCalledWith(
                "/watchlist/AAPL",
                expect.objectContaining({
                    method: "DELETE",
                    headers: expect.objectContaining({
                        "X-User-ID": "demo-user",
                    }),
                })
            );
        });

        it("should handle remove errors", async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: "Not Found",
            });

            service = WatchlistService.getInstance();

            try {
                await firstValueFrom(service.removeTicker("NONEXISTENT"));
                expect.fail("Should have thrown an error");
            } catch (error: any) {
                expect(error.message).toContain("HTTP 404");
            }
        });
    });

    describe("Svelte store compatibility", () => {
        it("should implement subscribe method", () => {
            service = WatchlistService.getInstance();
            expect(typeof service.subscribe).toBe("function");
        });

        it("should notify subscribers on state changes", (done) => {
            const mockTickers: TickerItem[] = [
                { symbol: "AAPL", on_hand: true },
            ];

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockTickers,
            });

            service = WatchlistService.getInstance();

            let callCount = 0;
            const unsubscribe = service.subscribe((tickers) => {
                callCount++;
                if (callCount === 2) {
                    // First call is initial empty state, second is after fetch
                    expect(tickers).toEqual(mockTickers);
                    unsubscribe();
                    done();
                }
            });

            service.fetchTickers().subscribe();
        });
    });

    describe("State management", () => {
        it("should update userId and trigger refetch", async () => {
            (global.fetch as any).mockResolvedValue({
                ok: true,
                json: async () => [],
            });

            service = WatchlistService.getInstance();
            service.setUserId("new-user");

            expect(global.fetch).toHaveBeenCalledWith(
                "/watchlist",
                expect.objectContaining({
                    headers: expect.objectContaining({
                        "X-User-ID": "new-user",
                    }),
                })
            );
        });

        it("should clear error state", () => {
            service = WatchlistService.getInstance();
            (service as any).updateState({ error: "Test error" });

            expect(service.currentState.error).toBe("Test error");

            service.clearError();
            expect(service.currentState.error).toBe(null);
        });
    });

    describe("Observable streams", () => {
        it("should expose tickers$ observable", (done) => {
            const mockTickers: TickerItem[] = [{ symbol: "AAPL", on_hand: true }];

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockTickers,
            });

            service = WatchlistService.getInstance();

            service.tickers$.subscribe((tickers) => {
                if (tickers.length > 0) {
                    expect(tickers).toEqual(mockTickers);
                    done();
                }
            });

            service.fetchTickers().subscribe();
        });

        it("should expose loading$ observable", (done) => {
            (global.fetch as any).mockImplementationOnce(
                () =>
                    new Promise((resolve) =>
                        setTimeout(
                            () =>
                                resolve({
                                    ok: true,
                                    json: async () => [],
                                }),
                            50
                        )
                    )
            );

            service = WatchlistService.getInstance();

            let loadingStates: boolean[] = [];
            service.loading$.subscribe((loading) => {
                loadingStates.push(loading);
                if (loadingStates.length === 3) {
                    // [false, true, false]
                    expect(loadingStates).toEqual([false, true, false]);
                    done();
                }
            });

            service.fetchTickers().subscribe();
        });

        it("should expose error$ observable", (done) => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "Error",
            });

            service = WatchlistService.getInstance();

            service.error$.subscribe((error) => {
                if (error !== null) {
                    expect(error).toContain("HTTP 500");
                    done();
                }
            });

            service.fetchTickers().subscribe({
                error: () => { }, // Ignore error for this test
            });
        });
    });
});
