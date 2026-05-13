<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAnchorAttributes;
  export let href: string;
  export let target: $$Props["target"] = "_blank";
  export let rel: $$Props["rel"] = "noreferrer";
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<a {href} {target} {rel} class={cn("inline-flex items-center gap-1 rounded-sm text-sm font-medium text-coollabs hover:underline focus-visible:ring-2 focus-visible:ring-coollabs dark:text-warning dark:focus-visible:ring-warning", className)} {...$$restProps}><slot /><svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg></a>
