<script lang="ts">
  import { Tabs } from "$lib/components/ui/tabs/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  const items = [{ value: "overview", label: "Overview" }, { value: "env", label: "Environment" }, { value: "logs", label: "Logs" }];
  let active = "overview";
</script>

<svelte:head><title>Coolify Tabs sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/navigation/tabs.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Tabs sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Compact section navigation inside one service context.</p>
    </div>

    <div class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
      <Tabs {items} bind:value={active}>
        <div slot="default" let:value class="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-100">
          {#if value === 'overview'}
            <div class="flex items-center justify-between"><h2 class="text-base font-bold text-black dark:text-white">Service overview</h2><Badge variant="success">Running</Badge></div>
            <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">3 containers healthy. Last deploy completed 12 minutes ago.</p>
          {:else if value === 'env'}
            <h2 class="text-base font-bold text-black dark:text-white">Environment</h2>
            <p class="mt-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">DATABASE_URL, REDIS_URL, APP_KEY configured.</p>
          {:else}
            <h2 class="text-base font-bold text-black dark:text-white">Logs</h2>
            <p class="mt-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">[12:04:11] health check passed</p>
          {/if}
          <div class="mt-3"><Button>Open details</Button></div>
        </div>
      </Tabs>
    </div>
  </section>
</main>
