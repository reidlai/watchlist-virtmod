<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    tickerCount,
    watchlistLoading,
    watchlistError,
    uniqueExchangeCount,
  } from "../stores";
  import * as Card from "@ui/card";

  // Reactive statements using Svelte's $ syntax
  $: count = $tickerCount;
  $: loading = $watchlistLoading;
  $: error = $watchlistError;
  $: uniqueMarkets = $uniqueExchangeCount;

  function handleClick() {
    goto("/watchlist");
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }
</script>

<div
  role="button"
  tabindex="0"
  class="@container w-full h-full cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
  on:click={handleClick}
  on:keydown={handleKeydown}
>
  <Card.Root
    class="h-full flex flex-col justify-between border-l-4 border-l-primary"
  >
    <Card.Header class="pb-2">
      <Card.Description>Number of Tickers in Watchlist</Card.Description>
      
      {#if loading}
        <div class="flex items-center space-x-2">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span class="text-sm text-muted-foreground">Loading...</span>
        </div>
      {:else if error}
        <div class="text-sm text-destructive">
          {error}
        </div>
      {:else}
        <Card.Title class="text-3xl font-bold tracking-tight">
          {count}
        </Card.Title>
      {/if}
    </Card.Header>
    
    <Card.Content>
      {#if !loading && !error}
        <div class="flex items-center space-x-2">
          <span class="text-sm text-muted-foreground">In</span>
          <span class="font-semibold text-sm">
            {uniqueMarkets || 0}
          </span>
          <span class="text-sm text-muted-foreground">Markets</span>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
