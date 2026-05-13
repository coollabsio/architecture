<script lang="ts">
  import { cn } from "$lib/utils";

  export let name: string;
  export let value = "";
  export let optionValue: string;
  export let label: string;
  export let description: string | undefined = undefined;
  export let disabled = false;

  let className: string | undefined = undefined;
  export { className as class };
</script>

<label
  class={cn(
    "flex max-w-full flex-row items-center gap-4 rounded-sm px-2 py-1 text-sm",
    disabled ? "cursor-default opacity-60" : "cursor-pointer dark:hover:bg-coolgray-100",
    className
  )}
>
  <span class="min-w-0 grow">
    <span class="block break-words text-black dark:text-white">{label}</span>
    {#if description}
      <span class="block break-words text-xs text-neutral-600 dark:text-neutral-400">{description}</span>
    {/if}
  </span>
  <span class="relative inline-grid size-4 shrink-0 place-items-center">
    <input class="peer sr-only" type="radio" {name} bind:group={value} value={optionValue} {disabled} />
    <span
      class="grid size-4 place-items-center rounded-full border border-neutral-300 bg-white outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-coollabs peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-coolgray-100 dark:peer-focus-visible:ring-warning dark:peer-focus-visible:ring-offset-app-base"
      aria-hidden="true"
    >
      {#if value === optionValue}
        <span class="size-2 rounded-full bg-coollabs dark:bg-warning"></span>
      {/if}
    </span>
  </span>
</label>
