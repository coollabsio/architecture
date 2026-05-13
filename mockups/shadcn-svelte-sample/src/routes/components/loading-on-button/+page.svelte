<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";

  let loading = true;
</script>

<svelte:head><title>Coolify V2 Loading On Button sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN_V2.md → design/feedback/loading-on-button.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Loading On Button sample</h1>
      <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">This is covered in Button, but separated here for accessibility and composition guidance.</p>
    </div>

    <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
      <div class="flex flex-wrap gap-2">
        <Button disabled={loading} aria-busy={loading ? "true" : undefined}>
          {loading ? "Saving" : "Save"}
          {#if loading}<Spinner />{/if}
        </Button>

        <Button variant="highlighted" disabled={loading} aria-busy={loading ? "true" : undefined}>
          {loading ? "Deploying" : "Deploy"}
          {#if loading}<Spinner />{/if}
        </Button>

        <Button variant="destructive" disabled={loading} aria-busy={loading ? "true" : undefined}>
          {loading ? "Removing" : "Remove"}
          {#if loading}<Spinner />{/if}
        </Button>

        <Button size="icon" disabled={loading} aria-busy={loading ? "true" : undefined} aria-label={loading ? "Refreshing" : "Refresh"}>
          {#if loading}
            <Spinner />
          {:else}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M16 8h5V3" />
            </svg>
          {/if}
        </Button>
      </div>

      <label class="flex items-center gap-2 text-sm text-black dark:text-white">
        <input type="checkbox" bind:checked={loading} />
        loading flag: {loading ? "true" : "false"}
      </label>
    </div>
  </section>
</main>
