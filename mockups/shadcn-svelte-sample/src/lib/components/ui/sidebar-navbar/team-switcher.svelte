<script lang="ts">
  import { dropdownMenuContentClass, dropdownMenuItemVariants } from "$lib/components/ui/dropdown-menu/index.js";
  import { cn } from "$lib/utils";

  export let collapsed = false;
  export let selectedTeam = "Coolify";
  export let teams: string[] = ["Coolify", "Personal", "Acme Cloud"];

  let teamOpen = false;

  $: teamInitial = selectedTeam.slice(0, 1).toUpperCase();

  function selectTeam(team: string) {
    selectedTeam = team;
    teamOpen = false;
  }
</script>

<div class={cn("px-2 pb-7", collapsed && "flex justify-center px-0 pb-4")}>
  <div class={cn("relative", collapsed ? "mx-auto w-8" : "w-full")}>
    {#if collapsed}
      <button
        type="button"
        title={`Team: ${selectedTeam}`}
        class="flex size-8 cursor-pointer items-center justify-center rounded-sm bg-neutral-100 p-0 text-sm font-semibold text-coollabs transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-coollabs dark:bg-coolgray-200 dark:text-warning dark:hover:bg-coolgray-300 dark:focus-visible:ring-warning"
        aria-label={`Switch team. Current team: ${selectedTeam}`}
        aria-haspopup="menu"
        aria-expanded={teamOpen}
        onclick={() => (teamOpen = !teamOpen)}
      >{teamInitial}</button>
    {:else}
      <button
        type="button"
        class="flex h-8 w-full items-center justify-between gap-2 rounded-sm border border-neutral-300 bg-white px-2 text-left text-sm text-black outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white dark:hover:bg-coolgray-200 dark:focus-visible:ring-warning"
        aria-label={`Switch team. Current team: ${selectedTeam}`}
        aria-haspopup="menu"
        aria-expanded={teamOpen}
        onclick={() => (teamOpen = !teamOpen)}
      >
        <span class="min-w-0 truncate">{selectedTeam}</span>
        <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15" /><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9L12 5.25 15.75 9" /></svg>
      </button>
    {/if}

    {#if teamOpen}
      <div role="menu" tabindex="-1" class={cn(dropdownMenuContentClass, collapsed ? "left-full top-0 ml-2 mt-0 max-h-72 min-w-48 overflow-y-auto" : "left-0 right-auto w-full min-w-full")}>
        <div class={dropdownMenuItemVariants({ variant: "label" })}>Switch team</div>
        {#each teams as team}
          <button type="button" role="menuitem" class={cn(dropdownMenuItemVariants(), team === selectedTeam && "font-semibold text-coollabs dark:text-warning")} onclick={() => selectTeam(team)}>{team}</button>
        {/each}
      </div>
    {/if}
  </div>
</div>
