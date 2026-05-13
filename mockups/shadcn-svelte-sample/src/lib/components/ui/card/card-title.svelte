<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLHeadingElement>;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<h2 class={cn("text-base font-bold text-black dark:text-white", className)} {...$$restProps}><slot /></h2>
