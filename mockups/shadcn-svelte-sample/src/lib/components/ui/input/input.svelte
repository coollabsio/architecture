<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { inputBaseClass, inputShadowClass, inputStickyShadowClass } from "./index.js";

  type $$Props = HTMLInputAttributes & {
    dirty?: boolean;
    sticky?: boolean;
  };

  export let dirty: boolean = false;
  export let sticky: boolean = false;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<input
  data-dirty={dirty ? "true" : undefined}
  data-sticky={sticky ? "true" : undefined}
  class={cn(inputBaseClass, sticky ? inputStickyShadowClass : inputShadowClass, className)}
  {...$$restProps}
/>
