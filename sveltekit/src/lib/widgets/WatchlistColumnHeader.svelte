<script lang="ts">
    import { ArrowUpDown } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button";
    import type { Column } from "@tanstack/table-core";

    interface Props {
        column: Column<any, any>;
        title: string;
        className?: string; // Optional className prop
    }

    let { column, title, className }: Props = $props();
</script>

<Button
    variant="ghost"
    onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    class={className}
>
    {title}
    <ArrowUpDown class="ml-2 h-4 w-4" />
</Button>
