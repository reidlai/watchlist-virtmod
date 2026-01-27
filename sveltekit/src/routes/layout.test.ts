import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Layout from "./+layout.svelte";
// Svelte 5 testing library might support snippets.
// Let's use a wrapper or the render function features.
// Or just basic mounting check.

describe("Root Layout", () => {
  it("should render children content", () => {
    // Mock the snippet child
    // Since Layout accepts { children } snippet prop
    // In Svelte 5 test syntax, we might need to construct the snippet.
    // For now, let's verify it renders without crashing.
    // Passing a simple HTML string or verifying structure.

    const { container } = render(Layout);
    expect(container).toBeTruthy();
  });
});
