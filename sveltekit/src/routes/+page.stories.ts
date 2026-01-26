import type { Meta, StoryObj } from "@storybook/svelte";
import Page from "./+page.svelte";
import type { PageData } from "./$types";

const meta: Meta<typeof Page> = {
    title: "Routes/Home Page",
    component: Page,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof Page>;

const mockTickers = [
    {
        symbol: "GOOG",
        name: "Alphabet C",
        currency: "USD",
        last: 336.42,
        open: 334.68,
        high: 337.02,
        low: 331.14,
        change: -0.01,
        changePercent: 0,
        volume: 12760000,
        last_updated_at: 1716654000000,
    },
    {
        symbol: "NVDA",
        name: "NVIDIA",
        currency: "USD",
        last: 183.27,
        open: 184.33,
        high: 184.45,
        low: 180.83,
        change: -2.54,
        changePercent: -1.37,
        volume: 141230000,
        last_updated_at: 1716654000000,
    },
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        currency: "USD",
        last: 180.00,
        open: 179.00,
        high: 181.00,
        low: 178.00,
        change: 1.00,
        changePercent: 0.56,
        volume: 50000000,
        last_updated_at: 1716654000000,
    }
];

// Mock PageData
const createMockData = (overrides: Partial<any> = {}): PageData & { loading: boolean } => ({
    tickers: mockTickers,
    loading: false,
    error: null,
    usingMockData: true,
    ...overrides
});

export const Default: Story = {
    args: {
        data: createMockData(),
    },
};

export const Loading: Story = {
    args: {
        data: createMockData({
            loading: true,
            tickers: []
        }),
    },
};

export const Error: Story = {
    args: {
        data: createMockData({
            tickers: [],
            error: "Failed to load watchlist data."
        }),
    },
};

export const Empty: Story = {
    args: {
        data: createMockData({
            tickers: [],
        }),
    },
};
