<script lang="ts">
  import { Switch, SwitchRow } from "$lib/components/ui/switch/index.js";

  let enabled = true;
  let previews = false;
</script>

<svelte:head><title>Coolify Switch sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/forms/switch.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Switch sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Immediate on/off settings with compact Shadcn-Svelte Switch styling.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-[1fr_16rem]">
      <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
        <div>
          <h2 class="mb-2 text-base font-bold text-black dark:text-white">Primitive states</h2>
          <div class="flex items-center gap-4 text-sm text-black dark:text-white">
            <Switch bind:checked={enabled} aria-label="Service enabled" /> Enabled
            <Switch bind:checked={previews} aria-label="Preview deployments" /> Off
            <Switch checked disabled aria-label="Disabled switch" /> Disabled
          </div>
        </div>
        <div>
          <h2 class="mb-2 text-base font-bold text-black dark:text-white">Rows</h2>
          <div class="space-y-1">
            <SwitchRow label="Auto deploy" description="Deploy when the main branch changes." checked />
            <SwitchRow label="Preview deployments" description="Create environments for pull requests." />
            <SwitchRow label="Locked setting" description="Requires owner permissions." disabled checked />
          </div>
        </div>
      </div>
      <aside class="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Spec notes</h2>
        <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400"><li>w-8 h-4 track.</li><li>size-3 thumb.</li><li>Use for immediate toggles.</li></ul>
      </aside>
    </div>
  </section>
</main>
