<script lang="ts">
  export let text = "";
  export let content = "";
  let open = false;
</script>
<span class="relative inline-flex">
  <button
    type="button"
    class="inline-flex size-4 items-center justify-center rounded-full bg-coollabs text-[10px] font-bold leading-none text-white outline-none focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:bg-warning dark:text-base dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base"
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
