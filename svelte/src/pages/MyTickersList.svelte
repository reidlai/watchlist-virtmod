<script lang="ts">
  import {
    tickers,
    tickerCount,
    tickersOnHand,
    watchlistLoading,
    watchlistError,
    watchlistActions,
    exchanges,
    exchangeLoading,
  } from "../stores";
  import type { TickerItem } from "@modules/watchlist-ts";

  // Form state
  let newSymbol = "";
  let newOnHand = false;
  let selectedExchange = "";
  let searchQuery = "";
  let showAddForm = false;

  // Reactive statements
  $: tickerList = $tickers;
  $: count = $tickerCount;
  $: onHandCount = $tickersOnHand;
  $: loading = $watchlistLoading;
  $: error = $watchlistError;
  $: exchangeList = $exchanges;
  $: exchangesLoading = $exchangeLoading;

  // Filtered tickers based on search
  $: filteredTickers = searchQuery
    ? tickerList.filter((t) =>
        t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tickerList;

  function handleAddTicker() {
    if (!newSymbol.trim()) return;

    watchlistActions.addTicker(newSymbol.toUpperCase(), newOnHand).subscribe({
      next: () => {
        // Reset form
        newSymbol = "";
        newOnHand = false;
        selectedExchange = "";
        showAddForm = false;
      },
      error: (err) => {
        console.error("Failed to add ticker:", err);
      },
    });
  }

  function handleRemoveTicker(symbol: string) {
    if (!confirm(`Remove ${symbol} from watchlist?`)) return;

    watchlistActions.removeTicker(symbol).subscribe({
      error: (err) => {
        console.error("Failed to remove ticker:", err);
      },
    });
  }

  function handleRefresh() {
    watchlistActions.refresh().subscribe();
  }

  function clearError() {
    watchlistActions.clearError();
  }
</script>

<div class="container mx-auto px-4 py-8 max-w-6xl">
  <!-- Page Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold tracking-tight mb-2">My Watchlist</h1>
    <p class="text-muted-foreground">
      Manage your stock tickers ({count} total, {onHandCount} on hand)
    </p>
  </div>

  <!-- Action Bar -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex gap-2">
      <button
        class="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
        on:click={handleRefresh}
        disabled={loading}
      >
        {loading ? "Refreshing..." : "Refresh"}
      </button>
      <button
        class="px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
        on:click={() => (showAddForm = !showAddForm)}
      >
        {showAddForm ? "Cancel" : "Add Ticker"}
      </button>
    </div>

    <!-- Search -->
    {#if count > 0}
      <div class="w-64">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search tickers..."
          class="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
    {/if}
  </div>

  <!-- Error Display -->
  {#if error}
    <div class="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg flex items-center justify-between">
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm text-destructive">{error}</span>
      </div>
      <button
        class="text-xs text-destructive hover:underline"
        on:click={clearError}
      >
        Dismiss
      </button>
    </div>
  {/if}

  <!-- Add Ticker Form -->
  {#if showAddForm}
    <div class="mb-8 p-6 border rounded-lg bg-muted/50">
      <h2 class="text-lg font-semibold mb-4">Add New Ticker</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="text-sm font-medium block mb-2">
            Symbol *
          </label>
          <input
            type="text"
            bind:value={newSymbol}
            placeholder="AAPL"
            class="w-full px-3 py-2 border rounded-md text-sm uppercase"
            maxlength="10"
            on:keydown={(e) => e.key === "Enter" && handleAddTicker()}
          />
        </div>

        <div>
          <label class="text-sm font-medium block mb-2">
            Exchange (Optional)
          </label>
          <select
            bind:value={selectedExchange}
            class="w-full px-3 py-2 border rounded-md text-sm"
            disabled={exchangesLoading}
          >
            <option value="">Select exchange...</option>
            {#each exchangeList as exchange}
              <option value={exchange.operating_mic}>
                {exchange.acronym || exchange.operating_mic} - {exchange.country}
              </option>
            {/each}
          </select>
        </div>

        <div class="flex items-end">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={newOnHand}
              class="rounded"
            />
            <span class="text-sm font-medium">On Hand</span>
          </label>
        </div>

        <div class="flex items-end">
          <button
            class="w-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
            on:click={handleAddTicker}
            disabled={!newSymbol.trim() || loading}
          >
            Add Ticker
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Loading State -->
  {#if loading}
    <div class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-sm text-muted-foreground">Loading tickers...</p>
      </div>
    </div>
  
  <!-- Empty State -->
  {:else if filteredTickers.length === 0}
    <div class="text-center py-20">
      <svg class="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-lg font-semibold mb-2">
        {searchQuery ? "No tickers match your search" : "No tickers in watchlist"}
      </h3>
      <p class="text-muted-foreground mb-6">
        {searchQuery ? "Try a different search term" : "Add your first ticker to get started"}
      </p>
      {#if !searchQuery && !showAddForm}
        <button
          class="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
          on:click={() => (showAddForm = true)}
        >
          Add Your First Ticker
        </button>
      {/if}
    </div>
  
  <!-- Ticker List -->
  {:else}
    <div class="space-y-3">
      {#each filteredTickers as ticker (ticker.symbol)}
        <div
          class="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div class="flex items-center gap-6">
            <!-- Symbol -->
            <div class="min-w-[100px]">
              <div class="font-mono font-bold text-xl">
                {ticker.symbol}
              </div>
            </div>

            <!-- Status Badge -->
            <div>
              {#if ticker.on_hand}
                <span class="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  On Hand
                </span>
              {:else}
                <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  Watching
                </span>
              {/if}
            </div>

            <!-- Created Date -->
            {#if ticker.created_at}
              <div class="text-sm text-muted-foreground">
                Added {new Date(ticker.created_at).toLocaleDateString()}
              </div>
            {/if}
          </div>

          <!-- Remove Button -->
          <button
            class="px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors font-medium"
            on:click={() => handleRemoveTicker(ticker.symbol)}
          >
            Remove
          </button>
        </div>
      {/each}
    </div>

    <!-- Results Summary -->
    <div class="mt-6 text-sm text-muted-foreground text-center">
      Showing {filteredTickers.length} of {count} ticker{count !== 1 ? "s" : ""}
    </div>
  {/if}
</div>
