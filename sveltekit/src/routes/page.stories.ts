import type { Meta, StoryObj } from "@storybook/svelte";
import Page from "./+page.svelte";

const meta: Meta<typeof Page> = {
  title: "Routes/Home Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

// Mock PageData
// No props needed for Page as it uses the singleton state

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {},
};

export const Error: Story = {
  args: {},
};

export const Empty: Story = {
  args: {},
};
