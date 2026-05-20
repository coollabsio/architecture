<script lang="ts">
  import type { TabItem } from "./index.js";
  import { cn } from "$lib/utils";

  export let items: TabItem[] = [];
  export let value = items[0]?.value ?? "";
  let className: string | undefined = undefined;
  export { className as class };
</script>

<div data-slot="tabs" class={cn("w-full", className)}>
  <div class="inline-flex gap-1 rounded-sm border border-border bg-card p-1" role="tablist">
    {#each items as item}
      <button
        type="button"
        role="tab"
        aria-selected={value === item.value}
        data-state={value === item.value ? "active" : "inactive"}
        class="inline-flex h-8 cursor-pointer items-center justify-center rounded-sm px-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-muted data-[state=active]:text-foreground"
        onclick={() => (value = item.value)}
      >
        {item.label}
      </button>
    {/each}
  </div>
  <div class="mt-3" role="tabpanel">
    <slot {value} />
  </div>
</div>
