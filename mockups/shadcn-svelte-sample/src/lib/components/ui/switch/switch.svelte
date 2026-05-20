<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  type $$Props = HTMLButtonAttributes & { checked?: boolean };

  export let checked = false;
  export let disabled = false;
  let className: $$Props["class"] = undefined;
  export { className as class };

  function toggle() {
    if (!disabled) checked = !checked;
  }
</script>

<button
  type="button"
  role="switch"
  data-slot="switch"
  aria-checked={checked}
  {disabled}
  data-state={checked ? "checked" : "unchecked"}
  class={cn(
    "inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-muted p-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-primary",
    className
  )}
  onclick={toggle}
  {...$$restProps}
>
  <span class={cn("size-3 rounded-full bg-background transition-transform", checked && "translate-x-[14px] bg-primary-foreground")} aria-hidden="true"></span>
</button>
