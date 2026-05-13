<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { DialogModal } from "$lib/components/ui/modal/index.js";
  let open = false;
</script>

<svelte:head><title>Coolify Dialog sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200"><p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/overlays/modal.md</p><h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Dialog sample</h1><p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">General modal dialog for forms, details, and focused tasks.</p></div>
    <div class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base"><Button variant="highlighted" onclick={() => (open = true)}>Open dialog</Button></div>
  </section>
</main>

<DialogModal bind:open title="Create environment" description="Add a new environment to this project.">
  <div class="space-y-3">
    <p>Dialog content should be short, focused, and use existing form components.</p>
    <div class="rounded-sm border border-neutral-200 bg-neutral-100 p-3 text-xs dark:border-coolgray-300 dark:bg-coolgray-200">Example form content area</div>
  </div>
  <svelte:fragment slot="footer"><Button onclick={() => (open = false)}>Cancel</Button><Button variant="highlighted" onclick={() => (open = false)}>Create</Button></svelte:fragment>
</DialogModal>
