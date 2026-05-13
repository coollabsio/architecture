<script lang="ts">
  import { Switch } from "./index.js";
  import { cn } from "$lib/utils";

  export let checked = false;
  export let label: string;
  export let description: string | undefined = undefined;
  export let disabled = false;
  let className: string | undefined = undefined;
  export { className as class };
</script>

<label class={cn("flex max-w-full flex-row items-center gap-4 py-1 pr-2 text-sm", disabled ? "opacity-60" : "cursor-pointer dark:hover:bg-coolgray-100", className)}>
  <span class="min-w-0 grow">
    <span class="block break-words text-black dark:text-white">{label}</span>
    {#if description}<span class="block break-words text-xs text-neutral-600 dark:text-neutral-400">{description}</span>{/if}
  </span>
  <Switch bind:checked {disabled} aria-label={label} />
</label>
