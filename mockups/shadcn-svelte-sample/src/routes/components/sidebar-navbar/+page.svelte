<script lang="ts">
  import { SidebarNavbar } from "$lib/components/ui/sidebar-navbar/index.js";
  import { Breadcrumbs } from "$lib/components/ui/breadcrumbs/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Card, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";

  let collapsed = false;
</script>

<svelte:head><title>Coolify Sidebar Navbar sample</title></svelte:head>

<main class="mx-auto min-h-screen max-w-6xl px-6 py-10">
  <section class="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/navigation/sidebar-navbar.md</p>
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Sidebar Navbar sample</h1>
        <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Dense app shell navigation with active state, search, internal collapse trigger, and page subnav.</p>
      </div>
    </div>

    <div class="overflow-hidden rounded-sm border border-neutral-200 bg-gray-50 dark:border-coolgray-300 dark:bg-app-base lg:grid lg:grid-cols-[auto_1fr]">
      <SidebarNavbar bind:collapsed />

      <div class="min-w-0 p-4">
        <div class="mb-4 flex flex-col gap-4 border-b-2 border-neutral-200 pb-2 text-neutral-700 dark:border-coolgray-200 dark:text-neutral-400 md:flex-row md:items-center sm:justify-between">
          <div>
            <Breadcrumbs items={[{ label: "Projects", href: "/components/sidebar-navbar" }, { label: "coolify-cloud", href: "/components/sidebar-navbar" }, { label: "API" }]} />
            <div class="mt-2 flex items-center gap-2">
              <h2 class="text-2xl font-bold text-black dark:text-white">API service</h2>
              <Badge variant="success">Running</Badge>
            </div>
          </div>
          <nav class="flex min-h-10 items-center gap-6 overflow-x-auto whitespace-nowrap pt-2 text-sm">
            <a class="text-black dark:text-white" href="/components/sidebar-navbar" aria-current="page">Configuration</a>
            <a class="hover:text-coollabs dark:hover:text-warning" href="/components/sidebar-navbar">Deployments</a>
            <a class="hover:text-coollabs dark:hover:text-warning" href="/components/sidebar-navbar">Logs</a>
            <a class="hover:text-coollabs dark:hover:text-warning" href="/components/sidebar-navbar">Terminal</a>
          </nav>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Navigation rules</CardTitle>
              <CardDescription>Active dark item uses yellow text on a dark neutral fill.</CardDescription>
            </CardHeader>
            <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
              <li>Sidebar is border-separated, not shadowed.</li>
              <li>Items are compact text-sm rows with size-4 icons.</li>
              <li>Collapsed mode keeps titles for icon-only items.</li>
              <li>Page subnav scrolls horizontally when needed.</li>
            </ul>
            
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content surface</CardTitle>
              <CardDescription>The main content remains independent from sidebar state.</CardDescription>
            </CardHeader>
            <div class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <div class="flex justify-between"><span>Sidebar state</span><span class="font-mono text-black dark:text-white">{collapsed ? "collapsed" : "expanded"}</span></div>
              <div class="flex justify-between"><span>Active section</span><span class="font-mono text-black dark:text-white">Projects</span></div>
              <div class="flex justify-between"><span>Shortcut</span><span class="font-mono text-black dark:text-white">/</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>
</main>
