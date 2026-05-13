<script lang="ts">
  import { FormField } from "$lib/components/ui/form-field/index.js";
  import { NativeSelect } from "$lib/components/ui/select/index.js";
</script>

<svelte:head>
  <title>Coolify V2 Select sample</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN_V2.md → design/forms/select.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Select sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
        Native select wrapper with the same inset shadow system as Input and Coolify's stacked up/down chevron.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-[1fr_16rem]">
      <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
        <FormField forId="direction" label="Direction" required helper="Choose how incoming domains are normalized.">
          <NativeSelect id="direction" value="allow-www-and-non-www">
            <option value="allow-www-and-non-www">Allow www & non-www.</option>
            <option value="redirect-to-www">Redirect to www.</option>
            <option value="redirect-to-non-www">Redirect to non-www.</option>
          </NativeSelect>
        </FormField>

        <FormField forId="dirty-select" label="Dirty select" helper="The left bar shows an unsaved select value.">
          <NativeSelect id="dirty-select" value="redirect-to-www" dirty>
            <option value="allow-www-and-non-www">Allow www & non-www.</option>
            <option value="redirect-to-www">Redirect to www.</option>
            <option value="redirect-to-non-www">Redirect to non-www.</option>
          </NativeSelect>
        </FormField>

        <FormField forId="disabled-select" label="Disabled select">
          <NativeSelect id="disabled-select" value="disabled" disabled>
            <option value="disabled">Disabled option</option>
          </NativeSelect>
        </FormField>
      </div>

      <aside class="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Spec notes</h2>
        <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Select shares Input's inset box-shadow system.</li>
          <li>Focus and dirty states use the same 4px left accent bar.</li>
          <li>Chevron is stacked up/down, black in light mode and white in dark mode.</li>
          <li>Disabled state removes the inset shadow.</li>
          <li>Simple forms should prefer this native select wrapper.</li>
        </ul>
      </aside>
    </div>
  </section>
</main>
