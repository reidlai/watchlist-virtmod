<script lang="ts">
    import WatchlistTickerTableWidget from "$lib/widgets/WatchlistTickerTableWidget.svelte";
    import { watchlistState } from "$lib/runes/WatchlistState.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    import { toast } from "svelte-sonner";

    // Trigger data fetch on mount (or derived from layout in real app)
    $effect(() => {
        watchlistState.getWatchlist();
    });

    // Reactive error handling
    $effect(() => {
        if (watchlistState.error) {
            toast.error(watchlistState.error, {
                duration: 5000,
                // Using role="alert" implicitly via toast.error, but can enforce behavior if library supports
                // Additional props like `action` could be added here for the "Close" button if desired
                cancel: {
                    label: "Close",
                    onClick: () => {},
                },
            });
        }
    });
</script>

<div class="container mx-auto py-8 space-y-8">
    <section>
        <h1 class="text-3xl font-bold tracking-tight mb-4">Watchlist</h1>

        <!-- Widget Consumption -->
        <WatchlistTickerTableWidget
            tickers={watchlistState.tickers}
            loading={watchlistState.loading}
            error={watchlistState.error}
        />
    </section>
</div>

<Toaster />
