<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import type { IWatchlistTickerTableWidgetProps } from "./WatchlistTickerTableWidget.types";

    let {
        tickers = [],
        loading = false,
        error = null,
    }: IWatchlistTickerTableWidgetProps = $props();

    let sortDirection = $state<"asc" | "desc">("asc");

    let sortedTickers = $derived(
        [...tickers].sort((a, b) => {
            const symA = a.symbol?.toLowerCase() || "";
            const symB = b.symbol?.toLowerCase() || "";
            if (symA < symB) return sortDirection === "asc" ? -1 : 1;
            if (symA > symB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        }),
    );

    function toggleSort() {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
    }

    function formatTime(ts?: number | string) {
        if (!ts) return "-";
        return new Date(ts).toLocaleTimeString();
    }
</script>

<div
    class="relative w-full rounded-md border"
    style="max-height: 70vh; overflow-y: auto;"
>
    {#if loading}
        <div
            class="flex h-64 items-center justify-center text-muted-foreground p-8"
        >
            <span class="animate-pulse">Loading watchlist data...</span>
        </div>
    {:else if error}
        <div class="flex h-64 items-center justify-center text-destructive p-8">
            <span class="font-medium">Error: {error}</span>
        </div>
    {:else if tickers.length === 0}
        <div
            class="flex h-64 flex-col items-center justify-center text-center p-8"
        >
            <h3 class="text-lg font-semibold">No tickers tracked</h3>
            <p class="text-sm text-muted-foreground">
                No tickers tracked in your watchlist.
            </p>
        </div>
    {:else}
        <div class="w-full overflow-x-auto">
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <!-- Symbol Header: Sortable, Min Height 44px -->
                        <Table.Head
                            class="h-11 min-h-[44px] cursor-pointer hover:bg-muted/50"
                            onclick={toggleSort}
                        >
                            <button
                                class="flex items-center gap-2 font-bold w-full h-full text-left"
                            >
                                Symbol
                                <span class="text-xs" aria-hidden="true">
                                    {#if sortDirection === "asc"}
                                        ▲
                                    {:else}
                                        ▼
                                    {/if}
                                </span>
                            </button>
                        </Table.Head>
                        <Table.Head>Last</Table.Head>
                        <Table.Head>Open</Table.Head>
                        <Table.Head>High</Table.Head>
                        <Table.Head>Low</Table.Head>
                        <Table.Head>Volume</Table.Head>
                        <Table.Head class="text-right">Updated</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each sortedTickers as ticker (ticker.symbol)}
                        <Table.Row>
                            <Table.Cell class="font-medium"
                                >{ticker.symbol}</Table.Cell
                            >
                            <Table.Cell>{ticker.last}</Table.Cell>
                            <Table.Cell>{ticker.open}</Table.Cell>
                            <Table.Cell>{ticker.high}</Table.Cell>
                            <Table.Cell>{ticker.low}</Table.Cell>
                            <Table.Cell
                                >{ticker.volume?.toLocaleString()}</Table.Cell
                            >
                            <Table.Cell
                                class="text-right text-muted-foreground"
                            >
                                {formatTime(ticker.last_updated_at)}
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </div>
    {/if}
</div>
