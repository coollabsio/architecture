<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils";

  type $$Props = HTMLButtonAttributes;

  export let type: $$Props["type"] = "submit";
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<Button
  {type}
  variant="highlighted"
  class={cn("h-12 w-full justify-center py-3 text-base font-bold", className)}
  {...$$restProps}
>
  <slot />
</Button>
