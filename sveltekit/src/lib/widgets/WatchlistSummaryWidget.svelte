<script lang="ts">
  import * as Card from "../components/ui/card";

  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { WatchlistState } from "../states/WatchlistState.svelte";
  import type { IWatchlistSummaryWidgetStory } from "./WatchlistSummaryWidget.types";

  let {
    tickers: tickersProp,
    data: dataProp,
    loading: loadingProp,
    error: errorProp,
    usingMockData: usingMockDataProp,
    tickerCount: tickerCountProp,
  }: IWatchlistSummaryWidgetStory = $props();

  let watchlistState = WatchlistState.getInstance();

  /**
   * Check if rendering in Storybook.
   * STORYBOOK environment variable is often set by the storybook-vite builder.
   */
  const isStorybook =
    browser &&
    ((window as any).__STORYBOOK_CLIENT_API__ !== undefined ||
      import.meta.env.STORYBOOK === "true");

  let tickers = $derived(
    tickersProp ?? dataProp?.tickers ?? watchlistState.tickers ?? [],
  );
  let loading = $derived(
    loadingProp ?? dataProp?.loading ?? watchlistState.loading ?? false,
  );
  let error = $derived(
    errorProp ?? dataProp?.error ?? watchlistState.error ?? null,
  );
  let usingMockData = $derived(
    usingMockDataProp ?? watchlistState.usingMockData ?? isStorybook,
  );

  let tickerCount = $derived(tickerCountProp ?? tickers.length ?? 0);

  function handleClick() {
    goto("/watchlist");
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }

  if (isStorybook) {
    $effect(() => {
      watchlistState.usingMockData = usingMockData;
    });
  }
</script>

<div
  role="button"
  tabindex="0"
  class="@container w-full h-full cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
  onclick={handleClick}
  onkeydown={handleKeydown}
>
  <Card.Root class="w-full h-full">
    <Card.Header>
      <Card.Description>Number of Tickers in Watchlist</Card.Description>

      {#if loading}
        <div class="flex items-center space-x-2">
          <div
            class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"
          ></div>
          <span class="text-sm text-muted-foreground">Loading...</span>
        </div>
      {:else if error}
        <div class="text-sm text-red-500 text-destructive">
          {error}
        </div>
      {:else}
        <Card.Title class="text-3xl font-bold tracking-tight">
          {tickerCount}
        </Card.Title>
      {/if}
    </Card.Header>

    <Card.Content>
      {#if !loading && !error}
        <p class="text-sm text-muted-foreground">
          {tickerCount}
          {tickerCount === 1 ? "ticker" : "tickers"} tracked
        </p>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
