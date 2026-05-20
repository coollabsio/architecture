<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  export let title = "Popover";
  let open = false;
</script>
<div class="relative inline-block" data-slot="popover">
  <Button onclick={() => (open = !open)} aria-expanded={open}>{title}</Button>
  {#if open}
    <div class="absolute left-0 top-full z-20 mt-2 w-72 rounded-sm border border-border bg-popover p-3 text-sm text-popover-foreground shadow-lg">
      <slot />
    </div>
  {/if}
</div>
