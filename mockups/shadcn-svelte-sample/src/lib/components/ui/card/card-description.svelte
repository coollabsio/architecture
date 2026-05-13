<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLParagraphElement>;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<p class={cn("text-sm text-neutral-600 dark:text-neutral-400", className)} {...$$restProps}><slot /></p>
