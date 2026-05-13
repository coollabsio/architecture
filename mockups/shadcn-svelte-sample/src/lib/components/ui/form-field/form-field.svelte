<script lang="ts">
  export let forId: string;
  export let label: string;
  export let required = false;
  export let helper: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let error: string | undefined = undefined;

  let tooltipOpen = false;
</script>

<div class="space-y-1">
  <div class="mb-1 flex items-center gap-1">
    <label for={forId} class="text-sm font-medium text-black dark:text-white">{label}</label>

    {#if required}
      <span class="font-bold text-coollabs dark:text-warning" aria-hidden="true">*</span>
    {/if}

    {#if helper}
      <div class="relative inline-flex">
        <button
          type="button"
          class="inline-flex size-4 items-center justify-center rounded-full bg-coollabs text-white outline-none hover:bg-coollabs-200 focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:bg-warning dark:text-app-base dark:hover:bg-warning dark:focus-visible:ring-warning dark:focus-visible:ring-offset-app-base"
          aria-label={`${label} help`}
          aria-expanded={tooltipOpen}
          onmouseenter={() => (tooltipOpen = true)}
          onmouseleave={() => (tooltipOpen = false)}
          onfocus={() => (tooltipOpen = true)}
          onblur={() => (tooltipOpen = false)}
          onclick={() => (tooltipOpen = !tooltipOpen)}
        >
          <span class="text-[10px] font-bold leading-none" aria-hidden="true">i</span>
        </button>

        {#if tooltipOpen}
          <div class="absolute left-5 top-1/2 z-50 min-w-max max-w-[min(20rem,calc(100vw-2rem))] -translate-y-1/2 whitespace-normal rounded-sm bg-coolgray-400 px-2 py-1.5 text-xs leading-4 text-white shadow-sm">
            {helper}
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <slot />

  {#if error}
    <p class="mt-1 text-xs text-error">{error}</p>
  {:else if description}
    <p class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
  {/if}
</div>
