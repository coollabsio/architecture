<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Checkbox, CheckboxRow } from "$lib/components/ui/checkbox/index.js";

  let checked = true;
  let unchecked = false;
</script>

<svelte:head>
  <title>Coolify V2 Checkbox sample</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN_V2.md → design/forms/checkbox.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Checkbox sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
        Compact checkbox primitive with right-aligned row composition, wrapped labels, and Coolify focus rings.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-[1fr_16rem]">
      <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
        <div>
          <h2 class="mb-2 text-base font-bold text-black dark:text-white">Primitive states</h2>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 text-sm text-black dark:text-white">
              <Checkbox bind:checked={checked} /> Checked
            </label>
            <label class="flex items-center gap-2 text-sm text-black dark:text-white">
              <Checkbox bind:checked={unchecked} /> Unchecked
            </label>
            <label class="flex items-center gap-2 text-sm text-neutral-500">
              <Checkbox checked disabled /> Disabled
            </label>
          </div>
        </div>

        <div>
          <h2 class="mb-2 text-base font-bold text-black dark:text-white">Rows</h2>
          <div class="space-y-1">
            <CheckboxRow label="Enable preview deployments" description="Create preview environments for pull requests." checked />
            <CheckboxRow label="Auto-apply configuration changes" description="This label wraps without shrinking the checkbox control on the right side of the row." />
            <CheckboxRow label="Disabled setting" description="Disabled rows remain readable but are not interactive." disabled checked />
          </div>
        </div>
      </div>

      <aside class="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Spec notes</h2>
        <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Checkbox is size-4, rounded-sm, shrink-0.</li>
          <li>Checked state uses purple fill and white check.</li>
          <li>Focus ring uses purple light and yellow dark.</li>
          <li>Rows are clickable and dark-hoverable when enabled.</li>
          <li>Long labels wrap without compressing the control.</li>
        </ul>

        <div class="mt-3 flex gap-2">
          <Button variant="highlighted">Save</Button>
          <Button>Reset</Button>
        </div>
      </aside>
    </div>
  </section>
</main>
