<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    tickers,
    tickerCount,
    watchlistLoading,
    watchlistError,
    exchangeMap,
  } from "../stores";
  import * as Card from "@ui/card";

  // Reactive statements using Svelte's $ syntax
  $: tickerList = $tickers;
  $: count = $tickerCount;
  $: loading = $watchlistLoading;
  $: error = $watchlistError;
  $: exchanges = $exchangeMap;

  // Calculate unique exchanges from real exchange data
  $: uniqueExchangeCount = new Set(
    tickerList
      .map((t) => {
        // Try to find exchange by symbol prefix or other logic
        // This is a simplified approach - in production you'd have
        // a proper symbol-to-exchange mapping
        const symbolPrefix = t.symbol.substring(0, 2);
        return Array.from(exchanges.values()).find(
          (ex) => ex.acronym === symbolPrefix || ex.operating_mic.includes(symbolPrefix)
        )?.operating_mic;
      })
      .filter(Boolean)
  ).size;

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
            {uniqueExchangeCount || 0}
          </span>
          <span class="text-sm text-muted-foreground">Markets</span>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
