<script lang="ts">
  import { cn } from "$lib/utils";
  export let content = "Tooltip";
  export let side: "top" | "bottom" = "top";
</script>
<span class="group relative inline-flex">
  <slot />
  <span class={cn("pointer-events-none absolute left-1/2 z-30 max-w-xs -translate-x-1/2 whitespace-nowrap rounded-sm border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-neutral-300", side === "top" ? "bottom-full mb-2" : "top-full mt-2")}>{content}</span>
</span>
