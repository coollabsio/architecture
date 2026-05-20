<script lang="ts">
  import { cn } from "$lib/utils";
  export let variant: "info" | "warning" | "success" = "info";
</script>
<div data-slot="banner" class={cn("rounded-sm border px-3 py-2 text-sm", variant === "warning" ? "border-yellow-300 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200" : variant === "success" ? "border-green-300 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200" : "border-border bg-muted text-foreground")}><slot /></div>
