<script lang="ts">
  import * as Card from "../components/ui/card";
  import { type IWatchlistSummaryWidgetStory } from "./WatchlistSummaryWidget.types";
  import { onMount } from "svelte";
  import { watchlistState } from "../runes/WatchlistState.svelte";
  // Use the singleton instance directly
  import { goto } from "$app/navigation";
  let {
    tickers: tickersProp,
    tickerCount: tickerCountProp,
    loading: loadingProp,
    error: errorProp,
  }: IWatchlistSummaryWidgetStory = $props();

  let tickers = $derived(
    tickersProp ?? watchlistState.tickers ?? ["PLACEHOLDER"],
  );
  let loading = $derived(loadingProp ?? watchlistState.loading ?? false);
  let error = $derived(errorProp ?? watchlistState.error ?? null);

  let tickerCount = $derived(tickerCountProp ?? tickers.length);

  function handleClick() {
    goto("/watchlist");
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }

  onMount(() => {
    watchlistState.getWatchlist();
  });
</script>

<div
  role="button"
  tabindex="0"
  class="@container w-full h-full cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
  onclick={handleClick}
  onkeydown={handleKeydown}
>
  <Card.Root
    class="@container w-full h-full cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
  >
    <Card.Header class="pb-2">
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
