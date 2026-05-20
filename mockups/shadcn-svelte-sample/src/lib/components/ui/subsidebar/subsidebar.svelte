<script lang="ts">
  import type { SubSidebarItem } from "./index.js";
  import { cn } from "$lib/utils";

  export let items: SubSidebarItem[] = [];
  export let ariaLabel = "Section navigation";
  export let orientation: "vertical" | "horizontal" = "vertical";
</script>

<nav
  data-slot="subsidebar"
  aria-label={ariaLabel}
  class={cn(
    orientation === "vertical"
      ? "flex w-full flex-col items-start gap-2 sm:w-48 sm:min-w-48 sm:flex-shrink-0"
      : "scrollbar flex min-h-10 w-full flex-nowrap items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap pb-1"
  )}
>
  {#each items as item}
    <a
      href={item.href}
      aria-current={item.active ? "page" : undefined}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      class={cn(
        "flex min-h-7 min-w-0 items-center gap-2 truncate rounded-sm px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
        orientation === "vertical" ? "w-full" : "shrink-0",
        item.active && "bg-muted text-primary"
      )}
    >
      <span class="min-w-0 flex-1 truncate">{item.label}</span>
      {#if item.external}
        <svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
      {/if}
    </a>
  {/each}
</nav>
