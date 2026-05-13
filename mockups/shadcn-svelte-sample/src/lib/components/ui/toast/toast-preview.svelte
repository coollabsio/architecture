<script lang="ts">
  import { cn } from "$lib/utils";
  export let variant: "default" | "success" | "warning" | "error" = "default";
  export let title: string;
  export let description: string;
  const icon = { default: "i", success: "✓", warning: "!", error: "×" };
  const color = { default: "text-coollabs dark:text-warning", success: "text-green-600", warning: "text-yellow-600 dark:text-warning", error: "text-error" };
</script>
<div class="grid max-w-sm grid-cols-[1rem_1fr] gap-2 rounded-sm border border-neutral-200 bg-white p-3 text-sm text-black shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white">
  <span class={cn("mt-0.5 size-4 text-center font-bold", color[variant])} aria-hidden="true">{icon[variant]}</span>
  <div class="min-w-0"><div class="font-bold">{title}</div><div class="text-neutral-600 dark:text-neutral-400">{description}</div></div>
</div>
