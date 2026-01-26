import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

// Mock matchMedia for Sonner (required for real Toaster)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
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
    });

    it("should render populated table using passed data", () => {
        const mockData = {
            tickers: [{ symbol: "AAPL", last: 150.00, volume: 100 }],
            loading: false,
            error: null,
            usingMockData: true,
        };

        // Pass data via props option
        render(Page, { props: { data: mockData } });

        // Assert that the real widget rendered the data
        expect(screen.getByText("AAPL")).toBeTruthy();
        expect(screen.getByText("150.00")).toBeTruthy();
    });

    it("should render loading state", () => {
        const mockData = {
            loading: true,
            tickers: [],
            error: null,
            usingMockData: true,
        };

        render(Page, { props: { data: mockData } });

        expect(screen.getByText("Loading...")).toBeTruthy();
    });
});
