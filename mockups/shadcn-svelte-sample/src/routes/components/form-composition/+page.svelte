<script lang="ts">
  import { FormComposition } from "$lib/components/ui/form-composition/index.js";
</script>

<svelte:head><title>Coolify Form composition sample</title></svelte:head>

<main class="mx-auto min-h-screen max-w-5xl px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/forms/form-composition.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Form composition / validation sample</h1>
      <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Required markers, helper text, dirty state, errors, save action, and separate submitted feedback layouts.</p>
    </div>

    <div class="space-y-4">
      <section class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200" aria-labelledby="interactive-form-title">
        <div class="mb-3">
          <h2 id="interactive-form-title" class="text-base font-bold text-black dark:text-white">Interactive validation</h2>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Default editable form. Submit empty or invalid values to preview field and form-level errors.</p>
        </div>
        <FormComposition />
      </section>

      <div class="grid gap-4 lg:grid-cols-2">
        <section class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200" aria-labelledby="success-form-title">
          <div class="mb-3">
            <h2 id="success-form-title" class="text-base font-bold text-black dark:text-white">Success / saved state</h2>
            <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Persistent confirmation sits below the form header and above fields.</p>
          </div>
          <FormComposition example="success" />
        </section>

        <section class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200" aria-labelledby="error-form-title">
          <div class="mb-3">
            <h2 id="error-form-title" class="text-base font-bold text-black dark:text-white">Error / failed submit state</h2>
            <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Form-level failure summarizes the issue while fields keep specific messages.</p>
          </div>
          <FormComposition example="error" />
        </section>
      </div>
    </div>
  </section>
</main>
