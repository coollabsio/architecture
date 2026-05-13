<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Coolbox } from "$lib/components/ui/coolbox/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Callout } from "$lib/components/ui/callout/index.js";
  import { SubSidebar, type SubSidebarItem } from "$lib/components/ui/subsidebar/index.js";

  let view: "grid" | "split" | "single" = "grid";

  const resourceSections: SubSidebarItem[] = [
    { label: "Environment", href: "/components/main-view", active: true },
    { label: "Deployments", href: "/components/main-view" },
    { label: "Commands", href: "/components/main-view" },
    { label: "Logs", href: "/components/main-view" },
    { label: "Metrics", href: "/components/main-view" },
    { label: "Settings", href: "/components/main-view" }
  ];
</script>

<svelte:head><title>Coolify V2 Main View layouts</title></svelte:head>

<main class="mx-auto min-h-screen max-w-6xl px-6 py-10">
  <section class="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN_V2.md → design/layouts/main-view.md</p>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Main View layouts</h1>
          <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Three approved page-level compositions: Coolify resource grid, split master-detail, and single-section workspace.</p>
        </div>
        <div class="flex gap-2">
          <Button variant={view === 'grid' ? 'highlighted' : 'default'} onclick={() => (view = 'grid')}>Coolify grid</Button>
          <Button variant={view === 'split' ? 'highlighted' : 'default'} onclick={() => (view = 'split')}>Split view</Button>
          <Button variant={view === 'single' ? 'highlighted' : 'default'} onclick={() => (view = 'single')}>Single section</Button>
        </div>
      </div>
    </div>

    <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
    {#if view === 'grid'}
      <div class="mx-auto w-full max-w-5xl py-4">
        <div class="mb-6">
          <h2 class="text-3xl font-bold tracking-tight text-black dark:text-white">Projects</h2>
          <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Deploy and manage applications, databases, and services.</p>
        </div>

        <Callout title="Resource grid layout">Use this layout for dashboard/index pages where the main job is choosing a resource or shortcut.</Callout>

        <div class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Coolbox href="/components/main-view" title="Production API" description="Application · 3 containers">
            <div class="mt-2"><Badge variant="success">Running</Badge></div>
          </Coolbox>
          <Coolbox href="/components/main-view" title="Postgres" description="Database · backups enabled">
            <div class="mt-2"><Badge variant="warning">Restarting</Badge></div>
          </Coolbox>
          <Coolbox href="/components/main-view" title="Redis Queue" description="Service · worker cache">
            <div class="mt-2"><Badge>Idle</Badge></div>
          </Coolbox>
          <Coolbox href="/components/main-view" title="Create resource" description="Application, database, or service" />
        </div>
      </div>
    {:else if view === 'split'}
      <div class="grid min-h-[42rem] gap-2 lg:grid-cols-[32rem_1fr]">
        <section class="rounded-sm border border-neutral-200 bg-white dark:border-coolgray-300 dark:bg-coolgray-100">
          <div class="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-coolgray-200">
            <h2 class="text-xl font-bold text-black dark:text-white">Inbox</h2>
            <div class="flex gap-2"><Button variant="highlighted">Compose</Button><Button>Refresh</Button></div>
          </div>
          <div class="border-b border-neutral-200 p-4 dark:border-coolgray-200"><Input placeholder="Search" /></div>
          <div class="space-y-2 p-4">
            <div class="rounded-sm bg-neutral-100 p-4 text-sm text-neutral-600 dark:bg-coolgray-200 dark:text-neutral-400">No SMTP messages yet. Send mail to this receiver to populate the inbox.</div>
          </div>
        </section>

        <section class="rounded-sm border border-neutral-200 bg-white p-6 dark:border-coolgray-300 dark:bg-coolgray-100">
          <div class="flex min-h-56 items-center justify-center rounded-sm bg-neutral-100 p-8 text-center dark:bg-coolgray-200">
            <div>
              <div class="mb-4 text-3xl text-neutral-500 dark:text-neutral-400">›_</div>
              <h2 class="text-2xl font-bold text-black dark:text-white">Waiting for inbound SMTP email</h2>
              <p class="mt-3 text-sm text-neutral-600 dark:text-neutral-400">Send a message to your configured mailbox route, then refresh the inbox.</p>
              <p class="mt-3 text-xs text-neutral-500 dark:text-neutral-400">In production, send mail after your DNS MX record points at this server.</p>
            </div>
          </div>
        </section>
      </div>
    {:else}
      <div class="min-h-[42rem] rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="flex size-7 items-center justify-center rounded-sm bg-cyan-100 text-sm font-bold text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">B</span>
              <h2 class="text-2xl font-bold text-black dark:text-white">Beep</h2>
              <span class="text-neutral-500 dark:text-neutral-400">•</span>
              <span class="text-2xl text-neutral-600 dark:text-neutral-400">production</span>
            </div>
            <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span>github.com/coollabs/beep:main</span>
              <span>US East (Ohio)</span>
              <span>beep.com</span>
            </div>
          </div>
          <div class="flex gap-2">
            <Button variant="highlighted">Deploy</Button>
            <Button>Visit</Button>
          </div>
        </div>

        <div class="mt-8 flex flex-col gap-8 sm:flex-row">
          <SubSidebar items={resourceSections} ariaLabel="Resource sections" />

          <div class="min-w-0 flex-1">
            <div class="min-h-[30rem] rounded-sm border border-neutral-200 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_0)] [background-size:24px_24px] p-6 dark:border-coolgray-300 dark:bg-coolgray-200 dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)]">
              <div class="grid gap-6 lg:grid-cols-3">
                <div class="space-y-3">
                  <div class="rounded-sm border border-neutral-200 bg-white p-3 hover:border-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:hover:border-warning">
                    <div class="mb-3 flex items-center justify-between text-sm font-bold text-black dark:text-white"><span>Network</span><Badge variant="success">Active</Badge></div>
                    <div class="space-y-2 text-xs text-neutral-600 dark:text-neutral-400"><div>DDoS protection</div><div>CDN</div><div>Edge caching</div></div>
                  </div>
                  <div class="rounded-sm border border-neutral-200 bg-white p-3 hover:border-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:hover:border-warning">
                    <div class="mb-3 text-sm font-bold text-black dark:text-white">Domains</div>
                    <div class="space-y-2 text-xs text-neutral-600 dark:text-neutral-400"><div>Cloud domain · enabled</div><div>Custom domain · not connected</div></div>
                  </div>
                </div>

                <div class="space-y-3">
                  <div class="rounded-sm border border-neutral-200 bg-white p-3 hover:border-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:hover:border-warning">
                    <div class="mb-3 flex items-center justify-between text-sm font-bold text-black dark:text-white"><span>App</span><Badge>Web</Badge></div>
                    <div class="space-y-2 text-xs text-neutral-600 dark:text-neutral-400"><div>Web traffic · enabled</div><div>Size · large</div></div>
                  </div>
                  <div class="rounded-sm border border-neutral-300 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-100">
                    <div class="mb-3 flex items-center justify-between text-sm font-bold text-black dark:text-white"><span>Queue worker</span><Badge>Worker</Badge></div>
                    <div class="space-y-2 text-xs text-neutral-600 dark:text-neutral-400"><div>Size · small</div><div>Auto-scaling · 2-4 replicas</div></div>
                  </div>
                </div>

                <div class="space-y-3">
                  <div class="rounded-sm border border-neutral-200 bg-white p-3 hover:border-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:hover:border-warning">
                    <div class="mb-3 flex items-center justify-between text-sm font-bold text-black dark:text-white"><span>Beep</span><Badge variant="warning">Database</Badge></div>
                    <div class="space-y-2 text-xs text-neutral-600 dark:text-neutral-400"><div>Type · Serverless Postgres</div><div>Name · main</div><div>Compute · 0.5-2.0 units</div></div>
                  </div>
                  <div class="rounded-sm border border-neutral-200 bg-white p-3 hover:border-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:hover:border-warning">
                    <div class="mb-3 flex items-center justify-between text-sm font-bold text-black dark:text-white"><span>Cache</span><Badge>KV Store</Badge></div>
                    <div class="space-y-2 text-xs text-neutral-600 dark:text-neutral-400"><div>Disk · private</div><div>Size · 1GB</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
    </div>
  </section>
</main>
