<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { ConfirmModal } from "$lib/components/ui/modal/index.js";
  let open = false;
  let result = "No action confirmed yet.";
</script>

<svelte:head><title>Coolify Confirm modal sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200"><p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/overlays/confirm-modal.md</p><h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Confirm modal sample</h1><p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Single-step confirmation for reversible or low-risk actions.</p></div>
    <div class="space-y-3 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base"><Button variant="highlighted" onclick={() => (open = true)}>Confirm redeploy</Button><p class="text-sm text-neutral-600 dark:text-neutral-400">{result}</p></div>
  </section>
</main>

<ConfirmModal bind:open title="Redeploy application?" description="This will start a new deployment using the latest available configuration." confirmLabel="Redeploy" onconfirm={() => (result = "Redeploy confirmed.")} />
