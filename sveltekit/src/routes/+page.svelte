<script lang="ts">
    import WatchlistTickerTableWidget from "../lib/widgets/WatchlistTickerTableWidget.svelte";
    import { Toaster } from "../lib/components/ui/sonner";
    import { WatchlistState } from "../lib/states/WatchlistState.svelte";

    let watchlistState = WatchlistState.getInstance();
</script>

<div class="container mx-auto py-8 space-y-8">
    <section>
        <h1 class="text-3xl font-bold tracking-tight mb-4">Watchlist</h1>

        <!-- Widget Consumption -->
        <WatchlistTickerTableWidget data={watchlistState} />
    </section>
</div>

<Toaster />
