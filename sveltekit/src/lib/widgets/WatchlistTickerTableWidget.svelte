<script lang="ts">
    import {
        type ColumnDef,
        getCoreRowModel,
        getSortedRowModel,
        type SortingState,
    } from "@tanstack/table-core";
    import {
        createSvelteTable,
        FlexRender,
        renderComponent,
    } from "../components/ui/data-table";
    import * as Table from "../components/ui/table";
    import { watchlistState } from "../runes/WatchlistState.svelte";
    import type {
        IWatchlistTickerTableWidgetProps,
        ITicker,
    } from "./WatchlistTickerTableWidget.types";
    import WatchlistColumnHeader from "./WatchlistColumnHeader.svelte";
    import type { Column, Row, Updater } from "@tanstack/table-core";

    let {
        tickers: tickersProp,
        loading: loadingProp,
        error: errorProp,
        usingMockData: usingMockDataProp,
    }: IWatchlistTickerTableWidgetProps = $props();

    let tickers = $derived(tickersProp ?? []);
    let loading = $derived(loadingProp ?? false);
    let error = $derived(errorProp ?? null);
    let usingMockData = $derived(usingMockDataProp ?? false);

    let sorting = $state<SortingState>([{ id: "symbol", desc: false }]);

    function formatPrice(price?: number) {
        if (typeof price !== "number") return "-";
        return price.toFixed(2);
    }

    function formatTime(ts?: number | string) {
        if (!ts) return "-";
        return new Date(ts)
            .toLocaleString(undefined, {
                timeZoneName: "longOffset",
                hour12: false,
            })
            .replace("GMT", "UTC");
    }

    function formatVolume(vol?: number) {
        if (typeof vol !== "number") return "-";
        if (vol >= 1e9) return (vol / 1e9).toFixed(2) + "B";
        if (vol >= 1e6) return (vol / 1e6).toFixed(2) + "M";
        if (vol >= 1e3) return (vol / 1e3).toFixed(2) + "K";
        return vol.toFixed(2);
    }

    const columns: ColumnDef<ITicker>[] = [
        {
            accessorKey: "symbol",
            header: ({ column }: { column: Column<ITicker, unknown> }) =>
                renderComponent(WatchlistColumnHeader, {
                    column,
                    title: "Symbol",
                }),
            cell: ({ row }: { row: Row<ITicker> }) => {
                return row.getValue("symbol");
            },
        },
        {
            accessorKey: "currency",
            header: ({ column }: { column: Column<ITicker, unknown> }) =>
                renderComponent(WatchlistColumnHeader, {
                    column,
                    title: "Currency",
                }),
            cell: ({ row }: { row: Row<ITicker> }) => {
                return row.getValue("currency") || "-";
            },
        },
        {
            accessorKey: "last",
            header: ({ column }: { column: Column<ITicker, unknown> }) =>
                renderComponent(WatchlistColumnHeader, {
                    column,
                    title: "Last",
                }),
            cell: ({ row }: { row: Row<ITicker> }) => {
                return formatPrice(row.getValue("last"));
            },
        },
        {
            accessorKey: "open",
            header: ({ column }: { column: Column<ITicker, unknown> }) =>
                renderComponent(WatchlistColumnHeader, {
                    column,
                    title: "Open",
                }),
            cell: ({ row }: { row: Row<ITicker> }) => {
                return formatPrice(row.getValue("open"));
            },
        },
        {
            accessorKey: "high",
            header: ({ column }: { column: Column<ITicker, unknown> }) =>
                renderComponent(WatchlistColumnHeader, {
                    column,
                    title: "High",
                }),
            cell: ({ row }: { row: Row<ITicker> }) => {
                return formatPrice(row.getValue("high"));
            },
        },
        {
            accessorKey: "low",
            header: ({ column }: { column: Column<ITicker, unknown> }) =>
                renderComponent(WatchlistColumnHeader, {
                    column,
                    title: "Low",
                }),
            cell: ({ row }: { row: Row<ITicker> }) => {
                return formatPrice(row.getValue("low"));
            },
        },
        {
            accessorKey: "volume",
            header: ({ column }: { column: Column<ITicker, unknown> }) =>
                renderComponent(WatchlistColumnHeader, {
                    column,
                    title: "Volume",
                }),
            cell: ({ row }: { row: Row<ITicker> }) => {
                return formatVolume(row.getValue<number>("volume"));
            },
        },
        {
            accessorKey: "last_updated_at",
            header: ({ column }: { column: Column<ITicker, unknown> }) =>
                renderComponent(WatchlistColumnHeader, {
                    column,
                    title: "Updated",
                    className: "text-right w-full",
                }),
            cell: ({ row }: { row: Row<ITicker> }) => {
                return formatTime(row.getValue("last_updated_at"));
            },
            meta: {
                headerClass: "text-right",
                cellClass: "text-right text-muted-foreground",
            },
        },
    ];

    const table = createSvelteTable({
        get data() {
            return tickers;
        },
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: (updater: Updater<SortingState>) => {
            if (typeof updater === "function") {
                sorting = updater(sorting);
            } else {
                sorting = updater;
            }
        },
        state: {
            get sorting() {
                return sorting;
            },
        },
    });

    function getColumnMeta(column: Column<ITicker, unknown>) {
        return (
            (column.columnDef.meta as {
                headerClass?: string;
                cellClass?: string;
            }) || {}
        );
    }

    $effect(() => {
        watchlistState.setRxServiceConfig({ usingMockData });
    });
</script>

<div class="relative w-full rounded-md border">
    {#if loading}
        <div
            class="flex h-64 items-center justify-center text-muted-foreground space-x-2 p-8"
        >
            <div
                class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"
            ></div>
            <span class="text-sm text-muted-foreground">Loading...</span>
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
        <div class="w-full overflow-auto" style="max-height: 70vh;">
            <Table.Root>
                <Table.Header>
                    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                        <Table.Row>
                            {#each headerGroup.headers as header (header.id)}
                                <Table.Head
                                    class={getColumnMeta(header.column)
                                        .headerClass}
                                >
                                    {#if !header.isPlaceholder}
                                        <FlexRender
                                            content={header.column.columnDef
                                                .header}
                                            context={header.getContext()}
                                        />
                                    {/if}
                                </Table.Head>
                            {/each}
                        </Table.Row>
                    {/each}
                </Table.Header>
                <Table.Body>
                    {#each table.getRowModel().rows as row (row.id)}
                        <Table.Row
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {#each row.getVisibleCells() as cell (cell.id)}
                                <Table.Cell
                                    class={getColumnMeta(cell.column).cellClass}
                                >
                                    <FlexRender
                                        content={cell.column.columnDef.cell}
                                        context={cell.getContext()}
                                    />
                                </Table.Cell>
                            {/each}
                        </Table.Row>
                    {:else}
                        <Table.Row>
                            <Table.Cell
                                colspan={columns.length}
                                class="h-24 text-center"
                            >
                                No results.
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </div>
    {/if}
</div>
