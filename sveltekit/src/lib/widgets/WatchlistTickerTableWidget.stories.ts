import type { Meta, StoryObj } from "@storybook/svelte";
import WatchlistTickerTableWidget from "./WatchlistTickerTableWidget.svelte";

const meta: Meta<typeof WatchlistTickerTableWidget> = {
    title: "Widgets/WatchlistTickerTableWidget",
    component: WatchlistTickerTableWidget,
    tags: ["autodocs"],
    argTypes: {
        tickers: {
            control: "object",
            description: "Array of ticker data objects",
        },
        loading: {
            control: "boolean",
            description: "Loading state",
        },
        error: {
            control: "text",
            description: "Error message (if any)",
        },
    },
};

export default meta;
type Story = StoryObj<typeof WatchlistTickerTableWidget>;

const mockTickers = [
    {
        symbol: "GOOG",
        name: "Alphabet C",
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

export const Default: Story = {
    args: {
        tickers: mockTickers,
        loading: false,
        error: null,
    },
};

export const Loading: Story = {
    args: {
        tickers: [],
        loading: true,
        error: null,
    },
};

export const Empty: Story = {
    args: {
        tickers: [],
        loading: false,
        error: null,
    },
};

export const Error: Story = {
    args: {
        tickers: [],
        loading: false,
        error: "Failed to fetch watchlist data",
    },
};
