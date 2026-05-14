<script lang="ts">
  import { Input, PasswordInput } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";
</script>

<svelte:head>
  <title>Coolify Input sample</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/forms/input.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Input sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
        Shadcn-Svelte Input primitive with Coolify's inset shadow outline and 4px focus/dirty bar.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-[1fr_16rem]">
      <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
        <FormField
          forId="app-name"
          label="Application name"
          required
          helper="Used as the public service name in generated deployment labels."
          description="Keep it short and operator-readable."
        >
          <Input id="app-name" placeholder="api-production" />
        </FormField>

        <FormField
          forId="dirty-name"
          label="Dirty input"
          helper="The left bar shows unsaved changes."
        >
          <Input id="dirty-name" value="api-production" dirty />
        </FormField>

        <FormField forId="password" label="Password with reserved icon space" helper="The eye icon is only for visibility toggles; helper info uses a circled i icon.">
<PasswordInput id="password" value="super-secret-token" />
        </FormField>

        <div class="grid gap-3 sm:grid-cols-2">
          <FormField forId="disabled" label="Disabled">
            <Input id="disabled" value="Disabled value" disabled />
          </FormField>
          <FormField forId="readonly" label="Readonly">
            <Input id="readonly" value="Readonly value" readonly />
          </FormField>
        </div>

        <FormField forId="sticky" label="Sticky variant" error="Example error text uses text-xs text-error below the field.">
          <Input id="sticky" value="Thin 1px simulated border" sticky />
        </FormField>

        <FormField forId="ghost-input" label="Ghost input" description="Use only inside a row, toolbar, or panel that already provides the boundary.">
          <div class="p-2">
            <Input id="ghost-input" ghost placeholder="No border or background" />
          </div>
        </FormField>
      </div>

      <aside class="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Spec notes</h2>
        <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>No normal border; outline is layered inset box-shadow.</li>
          <li>Focus and dirty states use the same 4px left accent bar.</li>
          <li>Light accent is purple; dark accent is yellow.</li>
          <li>Disabled and readonly states remove the shadow entirely.</li>
          <li>Form labels compose required markers and circled info helper icons.</li>
          <li>Password field hides by default and toggles show/hide with eye icons.</li>
          <li>Password field reserves pr-[2.4rem] for the visibility button.</li>
          <li>Ghost inputs remove background and inset shadow; parent chrome provides the boundary.</li>
        </ul>
      </aside>
    </div>
  </section>
</main>
