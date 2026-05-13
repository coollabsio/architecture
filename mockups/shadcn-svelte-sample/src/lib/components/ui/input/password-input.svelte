<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { Input } from "./index.js";

  type $$Props = Omit<HTMLInputAttributes, "type"> & {
    dirty?: boolean;
    sticky?: boolean;
  };

  export let dirty: boolean = false;
  export let sticky: boolean = false;
  export let value: $$Props["value"] = undefined;
  let visible = false;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div class="relative">
  <Input
    bind:value
    type={visible ? "text" : "password"}
    {dirty}
    {sticky}
    class={className ? `${className} pr-[2.4rem]` : "pr-[2.4rem]"}
    {...$$restProps}
  />
  <button
    type="button"
    class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2 text-neutral-500 outline-none hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:hover:text-white dark:focus-visible:ring-warning dark:focus-visible:ring-offset-app-base"
    aria-label={visible ? "Hide password" : "Show password"}
    aria-pressed={visible}
    onclick={() => (visible = !visible)}
  >
    {#if visible}
      <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
        <path d="M16.681 16.673A8.717 8.717 0 0 1 12 18c-3.6 0-6.6-2-9-6 1.272-2.12 2.712-3.678 4.32-4.674m2.86-1.146A9.055 9.055 0 0 1 12 6c3.6 0 6.6 2 9 6-.666 1.11-1.379 2.067-2.138 2.87" />
        <path d="M3 3l18 18" />
      </svg>
    {:else}
      <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
        <path d="M21 12c-2.4 4-5.4 6-9 6s-6.6-2-9-6c2.4-4 5.4-6 9-6s6.6 2 9 6" />
      </svg>
    {/if}
  </button>
</div>
