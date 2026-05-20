<script lang="ts">
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button/index.js";
  import { dropdownMenuContentClass } from "./index.js";

  export let label = "Actions";
  export let align: "start" | "end" = "start";

  let open = false;
  let root: HTMLDivElement;

  function toggle(event: MouseEvent) {
    event.stopPropagation();
    open = !open;
  }

  function closeFromOutside(event: MouseEvent) {
    if (root && !root.contains(event.target as Node)) {
      open = false;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      open = false;
    }
  }
</script>

<svelte:window onclick={closeFromOutside} onkeydown={handleKeydown} />

<div bind:this={root} data-slot="dropdown-menu" class="relative inline-block text-left">
  <Button onclick={toggle} aria-haspopup="menu" aria-expanded={open}>
    {label}
    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9L12 5.25 15.75 9" />
    </svg>
  </Button>

  {#if open}
    <div
      role="menu"
      tabindex="-1"
      class={cn(dropdownMenuContentClass, align === "end" && "right-0")}
    >
      <slot />
    </div>
  {/if}
</div>
