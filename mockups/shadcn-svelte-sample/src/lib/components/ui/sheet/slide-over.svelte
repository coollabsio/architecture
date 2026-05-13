<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { Button } from "$lib/components/ui/button/index.js";
  export let open = false;
  export let title = "Slide-over";
  export let description = "";
  function close() { open = false; }
</script>
{#if open}
  <div class="fixed inset-0 z-50">
    <button class="absolute inset-0 cursor-default bg-black/60" aria-label="Close slide-over" onclick={close} transition:fade={{ duration: 120 }}></button>
    <aside class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-white p-4 shadow-xl dark:border-coolgray-300 dark:bg-coolgray-100" aria-label={title} transition:fly={{ x: 18, duration: 160, easing: cubicOut }}>
      <div class="flex items-start justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200"><div><h2 class="text-xl font-bold text-black dark:text-white">{title}</h2>{#if description}<p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>{/if}</div><Button variant="ghost" size="icon" onclick={close} aria-label="Close slide-over">×</Button></div>
      <div class="flex-1 overflow-y-auto py-4 text-sm text-neutral-700 dark:text-neutral-300"><slot /></div>
      <div class="border-t border-neutral-200 pt-3 dark:border-coolgray-200"><slot name="footer"><Button onclick={close}>Close</Button></slot></div>
    </aside>
  </div>
{/if}
