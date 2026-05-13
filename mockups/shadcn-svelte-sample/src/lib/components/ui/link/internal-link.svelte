<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAnchorAttributes;
  export let href: string;
  export let current = false;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<a {href} aria-current={current ? "page" : undefined} class={cn("inline-flex items-center gap-1 rounded-sm text-sm font-medium text-coollabs hover:underline focus-visible:ring-2 focus-visible:ring-coollabs dark:text-warning dark:focus-visible:ring-warning", current && "text-black no-underline dark:text-white", className)} {...$$restProps}><slot /></a>
