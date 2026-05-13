<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { DestructiveConfirmation } from "$lib/components/ui/modal/index.js";
  let open = false;
  let result = "Resource is still present.";
</script>

<svelte:head><title>Coolify Destructive confirmation sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200"><p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/overlays/modal-confirmation.md</p><h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Destructive confirmation sample</h1><p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Two-step destructive confirmation requiring typed text.</p></div>
    <div class="space-y-3 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base"><Button variant="destructive" onclick={() => (open = true)}>Delete environment</Button><p class="text-sm text-neutral-600 dark:text-neutral-400">{result}</p></div>
  </section>
</main>

<DestructiveConfirmation bind:open title="Delete environment?" description="All resources inside this environment will be permanently deleted. This cannot be undone." confirmationText="production" confirmLabel="Delete environment" onconfirm={() => (result = "Environment deletion confirmed.")} />
