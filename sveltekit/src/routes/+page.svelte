<script lang="ts">
    import WatchlistTickerTableWidget from "../lib/widgets/WatchlistTickerTableWidget.svelte";
    import { Toaster } from "../lib/components/ui/sonner";

    let { data } = $props();
</script>

<div class="container mx-auto py-8 space-y-8">
    <section>
        <h1 class="text-3xl font-bold tracking-tight mb-4">Watchlist</h1>

        <!-- Widget Consumption -->
        <WatchlistTickerTableWidget
            tickers={data.tickers}
            loading={data.loading}
            error={data.error}
            usingMockData={data.usingMockData}
        />
    </section>
</div>

<Toaster />
