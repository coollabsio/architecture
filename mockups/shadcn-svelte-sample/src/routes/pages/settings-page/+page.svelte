<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Callout } from "$lib/components/ui/callout/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { NativeSelect } from "$lib/components/ui/select/index.js";
  import { SwitchRow } from "$lib/components/ui/switch/index.js";

  let appName = "Coolify";
  let publicUrl = "https://app.example.com";
  let supportEmail = "support@example.com";
  let timezone = "UTC";
  let registration = false;
  let emailVerification = true;
  let inviteOnly = true;
  let maintenance = false;
</script>

<svelte:head><title>Application settings</title></svelte:head>

<main class="mx-auto min-h-screen max-w-6xl px-6 py-10">
  <header class="mb-6 flex flex-col gap-4 border-b border-neutral-200 pb-4 dark:border-coolgray-200 md:flex-row md:items-start md:justify-between">
    <div>
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/pages/settings-page.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Application settings</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Configure instance identity, access policy, and operational behavior for the whole application.</p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Button>Reset</Button>
      <Button variant="highlighted">Save changes</Button>
    </div>
  </header>

  <div class="mb-4">
    <Callout title="Instance-wide settings">Changes on this page can affect every user and project. Keep helper text visible for settings with operational impact.</Callout>
  </div>

  <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
    <div class="space-y-4">
      <section class="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <h2 class="text-base font-bold text-black dark:text-white">General</h2>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Identity and public routing values shown across the application.</p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <FormField forId="app-name" label="Application name" helper="Shown in the sidebar brand, auth pages, emails, and browser title.">
            <Input id="app-name" bind:value={appName} dirty />
          </FormField>

          <FormField forId="public-url" label="Public URL" helper="Canonical URL used for callbacks, generated links, and email actions.">
            <Input id="public-url" bind:value={publicUrl} dirty />
          </FormField>

          <FormField forId="support-email" label="Support email" description="Used in system emails and account recovery screens.">
            <Input id="support-email" type="email" bind:value={supportEmail} />
          </FormField>

          <FormField forId="timezone" label="Default timezone" description="Used for schedules until a user chooses their own timezone.">
            <NativeSelect id="timezone" bind:value={timezone}>
              <option value="UTC">UTC</option>
              <option value="Europe/Budapest">Europe/Budapest</option>
              <option value="America/New_York">America/New_York</option>
            </NativeSelect>
          </FormField>
        </div>
      </section>

      <section class="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <h2 class="text-base font-bold text-black dark:text-white">Access & registration</h2>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Control who can join this instance and how accounts are verified.</p>
        </div>

        <div class="space-y-2">
          <SwitchRow bind:checked={registration} label="Allow public registration" description="Anyone with the public URL can create an account." />
          <SwitchRow bind:checked={emailVerification} label="Require email verification" description="New users must verify their email address before using the app." />
          <SwitchRow bind:checked={inviteOnly} label="Invite-only mode" description="Only invited users can join teams and projects." />
          <SwitchRow bind:checked={maintenance} label="Maintenance mode" description="Temporarily limit access while operators perform maintenance." />
        </div>
      </section>

      <section class="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <h2 class="text-base font-bold text-black dark:text-white">System notifications</h2>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Keep operators informed about updates, security notices, and failed background jobs.</p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <FormField forId="admin-email" label="Admin notification email" description="Receives update and incident notifications.">
            <Input id="admin-email" type="email" value="ops@example.com" />
          </FormField>
          <FormField forId="update-channel" label="Update channel" description="Controls which release notices appear in the dashboard.">
            <NativeSelect id="update-channel" value="stable">
              <option value="stable">Stable</option>
              <option value="preview">Preview</option>
              <option value="none">None</option>
            </NativeSelect>
          </FormField>
        </div>
      </section>
    </div>

    <aside class="space-y-4">
      <section class="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div class="mb-4 flex items-center justify-between gap-3">
          <h2 class="text-base font-bold text-black dark:text-white">Instance status</h2>
          <Badge variant="success">Healthy</Badge>
        </div>
        <dl class="space-y-3">
          <div class="flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 dark:bg-base">
            <dt class="text-xs text-neutral-500 dark:text-neutral-400">Version</dt>
            <dd class="text-sm font-medium text-black dark:text-white">v4.0.0</dd>
          </div>
          <div class="flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 dark:bg-base">
            <dt class="text-xs text-neutral-500 dark:text-neutral-400">Environment</dt>
            <dd class="text-sm font-medium text-black dark:text-white">Production</dd>
          </div>
          <div class="flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 dark:bg-base">
            <dt class="text-xs text-neutral-500 dark:text-neutral-400">Last backup</dt>
            <dd class="text-sm font-medium text-black dark:text-white">12 min ago</dd>
          </div>
        </dl>
      </section>

      <section class="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <h2 class="text-base font-bold text-black dark:text-white">Maintenance</h2>
        <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Run safe operational actions without leaving the settings page.</p>
        <div class="mt-4 flex flex-col gap-2">
          <Button>Check for updates</Button>
          <Button>Create backup</Button>
        </div>
      </section>

      <section class="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <h2 class="text-base font-bold text-red-700 dark:text-red-300">Danger zone</h2>
        <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Irreversible actions require destructive confirmation. The outer card stays neutral.</p>
        <div class="mt-4 flex flex-col gap-2">
          <Button variant="destructive">Rotate instance secret</Button>
          <Button variant="destructive">Reset application</Button>
        </div>
      </section>
    </aside>
  </div>
</main>
