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

<div data-slot="team-switcher" class={cn("px-2 pb-7", collapsed && "flex justify-center px-0 pb-4")}>
  <div class={cn("relative", collapsed ? "mx-auto w-8" : "w-full")}>
    {#if collapsed}
      <button
        type="button"
        title={`Team: ${selectedTeam}`}
        class="flex size-8 cursor-pointer items-center justify-center rounded-sm bg-primary p-0 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Switch team. Current team: ${selectedTeam}`}
        aria-haspopup="menu"
        aria-expanded={teamOpen}
        onclick={() => (teamOpen = !teamOpen)}
      >{teamInitial}</button>
    {:else}
      <button
        type="button"
        class="flex h-8 w-full items-center justify-between gap-2 rounded-sm border border-border bg-card px-2 text-left text-sm text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
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
          <button type="button" role="menuitem" class={cn(dropdownMenuItemVariants(), team === selectedTeam && "font-semibold text-primary")} onclick={() => selectTeam(team)}>{team}</button>
        {/each}
      </div>
    {/if}
  </div>
</div>
