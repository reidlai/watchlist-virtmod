import { describe, it, expect, beforeEach, vi } from "vitest";
import { ExchangeService, type Exchange } from "./ExchangeService";
import { firstValueFrom, filter, skip, take, toArray } from "rxjs";

// Mock fetch globally
global.fetch = vi.fn();

describe("ExchangeService", () => {
    let service: ExchangeService;

    beforeEach(() => {
        // Reset singleton instance before each test
        (ExchangeService as any).instance = undefined;
        vi.clearAllMocks();
    });

    describe("Initialization", () => {
        it("should create a singleton instance", () => {
            const instance1 = ExchangeService.getInstance();
            const instance2 = ExchangeService.getInstance();
            expect(instance1).toBe(instance2);
        });

        it("should initialize with empty state", () => {
            service = ExchangeService.getInstance();
            const state = service.currentState;
            expect(state.exchanges).toEqual([]);
            expect(state.loading).toBe(false);
            expect(state.error).toBe(null);
        });
    });

    describe("fetchExchanges", () => {
        it("should fetch all exchanges successfully", async () => {
            const mockExchanges: Exchange[] = [
                {
                    operating_mic: "XNYS",
                    exchange_name: "NEW YORK STOCK EXCHANGE",
                    display_name: "NYSE - NEW YORK STOCK EXCHANGE (US)",
                    country: "US",
                    city: "NEW YORK",
                    acronym: "NYSE",
                },
                {
                    operating_mic: "XLON",
                    exchange_name: "LONDON STOCK EXCHANGE",
                    display_name: "LSE - LONDON STOCK EXCHANGE (GB)",
                    country: "GB",
                    city: "LONDON",
                    acronym: "LSE",
                },
            ];

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockExchanges,
            });

            service = ExchangeService.getInstance();
            const result = await firstValueFrom(service.fetchExchanges());

            expect(result).toEqual(mockExchanges);
            expect(service.currentState.exchanges).toEqual(mockExchanges);
            expect(service.currentState.loading).toBe(false);
            expect(service.currentState.error).toBe(null);
            expect(global.fetch).toHaveBeenCalledWith("/exchanges");
        });

        it("should fetch exchanges with query filter", async () => {
            const mockExchanges: Exchange[] = [
                {
                    operating_mic: "XNYS",
                    exchange_name: "NEW YORK STOCK EXCHANGE",
                    display_name: "NYSE - NEW YORK STOCK EXCHANGE (US)",
                    country: "US",
                    city: "NEW YORK",
                    acronym: "NYSE",
                },
            ];

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockExchanges,
            });

            service = ExchangeService.getInstance();
            const result = await firstValueFrom(service.fetchExchanges("New York"));

            expect(result).toEqual(mockExchanges);
            expect(global.fetch).toHaveBeenCalledWith(
                "/exchanges?query=New%20York"
            );
        });

        it("should handle fetch errors", async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
            });

            service = ExchangeService.getInstance();

            try {
                await firstValueFrom(service.fetchExchanges());
                expect.fail("Should have thrown an error");
            } catch (error: any) {
                expect(error.message).toContain("HTTP 500");
                expect(service.currentState.error).toContain("HTTP 500");
                expect(service.currentState.loading).toBe(false);
            }
        });
    });

    describe("getExchange", () => {
        it("should get a specific exchange by MIC", async () => {
            const mockExchange: Exchange = {
                operating_mic: "XNYS",
                exchange_name: "NEW YORK STOCK EXCHANGE",
                display_name: "NYSE - NEW YORK STOCK EXCHANGE (US)",
                country: "US",
                city: "NEW YORK",
                acronym: "NYSE",
            };

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockExchange,
            });

            service = ExchangeService.getInstance();
            const result = await firstValueFrom(service.getExchange("XNYS"));

            expect(result).toEqual(mockExchange);
            expect(global.fetch).toHaveBeenCalledWith("/exchanges/XNYS");
        });

        it("should handle 404 errors with custom message", async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: "Not Found",
            });

            service = ExchangeService.getInstance();

            try {
                await firstValueFrom(service.getExchange("INVALID"));
                expect.fail("Should have thrown an error");
            } catch (error: any) {
                expect(error.message).toContain("Exchange INVALID not found");
            }
        });

        it("should handle other HTTP errors", async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
            });

            service = ExchangeService.getInstance();

            try {
                await firstValueFrom(service.getExchange("XNYS"));
                expect.fail("Should have thrown an error");
            } catch (error: any) {
                expect(error.message).toContain("HTTP 500");
            }
        });
    });

    describe("searchExchanges", () => {
        it("should search exchanges by query", async () => {
            const mockExchanges: Exchange[] = [
                {
                    operating_mic: "XLON",
                    exchange_name: "LONDON STOCK EXCHANGE",
                    display_name: "LSE - LONDON STOCK EXCHANGE (GB)",
                    country: "GB",
                    city: "LONDON",
                    acronym: "LSE",
                },
            ];

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockExchanges,
            });

            service = ExchangeService.getInstance();
            const result = await firstValueFrom(service.searchExchanges("London"));

            expect(result).toEqual(mockExchanges);
            expect(global.fetch).toHaveBeenCalledWith("/exchanges?query=London");
        });
    });

    describe("Svelte store compatibility", () => {
        it("should implement subscribe method", () => {
            service = ExchangeService.getInstance();
            expect(typeof service.subscribe).toBe("function");
        });

        it("should notify subscribers on state changes", async () => {
            const mockExchanges: Exchange[] = [
                {
                    operating_mic: "XNYS",
                    exchange_name: "NYSE",
                    display_name: "NYSE (US)",
                    country: "US",
                    city: "NEW YORK",
                },
            ];

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockExchanges,
            });

            service = ExchangeService.getInstance();

            const promise = firstValueFrom(service.exchanges$.pipe(
                filter(exchanges => exchanges.length > 0)
            ));

            service.fetchExchanges().subscribe();

            const exchanges = await promise;
            expect(exchanges).toEqual(mockExchanges);
        });
    });

    describe("State management", () => {
        it("should clear error state", () => {
            service = ExchangeService.getInstance();
            (service as any).updateState({ error: "Test error" });

            expect(service.currentState.error).toBe("Test error");

            service.clearError();
            expect(service.currentState.error).toBe(null);
        });
    });

    describe("Observable streams", () => {
        it("should expose exchanges$ observable", async () => {
            const mockExchanges: Exchange[] = [
                {
                    operating_mic: "XNYS",
                    exchange_name: "NYSE",
                    display_name: "NYSE (US)",
                    country: "US",
                    city: "NEW YORK",
                },
            ];

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockExchanges,
            });

            service = ExchangeService.getInstance();

            const promise = firstValueFrom(service.exchanges$.pipe(
                filter(exchanges => exchanges.length > 0)
            ));

            service.fetchExchanges().subscribe();

            const exchanges = await promise;
            expect(exchanges).toEqual(mockExchanges);
        });

        it("should expose loading$ observable", async () => {
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

            service = ExchangeService.getInstance();

            const loadingPromise = firstValueFrom(service.loading$.pipe(
                skip(1), // Skip initial false
                take(2), // Take true, then false
                toArray()
            ));

            service.fetchExchanges().subscribe();

            const loadingStates = await loadingPromise;
            expect(loadingStates).toEqual([true, false]);
        });

        it("should expose error$ observable", async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "Error",
            });

            service = ExchangeService.getInstance();

            const errorPromise = firstValueFrom(service.error$.pipe(
                filter(e => e !== null)
            ));

            service.fetchExchanges().subscribe({
                error: () => { }, // Ignore error for this test
            });

            const error = await errorPromise;
            expect(error).toContain("HTTP 500");
        });
    });
});
