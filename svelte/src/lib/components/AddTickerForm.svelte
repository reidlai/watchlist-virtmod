<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    watchlistActions,
  } from "../stores";
  import type { Exchange, MarketTicker, TickerDetails } from "@modules/watchlist-ts";
  import { Button } from "@ui/button";
  import { Input } from "@ui/input";
  import * as Card from "@ui/card";
  import { Badge } from "@ui/badge";

  export let exchanges: Exchange[] = [];

  const dispatch = createEventDispatcher();

  // Wizard State
  const Step = {
    SELECT_EXCHANGE: 1,
    SEARCH_TICKER: 2,
    CONFIRM_DETAILS: 3,
  };

  let currentStep = Step.SELECT_EXCHANGE;
  let loading = false;
  let error = "";

  // Step 1: Exchange
  let selectedExchange: Exchange | null = null;

  // Step 2: Search
  let searchQuery = "";
  let searchResults: MarketTicker[] = [];
  let isSearching = false;

  // Step 3: Details
  let selectedTicker: MarketTicker | null = null;
  let tickerDetails: TickerDetails | null = null;

  function nextStep() {
    if (currentStep === Step.SELECT_EXCHANGE && selectedExchange) {
      currentStep = Step.SEARCH_TICKER;
    } else if (currentStep === Step.SEARCH_TICKER && selectedTicker) {
      fetchDetails();
    }
  }

  function prevStep() {
    if (currentStep > Step.SELECT_EXCHANGE) {
      currentStep--;
      error = "";
    }
  }

  function handleCancel() {
    dispatch("cancel");
  }

  // --- Step 1 Handlers ---
  function selectExchange(exchange: Exchange) {
    selectedExchange = exchange;
    nextStep();
  }

  // --- Step 2 Handlers ---
  let searchDebounceTimer: ReturnType<typeof setTimeout>;
  function handleSearchInput() {
    clearTimeout(searchDebounceTimer);
    if (!searchQuery.trim() || !selectedExchange) return;

    searchDebounceTimer = setTimeout(() => {
      isSearching = true;
      error = "";
      watchlistActions
        .searchMarketTickers(selectedExchange!.operating_mic, searchQuery)
        .subscribe({
          next: (results) => {
            searchResults = results;
            isSearching = false;
          },
          error: (err) => {
            console.error(err);
            error = "Failed to search tickers";
            isSearching = false;
          },
        });
    }, 500);
  }

  function selectTicker(ticker: MarketTicker) {
    selectedTicker = ticker;
    nextStep();
  }

  // --- Step 3 Handlers ---
  function fetchDetails() {
    if (!selectedTicker) return;

    loading = true;
    error = "";
    currentStep = Step.CONFIRM_DETAILS;

    watchlistActions.getTickerDetails(selectedTicker.symbol).subscribe({
      next: (details) => {
        tickerDetails = details;
        loading = false;
      },
      error: (err) => {
        console.error(err);
        error = "Failed to fetch ticker details";
        loading = false;
      },
    });
  }

  function handleConfirm() {
    if (!selectedTicker) return;

    loading = true;
    watchlistActions.addTicker(selectedTicker.symbol, false).subscribe({
      next: () => {
        dispatch("success");
        loading = false;
      },
      error: (err) => {
        console.error(err);
        error = "Failed to add ticker to watchlist";
        loading = false;
      },
    });
  }
</script>

