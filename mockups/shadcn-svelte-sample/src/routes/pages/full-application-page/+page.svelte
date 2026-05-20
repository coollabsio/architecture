<script lang="ts">
  import { base } from "$app/paths";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Breadcrumbs } from "$lib/components/ui/breadcrumbs/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { SidebarNavbar } from "$lib/components/ui/sidebar-navbar/index.js";
  import { SwitchRow } from "$lib/components/ui/switch/index.js";

  let collapsed = false;
  let autoDeploy = true;
  let previews = false;
  let maintenance = false;
</script>

<svelte:head><title>Full application page</title></svelte:head>

<main class="min-h-screen bg-gray-50 text-black dark:bg-app-base dark:text-neutral-400 lg:grid lg:grid-cols-[auto_1fr]">
  <SidebarNavbar bind:collapsed />

  <section class="min-w-0 px-6 py-8">
    <div class="mx-auto max-w-6xl">
      <header class="mb-6 flex flex-col gap-4 border-b-2 border-neutral-200 pb-4 dark:border-coolgray-200 md:flex-row md:items-end md:justify-between">
        <div class="min-w-0">
          <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/pages/full-application-page.md</p>
          <Breadcrumbs items={[{ label: "Projects", href: `${base}/pages/full-application-page` }, { label: "coolify-cloud", href: `${base}/pages/full-application-page` }, { label: "API" }]} />
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">API service</h1>
            <Badge variant="success">Running</Badge>
            <Badge variant="outline">Production</Badge>
          </div>
          <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">A full application shell with the Coolify sidebar navbar, page header, subnavigation, settings, and operational cards.</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button>Visit</Button>
          <Button>Restart</Button>
          <Button variant="highlighted">Deploy</Button>
        </div>
      </header>

      <nav class="mb-4 flex min-h-10 items-center gap-6 overflow-x-auto whitespace-nowrap pt-2 text-sm text-neutral-700 dark:text-neutral-400" aria-label="Resource sections">
        <a class="text-black dark:text-white" href={`${base}/pages/full-application-page`} aria-current="page">Configuration</a>
        <a class="hover:text-coollabs dark:hover:text-warning" href={`${base}/pages/full-application-page`}>Deployments</a>
        <a class="hover:text-coollabs dark:hover:text-warning" href={`${base}/pages/full-application-page`}>Logs</a>
        <a class="hover:text-coollabs dark:hover:text-warning" href={`${base}/pages/full-application-page`}>Terminal</a>
        <a class="hover:text-coollabs dark:hover:text-warning" href={`${base}/pages/full-application-page`}>Settings</a>
      </nav>

      <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General configuration</CardTitle>
              <CardDescription>Production service identity and routing.</CardDescription>
            </CardHeader>
            <div class="grid gap-4 md:grid-cols-2">
              <label class="space-y-1 text-sm font-medium text-black dark:text-white">
                <span>Service name</span>
                <Input class="dark:bg-app-base" value="api" />
              </label>
              <label class="space-y-1 text-sm font-medium text-black dark:text-white">
                <span>Public domain</span>
                <Input class="dark:bg-app-base" value="api.example.com" />
              </label>
              <label class="space-y-1 text-sm font-medium text-black dark:text-white md:col-span-2">
                <span>Repository</span>
                <Input class="dark:bg-app-base" value="github.com/coollabs/api:main" readonly />
              </label>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deployment behavior</CardTitle>
              <CardDescription>Immediate settings use the switch component and keep helper text visible.</CardDescription>
            </CardHeader>
            <div class="space-y-2">
              <SwitchRow bind:checked={autoDeploy} label="Auto deploy" description="Deploy when the main branch receives a new commit." />
              <SwitchRow bind:checked={previews} label="Preview deployments" description="Create temporary deployments for pull requests." />
              <SwitchRow bind:checked={maintenance} label="Maintenance mode" description="Pause incoming deploys while operators work on the service." />
            </div>
          </Card>
        </div>

        <aside class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>Runtime metadata.</CardDescription>
            </CardHeader>
            <dl class="space-y-3">
              <div class="flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 dark:bg-app-base"><dt class="text-xs text-neutral-500 dark:text-neutral-400">Region</dt><dd class="text-sm font-medium text-black dark:text-white">EU</dd></div>
              <div class="flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 dark:bg-app-base"><dt class="text-xs text-neutral-500 dark:text-neutral-400">Replicas</dt><dd class="text-sm font-medium text-black dark:text-white">3</dd></div>
              <div class="flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 dark:bg-app-base"><dt class="text-xs text-neutral-500 dark:text-neutral-400">Last deploy</dt><dd class="text-sm font-medium text-black dark:text-white">8 min ago</dd></div>
            </dl>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Secondary operator actions.</CardDescription>
            </CardHeader>
            <div class="flex flex-col gap-2">
              <Button>View logs</Button>
              <Button>Open terminal</Button>
              <Button variant="destructive">Stop service</Button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  </section>
</main>
