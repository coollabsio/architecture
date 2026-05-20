<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAnchorAttributes & { title?: string; description?: string };
  export let href: string;
  export let title: string;
  export let description: string | undefined = undefined;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<a data-slot="coolbox" {href} class={cn("group relative flex min-h-[4rem] cursor-pointer flex-col rounded-sm border border-border bg-card p-2 text-foreground transition-all duration-150 hover:ring-2 hover:ring-ring hover:no-underline", className)} {...$$restProps}>
  <div class="font-bold text-foreground"><slot name="title">{title}</slot></div>
  {#if description}<div class="text-xs font-bold text-muted-foreground group-hover:text-foreground">{description}</div>{/if}
  <slot />
</a>
