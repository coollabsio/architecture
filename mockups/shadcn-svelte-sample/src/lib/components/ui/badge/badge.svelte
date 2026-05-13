<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { badgeVariants, type BadgeVariants } from "./index.js";

  type $$Props = HTMLAttributes<HTMLSpanElement> & BadgeVariants;
  export let variant: $$Props["variant"] = "default";
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<span class={cn(badgeVariants({ variant }), className)} {...$$restProps}>
  <slot />
</span>
