<script lang="ts">
  import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "$lib/components/ui/card/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<svelte:head><title>Coolify V2 Card sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN_V2.md → design/containers/card.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Card sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Dense operational surfaces with sharp borders and no decorative shadow.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Production API</CardTitle><CardDescription>api.coolify.local</CardDescription></CardHeader>
        <div class="flex items-center justify-between"><span>Status</span><Badge variant="success">Running</Badge></div>
        <div class="mt-2 flex items-center justify-between"><span>CPU</span><span class="font-mono text-black dark:text-white">42%</span></div>
        <CardFooter><Button variant="highlighted">Deploy</Button><Button>Logs</Button></CardFooter>
      </Card>
      <Card>
        <CardHeader><CardTitle>Worker</CardTitle><CardDescription>Background jobs and queues.</CardDescription></CardHeader>
        <div class="flex items-center justify-between"><span>Status</span><Badge variant="warning">Restarting</Badge></div>
        <div class="mt-2 flex items-center justify-between"><span>Memory</span><span class="font-mono text-black dark:text-white">768 MB</span></div>
        <CardFooter><Button>Restart</Button><Button variant="destructive">Stop</Button></CardFooter>
      </Card>
    </div>
  </section>
</main>