<Card.Root class="w-full max-w-2xl mx-auto">
  <Card.Header>
    <Card.Title>Add New Ticker</Card.Title>
    <Card.Description>
      Step {currentStep} of 3: 
      {#if currentStep === Step.SELECT_EXCHANGE}
        Select Exchange
      {:else if currentStep === Step.SEARCH_TICKER}
        Search Ticker ({selectedExchange?.acronym || selectedExchange?.operating_mic})
      {:else}
        Confirm Details
      {/if}
    </Card.Description>
  </Card.Header>

  <Card.Content class="min-h-[300px]">
    {#if error}
      <div class="mb-4 p-3 bg-destructive/10 border border-destructive rounded text-sm text-destructive">
        {error}
      </div>
    {/if}

    <!-- STEP 1: SELECT EXCHANGE -->
    {#if currentStep === Step.SELECT_EXCHANGE}
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        {#each exchanges as exchange}
          <button
            class="p-3 border rounded-lg text-left hover:bg-muted/50 transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
            on:click={() => selectExchange(exchange)}
          >
            <div class="font-bold text-sm">{exchange.acronym || exchange.operating_mic}</div>
            <div class="text-xs text-muted-foreground line-clamp-1">{exchange.exchange_name}</div>
          </button>
        {/each}
      </div>

    <!-- STEP 2: SEARCH TICKER -->
    {:else if currentStep === Step.SEARCH_TICKER}
      <div class="space-y-4">
        <Input
          placeholder="Search by symbol or name..."
          bind:value={searchQuery}
          on:input={handleSearchInput}
          class="w-full"
          autofocus
        />

        {#if isSearching}
          <div class="flex justify-center p-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        {:else if searchResults.length > 0}
          <div class="border rounded-md divide-y max-h-[300px] overflow-y-auto">
            {#each searchResults as ticker}
              <button
                class="w-full text-left p-3 hover:bg-muted/50 transition-colors flex justify-between items-center"
                on:click={() => selectTicker(ticker)}
              >
                <div>
                  <div class="font-bold font-mono">{ticker.symbol}</div>
                  <div class="text-sm text-muted-foreground">{ticker.name}</div>
                </div>
                <Badge variant="outline">Select</Badge>
              </button>
            {/each}
          </div>
        {:else if searchQuery}
          <div class="text-center p-8 text-muted-foreground">
            No tickers found matching "{searchQuery}"
          </div>
        {/if}
      </div>

    <!-- STEP 3: CONFIRM DETAILS -->
    {:else if currentStep === Step.CONFIRM_DETAILS}
      {#if loading && !tickerDetails}
        <div class="flex flex-col items-center justify-center p-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p class="text-muted-foreground">Loading ticker details...</p>
        </div>
      {:else if tickerDetails}
        <div class="space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-2xl font-bold font-mono">{tickerDetails.symbol}</h3>
              <p class="text-lg text-muted-foreground">{tickerDetails.name}</p>
              <Badge variant="secondary" class="mt-2">{tickerDetails.exchange_mic}</Badge>
            </div>
          </div>

          {#if tickerDetails.latest_ohlcv}
            <div class="border rounded-lg p-4 bg-muted/20">
              <h4 class="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Latest OHLCV</h4>
              <div class="grid grid-cols-5 gap-4 text-center">
                <div>
                  <div class="text-xs text-muted-foreground">Open</div>
                  <div class="font-mono">{tickerDetails.latest_ohlcv.open.toFixed(2)}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">High</div>
                  <div class="font-mono">{tickerDetails.latest_ohlcv.high.toFixed(2)}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">Low</div>
                  <div class="font-mono">{tickerDetails.latest_ohlcv.low.toFixed(2)}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">Close</div>
                  <div class="font-mono">{tickerDetails.latest_ohlcv.close.toFixed(2)}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground">Volume</div>
                  <div class="font-mono">{tickerDetails.latest_ohlcv.volume.toLocaleString()}</div>
                </div>
              </div>
              <div class="mt-3 text-right text-xs text-muted-foreground">
                As of {new Date(tickerDetails.latest_ohlcv.timestamp).toLocaleString()}
              </div>
            </div>
          {:else}
            <div class="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
              No market data available
            </div>
          {/if}
        </div>
      {/if}
    {/if}
  </Card.Content>

  <Card.Footer class="flex justify-between">
    <Button variant="ghost" on:click={currentStep === 1 ? handleCancel : prevStep}>
      {currentStep === 1 ? "Cancel" : "Back"}
    </Button>
    
    {#if currentStep === Step.CONFIRM_DETAILS}
      <Button on:click={handleConfirm} disabled={loading}>
        {loading ? "Adding..." : "Confirm & Add"}
      </Button>
    {/if}
  </Card.Footer>
</Card.Root>
