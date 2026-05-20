<script lang="ts">
  import type { BreadcrumbItem } from "./index.js";
  export let items: BreadcrumbItem[] = [];
</script>
<nav data-slot="breadcrumbs" aria-label="Breadcrumb"><ol class="flex flex-wrap items-center gap-1.5 text-sm font-medium"><slot>{#each items as item, i}<li class="inline-flex items-center gap-1.5">{#if i > 0}<span class="text-muted-foreground">/</span>{/if}{#if item.href && i < items.length - 1}<a class="rounded-sm text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring" href={item.href}>{item.label}</a>{:else}<span class="text-foreground" aria-current="page">{item.label}</span>{/if}</li>{/each}</slot></ol></nav>
