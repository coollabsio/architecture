<script lang="ts">
  import { CopyButton } from "$lib/components/ui/copy-button/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";
</script>

<svelte:head>
  <title>Coolify Copy Button sample</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/forms/copy-button.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Copy Button sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
        Readonly Input composition with secure-context clipboard action and temporary copied check state.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-[1fr_16rem]">
      <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
        <FormField forId="public-url" label="Public URL" helper="Copyable values use readonly input styling and an inline icon action.">
          <CopyButton text="https://api.example.com" />
        </FormField>

        <FormField forId="certificate-path" label="Certificate mount path">
          <CopyButton text="- /data/coolify/ssl/coolify-ca.crt:/etc/ssl/certs/coolify-ca.crt:ro" mono />
        </FormField>

        <FormField forId="invite-link" label="Invitation link" description="Click the icon to show the green copied state for 1 second.">
          <CopyButton text="https://coolify.example.com/invitations/team_7f3c9a" />
        </FormField>
      </div>

      <aside class="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Spec notes</h2>
        <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Composes readonly Input plus absolute icon button.</li>
          <li>Copy button renders only in secure clipboard contexts.</li>
          <li>Input reserves right padding so text stays clear of the icon.</li>
          <li>Copied state uses green check for 1 second.</li>
          <li>Icon button keeps visible focus ring.</li>
        </ul>
      </aside>
    </div>
  </section>
</main>
