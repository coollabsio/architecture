<script lang="ts">
  import type { TabItem } from "./index.js";
  import { cn } from "$lib/utils";

  export let items: TabItem[] = [];
  export let value = items[0]?.value ?? "";
  let className: string | undefined = undefined;
  export { className as class };
</script>

<div class={cn("w-full", className)}>
  <div class="inline-flex gap-1 rounded-sm border border-neutral-200 bg-white p-1 dark:border-coolgray-300 dark:bg-coolgray-100" role="tablist">
    {#each items as item}
      <button
        type="button"
        role="tab"
        aria-selected={value === item.value}
        data-state={value === item.value ? "active" : "inactive"}
        class="inline-flex h-8 cursor-pointer items-center justify-center rounded-sm px-2 text-sm font-medium text-neutral-600 outline-none transition-colors hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm dark:text-neutral-400 dark:hover:bg-coolgray-200 dark:hover:text-white dark:focus-visible:ring-warning dark:data-[state=active]:bg-coolgray-200 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-none"
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
