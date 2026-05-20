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
  <div data-slot="sheet" class="fixed inset-0 z-50">
    <button class="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm" aria-label="Close slide-over" onclick={close} transition:fade={{ duration: 120 }}></button>
    <aside class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card p-4 text-card-foreground shadow-xl" aria-label={title} transition:fly={{ x: 18, duration: 160, easing: cubicOut }}>
      <div class="flex items-start justify-between gap-4 border-b border-border pb-3"><div><h2 class="text-xl font-bold text-foreground">{title}</h2>{#if description}<p class="mt-1 text-sm text-muted-foreground">{description}</p>{/if}</div><Button variant="ghost" size="icon" onclick={close} aria-label="Close slide-over">×</Button></div>
      <div class="flex-1 overflow-y-auto py-4 text-sm text-foreground"><slot /></div>
      <div class="border-t border-border pt-3"><slot name="footer"><Button onclick={close}>Close</Button></slot></div>
    </aside>
  </div>
{/if}
