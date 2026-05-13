<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  export let title = "Popover";
  let open = false;
</script>
<div class="relative inline-block">
  <Button onclick={() => (open = !open)} aria-expanded={open}>{title}</Button>
  {#if open}
    <div class="absolute left-0 top-full z-20 mt-2 w-72 rounded-sm border border-neutral-200 bg-white p-3 text-sm shadow-lg dark:border-coolgray-300 dark:bg-coolgray-100">
      <slot />
    </div>
  {/if}
</div>
