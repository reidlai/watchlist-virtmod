<script lang="ts">
	import { cn } from "../../../utils";
	import { type ButtonProps, buttonVariants } from "./variants.js";

	type $$Props = ButtonProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
</script>

<button
	class={cn(buttonVariants({ variant, size, className }))}
	on:click
	{...$$restProps}
>
	<slot />
</button>
