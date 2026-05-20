<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAnchorAttributes;
  export let href: string;
  export let current = false;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<a data-slot="internal-link" {href} aria-current={current ? "page" : undefined} class={cn("inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring", current && "text-foreground no-underline", className)} {...$$restProps}><slot /></a>
