<script lang="ts">
  import { tick } from "svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { cn } from "$lib/utils";
  import type { SearchableDropdownOption } from "./index.js";

  export let options: SearchableDropdownOption[] = [];
  export let value = "";
  export let placeholder = "Select option";
  export let searchPlaceholder = "Search...";
  export let emptyText = "No results found.";
  export let onselect: (option: SearchableDropdownOption) => void = () => {};
  let className = "";
  export { className as class };

  let open = false;
  let query = "";
  let root: HTMLDivElement;
  let searchInput: { focus: () => void };

  $: selected = options.find((option) => option.value === value);
  $: filtered = options.filter((option) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${option.label} ${option.description ?? ""}`.toLowerCase().includes(q);
  });

  async function openDropdown() {
    open = !open;
    if (open) {
      await tick();
      searchInput?.focus();
    }
  }

  function select(option: SearchableDropdownOption) {
    value = option.value;
    query = "";
    open = false;
    onselect(option);
  }

  function closeFromOutside(event: MouseEvent) {
    if (root && !root.contains(event.target as Node)) open = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") open = false;
  }
</script>

<svelte:window onclick={closeFromOutside} onkeydown={handleKeydown} />

<div bind:this={root} class={cn("relative w-full min-w-52 max-w-sm", className)}>
  <Button class="w-full justify-between" aria-haspopup="listbox" aria-expanded={open} onclick={openDropdown}>
    <span class={cn("truncate", !selected && "text-neutral-500 dark:text-neutral-400")}>{selected?.label ?? placeholder}</span>
    <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15" /><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9L12 5.25 15.75 9" /></svg>
  </Button>

  {#if open}
    <div class="absolute left-0 top-full z-50 mt-1 w-full rounded-sm border border-neutral-300 bg-white p-1 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100">
      <div class="p-1"><Input class="dark:bg-base" bind:this={searchInput} bind:value={query} placeholder={searchPlaceholder} /></div>
      <div class="mt-1 max-h-56 overflow-y-auto overscroll-contain" role="listbox">
        {#each filtered as option}
          <button
            type="button"
            role="option"
            aria-selected={option.value === value}
            class={cn("group flex w-full items-start gap-2 rounded-sm px-2 py-2 text-left text-sm text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-coollabs dark:hover:text-white", option.value === value && "bg-neutral-100 font-semibold dark:bg-coolgray-200 dark:text-warning")}
            onclick={() => select(option)}
          >
            <span class="w-4 shrink-0 text-center">{option.value === value ? "✓" : ""}</span>
            <span class="min-w-0 flex-1">
              <span class="block truncate">{option.label}</span>
              {#if option.description}<span class="block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400 dark:group-hover:text-white">{option.description}</span>{/if}
            </span>
          </button>
        {:else}
          <div class="px-2 py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">{emptyText}</div>
        {/each}
      </div>
    </div>
  {/if}
</div>
