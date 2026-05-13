<script lang="ts">
  import { cn } from "$lib/utils";
  export let variant: "success" | "warning" | "error" | "muted" = "success";
  export let label: string;
  export let detail: string | undefined = undefined;
  const dot = { success: "bg-green-600", warning: "bg-warning", error: "bg-error", muted: "bg-neutral-400" };
</script>
<span class="inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-black dark:text-white">
  <span class={cn("size-2 shrink-0 rounded-full", dot[variant])} aria-hidden="true"></span>
  <span>{label}</span>
  {#if detail}<span class="text-xs font-normal text-neutral-500 dark:text-neutral-400">{detail}</span>{/if}
</span>
