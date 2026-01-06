<script lang="ts">
  import {
    tickers,
    tickerCount,
    watchlistLoading,
    watchlistError,
    watchlistActions,
    exchanges,
  } from "../stores";
  import { Button } from "@ui/button";
  import { Input } from "@ui/input";
  import * as Table from "@ui/table";
  import AddTickerForm from "../components/AddTickerForm.svelte";

  let searchQuery = "";
  let showAddForm = false;

  // Reactive statements
  $: tickerList = $tickers;
  $: count = $tickerCount;
  $: loading = $watchlistLoading;
  $: error = $watchlistError;
  $: exchangeList = $exchanges;


  // Filtered tickers based on search
  $: filteredTickers = searchQuery
    ? tickerList.filter((t) =>
        t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tickerList;



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
      Manage your stock tickers ({count} total)
    </p>
  </div>

  <!-- Action Bar -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex gap-2">
      <Button
        variant="secondary"
        on:click={handleRefresh}
        disabled={loading}
      >
        {loading ? "Refreshing..." : "Refresh"}
      </Button>
      <Button
        on:click={() => (showAddForm = !showAddForm)}
      >
        {showAddForm ? "Cancel" : "Add Ticker"}
      </Button>
    </div>

    <!-- Search -->
    {#if count > 0}
      <div class="w-64">
        <Input
          type="text"
          bind:value={searchQuery}
          placeholder="Search tickers..."
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
      <Button
        variant="link"
        class="text-xs text-destructive hover:no-underline h-auto p-0"
        on:click={clearError}
      >
        Dismiss
      </Button>
    </div>
  {/if}

  <!-- Add Ticker Form -->
  {#if showAddForm}
    <div class="mb-8">
      <AddTickerForm
        exchanges={exchangeList}
        on:cancel={() => (showAddForm = false)}
        on:success={() => (showAddForm = false)}
      />
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
        <Button
          on:click={() => (showAddForm = true)}
        >
          Add Your First Ticker
        </Button>
      {/if}
    </div>
  
  <!-- Ticker List -->
  {:else}
    <div class="rounded-md border">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">Symbol</Table.Head>
            <Table.Head>Date Added</Table.Head>
            <Table.Head class="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each filteredTickers as ticker (ticker.symbol)}
            <Table.Row>
              <Table.Cell class="font-medium font-mono">{ticker.symbol}</Table.Cell>
              <Table.Cell>
                {#if ticker.created_at}
                  {new Date(ticker.created_at).toLocaleDateString()}
                {:else}
                  -
                {/if}
              </Table.Cell>
              <Table.Cell class="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  on:click={() => handleRemoveTicker(ticker.symbol)}
                >
                  Remove
                </Button>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>

    <!-- Results Summary -->
    <div class="mt-4 text-sm text-muted-foreground text-center">
      Showing {filteredTickers.length} of {count} ticker{count !== 1 ? "s" : ""}
    </div>
  {/if}
</div>
