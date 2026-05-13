<script lang="ts">
  import type { BreadcrumbItem } from "./index.js";
  export let items: BreadcrumbItem[] = [];
</script>
<nav aria-label="Breadcrumb"><ol class="flex flex-wrap items-center gap-1.5 text-sm font-medium"><slot>{#each items as item, i}<li class="inline-flex items-center gap-1.5">{#if i > 0}<span class="text-neutral-400">/</span>{/if}{#if item.href && i < items.length - 1}<a class="rounded-sm text-neutral-600 hover:text-coollabs focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:text-warning dark:focus-visible:ring-warning" href={item.href}>{item.label}</a>{:else}<span class="text-black dark:text-white" aria-current="page">{item.label}</span>{/if}</li>{/each}</slot></ol></nav>
