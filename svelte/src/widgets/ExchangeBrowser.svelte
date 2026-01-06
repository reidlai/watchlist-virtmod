<script lang="ts">
  import {
    exchanges,
    exchangesByCountry,
    exchangeLoading,
    exchangeError,
    exchangeActions,
  } from "../stores";
  import type { Exchange } from "@modules/watchlist-ts";
  import * as Card from "@ui/card";

  // Search state
  let searchQuery = "";
  let selectedExchange: Exchange | null = null;

  // Reactive statements
  $: exchangeList = $exchanges;
  $: loading = $exchangeLoading;
  $: error = $exchangeError;
  $: groupedExchanges = $exchangesByCountry;

  // Filtered exchanges based on search
  $: filteredExchanges = searchQuery
    ? exchangeList.filter(
        (ex) =>
          ex.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ex.operating_mic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ex.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ex.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (ex.acronym && ex.acronym.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : exchangeList;

  function handleSearch() {
    if (searchQuery.trim()) {
      exchangeActions.search(searchQuery).subscribe();
    } else {
      exchangeActions.refresh().subscribe();
    }
  }

  function handleSelectExchange(exchange: Exchange) {
    selectedExchange = exchange;
  }

  function handleRefresh() {
    exchangeActions.refresh().subscribe();
    searchQuery = "";
  }

  function clearError() {
    exchangeActions.clearError();
  }
</script>

<Card.Root class="w-full max-w-6xl">
  <Card.Header>
    <div class="flex items-center justify-between">
      <div>
        <Card.Title>Exchange Browser</Card.Title>
        <Card.Description>
          Browse and search stock exchanges ({exchangeList.length} total)
        </Card.Description>
      </div>
      <button
        class="px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md"
        on:click={handleRefresh}
        disabled={loading}
      >
        Refresh
      </button>
    </div>
  </Card.Header>

  <Card.Content>
    <!-- Error Display -->
    {#if error}
      <div class="mb-4 p-3 bg-destructive/10 border border-destructive rounded-md flex items-center justify-between">
        <span class="text-sm text-destructive">{error}</span>
        <button
          class="text-xs text-destructive hover:underline"
          on:click={clearError}
        >
          Dismiss
        </button>
      </div>
    {/if}

    <!-- Search Bar -->
    <div class="mb-6">
      <div class="flex gap-2">
        <input
          type="text"
          bind:value={searchQuery}
          on:input={handleSearch}
          placeholder="Search by name, MIC, country, or city..."
          class="flex-1 px-4 py-2 border rounded-md text-sm"
        />
        {#if searchQuery}
          <button
            class="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm"
            on:click={() => {
              searchQuery = "";
              handleRefresh();
            }}
          >
            Clear
          </button>
        {/if}
      </div>
      <p class="mt-2 text-xs text-muted-foreground">
        {filteredExchanges.length} exchange{filteredExchanges.length !== 1 ? "s" : ""} found
      </p>
    </div>

    <!-- Loading State -->
    {#if loading}
      <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span class="ml-3 text-sm text-muted-foreground">Loading exchanges...</span>
      </div>
    
    <!-- Empty State -->
    {:else if filteredExchanges.length === 0}
      <div class="text-center py-12">
        <p class="text-muted-foreground">
          {searchQuery ? "No exchanges match your search" : "No exchanges available"}
        </p>
      </div>
    
    <!-- Exchange Grid -->
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredExchanges as exchange (exchange.operating_mic)}
          <button
            class="text-left p-4 border rounded-lg hover:bg-muted/50 hover:border-primary transition-all {selectedExchange?.operating_mic === exchange.operating_mic ? 'border-primary bg-muted/50' : ''}"
            on:click={() => handleSelectExchange(exchange)}
          >
            <div class="flex items-start justify-between mb-2">
              <div class="font-mono text-xs font-semibold text-primary">
                {exchange.operating_mic}
              </div>
              {#if exchange.acronym}
                <div class="px-2 py-1 bg-secondary text-xs rounded">
                  {exchange.acronym}
                </div>
              {/if}
            </div>

            <h3 class="font-semibold text-sm mb-1 line-clamp-2">
              {exchange.exchange_name}
            </h3>

            <p class="text-xs text-muted-foreground mb-2 line-clamp-1">
              {exchange.display_name}
            </p>

            <div class="flex items-center gap-2 text-xs">
              <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {exchange.country}
              </span>
              <span class="text-muted-foreground">
                {exchange.city}
              </span>
            </div>
          </button>
        {/each}
      </div>
    {/if}

    <!-- Selected Exchange Details -->
    {#if selectedExchange}
      <div class="mt-6 p-4 border-t">
        <h3 class="text-sm font-semibold mb-3">Selected Exchange Details</h3>
        <dl class="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt class="text-muted-foreground">Operating MIC</dt>
            <dd class="font-mono font-semibold">{selectedExchange.operating_mic}</dd>
          </div>
          <div>
            <dt class="text-muted-foreground">Acronym</dt>
            <dd class="font-semibold">{selectedExchange.acronym || "N/A"}</dd>
          </div>
          <div class="col-span-2">
            <dt class="text-muted-foreground">Full Name</dt>
            <dd class="font-semibold">{selectedExchange.exchange_name}</dd>
          </div>
          <div class="col-span-2">
            <dt class="text-muted-foreground">Display Name</dt>
            <dd>{selectedExchange.display_name}</dd>
          </div>
          <div>
            <dt class="text-muted-foreground">Country</dt>
            <dd>{selectedExchange.country}</dd>
          </div>
          <div>
            <dt class="text-muted-foreground">City</dt>
            <dd>{selectedExchange.city}</dd>
          </div>
        </dl>
      </div>
    {/if}
  </Card.Content>
</Card.Root>
