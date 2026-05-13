<script lang="ts">
  import Checkbox from "./checkbox.svelte";
  import { checkboxRowClass } from "./index.js";

  export let label: string;
  export let description: string | undefined = undefined;
  export let checked = false;
  export let disabled = false;
</script>

<label class={disabled ? "flex max-w-full flex-row items-center gap-4 py-1 pr-2 cursor-default opacity-60" : checkboxRowClass}>
  <span class="flex min-w-0 grow flex-col break-words text-sm text-black dark:text-white">
    <span>{label}</span>
    {#if description}
      <span class="text-xs text-neutral-500 dark:text-neutral-400">{description}</span>
    {/if}
  </span>
  <Checkbox bind:checked {disabled} />
</label>
