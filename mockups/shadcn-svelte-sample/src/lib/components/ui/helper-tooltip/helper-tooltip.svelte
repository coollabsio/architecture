<script lang="ts">
  export let text = "";
  export let content = "";
  let open = false;
</script>
<span data-slot="helper-tooltip" class="relative inline-flex">
  <button
    type="button"
    class="inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    aria-label="Show help"
    onclick={() => (open = !open)}
    onmouseenter={() => (open = true)}
    onmouseleave={() => (open = false)}
    onfocus={() => (open = true)}
    onblur={() => (open = false)}
  >i</button>
  {#if open}
    <span class="absolute left-1/2 top-6 z-50 min-w-max max-w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 whitespace-normal rounded-sm bg-coolgray-400 px-2 py-1.5 text-xs leading-4 text-white shadow-sm">{text || content}</span>
  {/if}
</span>
