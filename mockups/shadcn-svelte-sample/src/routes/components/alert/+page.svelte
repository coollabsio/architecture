<script lang="ts">
  import { Alert } from "$lib/components/ui/alert/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<svelte:head><title>Coolify Alert sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/overlays/alert.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Alert sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Compact inline notices for operational feedback.</p>
    </div>

    <div class="space-y-3 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
      <Alert title="Deployment ready"><span slot="icon">i</span>The latest image was built and is ready to deploy.</Alert>
      <Alert variant="success" title="Backup completed"><span slot="icon">✓</span>The database backup finished 2 minutes ago.</Alert>
      <Alert variant="warning" title="Resource limit close"><span slot="icon">!</span>This server is using 86% of its memory limit.</Alert>
      <Alert variant="destructive" title="Deployment failed" role="alert"><span slot="icon">×</span>The health check did not pass. Review logs before retrying.</Alert>
      <div class="flex gap-2"><Button variant="highlighted">View logs</Button><Button>Dismiss</Button></div>
    </div>
  </section>
</main>
