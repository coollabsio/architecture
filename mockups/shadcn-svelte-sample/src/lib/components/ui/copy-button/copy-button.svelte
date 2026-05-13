<script lang="ts">
  import { onMount } from "svelte";
  import { Input } from "$lib/components/ui/input/index.js";

  export let text: string;
  export let label = "Copy to clipboard";
  export let mono = false;

  let copied = false;
  let isSecure = false;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    isSecure = window.isSecureContext && !!navigator.clipboard;
  });

  async function copy() {
    if (!isSecure) return;

    await navigator.clipboard.writeText(text);
    copied = true;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => (copied = false), 1000);
  }
</script>

<div class="relative">
  <Input value={text} readonly class={mono ? "pr-11 font-mono" : "pr-11"} />

  {#if isSecure}
    <button
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1.5 text-neutral-500 transition-colors hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:text-neutral-400 dark:hover:text-white dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base"
      title={label}
      aria-label={label}
      onclick={copy}
    >
      {#if copied}
        <svg class="size-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      {:else}
        <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
        </svg>
      {/if}
    </button>
  {/if}
</div>
