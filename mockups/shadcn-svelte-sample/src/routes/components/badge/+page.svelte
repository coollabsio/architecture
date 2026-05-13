<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Card, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";
</script>

<svelte:head><title>Coolify Badge sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/status/badge.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Badge sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Compact labels for deployment state and metadata.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Variants</CardTitle><CardDescription>Short semantic labels only.</CardDescription></CardHeader>
        <div class="flex flex-wrap gap-2">
          <Badge>Default</Badge><Badge variant="success">Healthy</Badge><Badge variant="warning">Queued</Badge><Badge variant="error">Failed</Badge><Badge variant="outline">v1.4.2</Badge><Badge variant="accent">Preview</Badge>
        </div>
      </Card>
      <Card>
        <CardHeader><CardTitle>Service rows</CardTitle><CardDescription>Badges remain small inside dense tables.</CardDescription></CardHeader>
        <div class="space-y-2 text-sm">
          <div class="flex items-center justify-between"><span>API</span><Badge variant="success">Running</Badge></div>
          <div class="flex items-center justify-between"><span>Worker</span><Badge variant="warning">Restarting</Badge></div>
          <div class="flex items-center justify-between"><span>Database</span><Badge variant="error">Down</Badge></div>
        </div>
      </Card>
    </div>
  </section>
</main>
