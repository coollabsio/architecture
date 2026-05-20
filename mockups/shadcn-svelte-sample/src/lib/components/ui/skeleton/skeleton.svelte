<script lang="ts">
  import { cn } from "$lib/utils";
  let className = "";
  export { className as class };
</script>
<div data-slot="skeleton" class={cn("animate-pulse rounded-sm bg-muted", className)}></div>
