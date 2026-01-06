import { vi } from "vitest";

/**
 * Test Utilities for Mocking HTTP Responses
 * 
 * These utilities help create consistent mocks and stubs for testing
 * services without making real network calls.
 */

/**
 * Mock a successful HTTP response
 * 
 * @example
 * mockFetchSuccess({ symbol: 'AAPL', on_hand: true });
 */
export function mockFetchSuccess<T>(data: T) {
    (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => data,
    });
}

/**
 * Mock an HTTP error response
 * 
 * @example
 * mockFetchError(404, 'Not Found');
 */
export function mockFetchError(status: number, statusText: string) {
    (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status,
        statusText,
    });
}

/**
 * Mock a network error (e.g., connection refused)
 * 
 * @example
 * mockNetworkError('Connection refused');
 */
export function mockNetworkError(message: string) {
    (global.fetch as any).mockRejectedValueOnce(new Error(message));
}

/**
 * Mock a delayed response (for testing loading states)
 * 
 * @example
 * mockFetchDelayed([], 100); // 100ms delay
 */
export function mockFetchDelayed<T>(data: T, delayMs: number) {
    (global.fetch as any).mockImplementationOnce(
        () =>
            new Promise((resolve) =>
                setTimeout(
                    () =>
                        resolve({
                            ok: true,
                            status: 200,
                            json: async () => data,
                        }),
                    delayMs
                )
            )
    );
}

/**
 * Setup global fetch mock
 * Call this in beforeEach to ensure fetch is mocked
 */
export function setupFetchMock() {
    if (!global.fetch) {
        global.fetch = vi.fn();
    }
    vi.clearAllMocks();
}

/**
 * Verify fetch was called with specific parameters
 * 
 * @example
 * expectFetchCalledWith('/watchlist', { method: 'POST' });
 */
export function expectFetchCalledWith(
    url: string,
    options?: RequestInit
) {
    if (options) {
        expect(global.fetch).toHaveBeenCalledWith(
            url,
            expect.objectContaining(options)
        );
    } else {
        expect(global.fetch).toHaveBeenCalledWith(url);
    }
}

/**
 * Verify fetch was NOT called
 */
export function expectFetchNotCalled() {
    expect(global.fetch).not.toHaveBeenCalled();
}
