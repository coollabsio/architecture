<script lang="ts">
  import { Breadcrumbs } from "$lib/components/ui/breadcrumbs/index.js";
  import { Card, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";
</script>
<svelte:head><title>Coolify Breadcrumbs sample</title></svelte:head>
<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10"><section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100"><div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200"><p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/navigation/breadcrumbs.md</p><h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Breadcrumbs sample</h1><p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Compact hierarchy navigation.</p></div><Card><CardHeader><Breadcrumbs items={[{label:'Projects',href:'#'},{label:'coolify-cloud',href:'#'},{label:'API'}]} /><CardTitle>API service</CardTitle><CardDescription>Current crumb uses aria-current page.</CardDescription></CardHeader></Card></section></main>
