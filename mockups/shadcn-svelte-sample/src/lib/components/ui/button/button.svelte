<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { buttonVariants, type ButtonVariants } from "./index.js";

  type $$Props = HTMLButtonAttributes & ButtonVariants;

  export let variant: $$Props["variant"] = "default";
  export let size: $$Props["size"] = "default";
  export let type: $$Props["type"] = "button";
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<button
  {type}
  data-slot="button"
  class={cn(buttonVariants({ variant, size }), className)}
  {...$$restProps}
>
  <slot />
</button>
