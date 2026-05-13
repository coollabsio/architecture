<script lang="ts">
  import { RadioGroup, RadioRow } from "$lib/components/ui/radio-group/index.js";

  let strategy = "rolling";
  let region = "eu";
</script>

<svelte:head><title>Coolify Radio Group sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/forms/radio-group.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Radio Group sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Compact single-choice rows based on Shadcn-Svelte Radio Group.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-[1fr_16rem]">
      <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
        <div>
          <h2 class="mb-2 text-base font-bold text-black dark:text-white">Deployment strategy</h2>
          <RadioGroup name="strategy" bind:value={strategy} options={[
            { value: 'rolling', label: 'Rolling deploy', description: 'Deploy gradually with no downtime.' },
            { value: 'recreate', label: 'Recreate containers', description: 'Stop old containers before starting new ones.' },
            { value: 'blue-green', label: 'Blue/green', description: 'Not available for this project.', disabled: true }
          ]} />
        </div>

        <div>
          <h2 class="mb-2 text-base font-bold text-black dark:text-white">Region</h2>
          <div class="space-y-1">
            <RadioRow name="region" bind:value={region} optionValue="eu" label="Europe" description="Use the existing Frankfurt server." />
            <RadioRow name="region" bind:value={region} optionValue="us" label="United States" description="Use a remote worker node." />
          </div>
        </div>
      </div>

      <aside class="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Spec notes</h2>
        <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Single-choice only.</li><li>Controls are circular size-4.</li><li>Selected uses inner dot.</li><li>Rows wrap labels safely.</li>
        </ul>
      </aside>
    </div>
  </section>
</main>
