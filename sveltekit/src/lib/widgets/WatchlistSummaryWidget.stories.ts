import type { Meta, StoryObj } from "@storybook/svelte";
import WatchlistSummaryWidget from "./WatchlistSummaryWidget.svelte";
const meta: Meta<typeof WatchlistSummaryWidget> = {
  title: "Widgets/WatchlistSummaryWidget",
  component: WatchlistSummaryWidget,
  tags: ["autodocs"],
  argTypes: {
    tickers: {
      control: "object",
      description: "Array of ticker symbols",
    },
    tickerCount: {
      control: "number",
      description: "Placeholder of tickerCount in storybook",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    error: {
      control: "text",
      description: "Error message (if any)",
    },
    usingMockData: {
      control: "boolean",
      description: "Use mock data from service",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WatchlistSummaryWidget>;

export const Default: Story = {
  args: {
    tickers: [
      {
        name: "Alphabet C",
        symbol: "GOOG",
        last: 336.42,
        open: 334.68,
        high: 337.02,
        low: 331.14,
        change: -0.01,
        changePercent: 0,
        volume: 12760000,
      },
      {
        name: "NVIDIA",
        symbol: "NVDA",
        last: 183.27,
        open: 184.33,
        high: 184.45,
        low: 180.83,
        change: -2.54,
        changePercent: -1.37,
        volume: 141230000,
      },
    ],
    tickerCount: 2,
    loading: false,
    error: "",
    usingMockData: true,
  },
};

export const Loading: Story = {
  args: {
    tickers: [
      {
        name: "Alphabet C",
        symbol: "GOOG",
        last: 336.42,
        open: 334.68,
        high: 337.02,
        low: 331.14,
        change: -0.01,
        changePercent: 0,
        volume: 12760000,
      },
      {
        name: "NVIDIA",
        symbol: "NVDA",
        last: 183.27,
        open: 184.33,
        high: 184.45,
        low: 180.83,
        change: -2.54,
        changePercent: -1.37,
        volume: 141230000,
      },
    ],
    tickerCount: 2,
    loading: true,
    error: "",
    usingMockData: true,
  },
};

export const Error: Story = {
  args: {
    tickers: [
      {
        name: "Alphabet C",
        symbol: "GOOG",
        last: 336.42,
        open: 334.68,
        high: 337.02,
        low: 331.14,
        change: -0.01,
        changePercent: 0,
        volume: 12760000,
      },
      {
        name: "NVIDIA",
        symbol: "NVDA",
        last: 183.27,
        open: 184.33,
        high: 184.45,
        low: 180.83,
        change: -2.54,
        changePercent: -1.37,
        volume: 141230000,
      },
    ],
    tickerCount: 2,
    loading: false,
    error: "No tickers in watchlist",
    usingMockData: true,
  },
};
