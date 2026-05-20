<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Kbd } from "$lib/components/ui/kbd/index.js";
  export let open = false;
  let query = "";
  const items = ["Open Production API", "Create new resource", "Go to Servers", "View deployment logs", "Team settings"];
  $: filtered = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  function close() { open = false; query = ""; }
</script>
{#if open}
  <div data-slot="command-palette" class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24">
    <button class="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm" aria-label="Close command palette" onclick={close}></button>
    <section class="relative z-10 w-full max-w-xl rounded-sm border border-border bg-popover p-3 text-popover-foreground shadow-xl" aria-label="Command palette">
      <div class="flex items-center gap-2"><Input bind:value={query} placeholder="Search commands, resources, settings..." autofocus /><Kbd>Esc</Kbd></div>
      <div class="mt-3 max-h-80 overflow-y-auto border-t border-border pt-2">
        {#each filtered as item}
          <button class="flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground" onclick={close}><span>{item}</span><span class="text-xs text-muted-foreground">↵</span></button>
        {:else}
          <div class="px-2 py-6 text-center text-sm text-muted-foreground">No results found.</div>
        {/each}
      </div>
      <div class="mt-2 flex justify-end"><Button size="sm" onclick={close}>Close</Button></div>
    </section>
  </div>
{/if}
