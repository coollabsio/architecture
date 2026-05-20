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

<label data-slot="switch-row" class={cn("flex max-w-full flex-row items-center gap-4 py-1 pr-2 text-sm", disabled ? "opacity-60" : "cursor-pointer hover:bg-muted", className)}>
  <span class="min-w-0 grow">
    <span class="block break-words text-foreground">{label}</span>
    {#if description}<span class="block break-words text-xs text-muted-foreground">{description}</span>{/if}
  </span>
  <Switch bind:checked {disabled} aria-label={label} />
</label>
