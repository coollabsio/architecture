<script lang="ts">
  import { FormField } from "$lib/components/ui/form-field/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<svelte:head>
  <title>Coolify Textarea sample</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/forms/textarea.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Textarea sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
        Shadcn-Svelte Textarea primitive with mono text, inset shadow outline, dirty bar, and optional Tab insertion.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-[1fr_16rem]">
      <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
        <FormField forId="env" label="Environment variables" required helper="Multi-line technical values use mono text and the same dirty bar as Input.">
          <Textarea id="env" placeholder={'APP_ENV=production\nPORT=3000'} />
        </FormField>

        <FormField forId="dirty-textarea" label="Dirty textarea" helper="The left bar shows unsaved changes.">
          <Textarea id="dirty-textarea" dirty value={'APP_ENV=production\nPORT=3000'} />
        </FormField>

        <FormField forId="tab-textarea" label="Tab insertion" description="Press Tab inside this field to insert two spaces.">
          <Textarea id="tab-textarea" allowTab value={'services:\n  api:\n    image: coollabsio/api'} />
        </FormField>

        <div class="grid gap-3 sm:grid-cols-2">
          <FormField forId="disabled-textarea" label="Disabled">
            <Textarea id="disabled-textarea" value="Disabled text" disabled />
          </FormField>
          <FormField forId="readonly-textarea" label="Readonly">
            <Textarea id="readonly-textarea" value="Readonly text" readonly />
          </FormField>
        </div>
      </div>

      <aside class="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Spec notes</h2>
        <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Textarea uses Geist Mono / font-mono.</li>
          <li>Textarea shares Input's inset shadow and dirty bar.</li>
          <li>Disabled and readonly states remove the inset shadow.</li>
          <li>Tab insertion is opt-in with allowTab.</li>
          <li>Password-like secrets should be a separate composition.</li>
        </ul>
      </aside>
    </div>
  </section>
</main>
