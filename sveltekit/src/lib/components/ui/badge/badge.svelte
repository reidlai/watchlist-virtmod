<script lang="ts">
	import { cn } from "../../../utils";
	import { type BadgeProps, badgeVariants } from "./variants.js";

	type $$Props = BadgeProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let variant: $$Props["variant"] = "default";
</script>

<div class={cn(badgeVariants({ variant }), className)} {...$$restProps}>
	<slot />
</div>
