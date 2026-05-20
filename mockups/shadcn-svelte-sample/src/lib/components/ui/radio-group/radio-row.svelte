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
  data-slot="radio-row"
  class={cn(
    "flex max-w-full flex-row items-center gap-4 rounded-sm px-2 py-1 text-sm",
    disabled ? "cursor-default opacity-60" : "cursor-pointer hover:bg-muted",
    className
  )}
>
  <span class="min-w-0 grow">
    <span class="block break-words text-foreground">{label}</span>
    {#if description}
      <span class="block break-words text-xs text-muted-foreground">{description}</span>
    {/if}
  </span>
  <span class="relative inline-grid size-4 shrink-0 place-items-center">
    <input class="peer sr-only" type="radio" {name} bind:group={value} value={optionValue} {disabled} />
    <span
      class="grid size-4 place-items-center rounded-full border border-border bg-background outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-disabled:cursor-not-allowed"
      aria-hidden="true"
    >
      {#if value === optionValue}
        <span class="size-2 rounded-full bg-primary"></span>
      {/if}
    </span>
  </span>
</label>
