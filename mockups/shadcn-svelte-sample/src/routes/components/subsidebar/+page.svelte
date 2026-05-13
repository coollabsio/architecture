<script lang="ts">
  import { SubSidebar, type SubSidebarItem } from "$lib/components/ui/subsidebar/index.js";

  const items: SubSidebarItem[] = [
    { label: "Documentation", href: "https://coolify.io/docs", external: true },
    { label: "General", href: "/components/subsidebar", active: true },
    { label: "Environment Variables", href: "/components/subsidebar" },
    { label: "Persistent Storages", href: "/components/subsidebar" },
    { label: "Scheduled Tasks", href: "/components/subsidebar" },
    { label: "Webhooks", href: "/components/subsidebar" },
    { label: "Resource Operations", href: "/components/subsidebar" },
    { label: "Tags", href: "/components/subsidebar" },
    { label: "Danger Zone", href: "/components/subsidebar" }
  ];
</script>

<svelte:head><title>Coolify Subsidebar sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/navigation/subsidebar.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Subsidebar sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">Secondary resource navigation based on Coolify's sub-menu pattern. Use vertical for settings/config pages and horizontal for compact top-level resource sections.</p>
    </div>

    <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
      <div>
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Vertical</h2>
        <div class="flex flex-col gap-8 rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100 sm:flex-row">
          <SubSidebar {items} ariaLabel="Service sections" />
          <div class="min-w-0 flex-1 rounded-sm border border-neutral-200 bg-neutral-100 p-4 dark:border-coolgray-300 dark:bg-coolgray-200">
            <h3 class="text-xl font-bold text-black dark:text-white">General</h3>
            <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">The selected section content renders beside the vertical subsidebar.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Horizontal</h2>
        <div class="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
          <SubSidebar {items} orientation="horizontal" ariaLabel="Resource top sections" />
          <div class="mt-4 rounded-sm border border-neutral-200 bg-neutral-100 p-4 dark:border-coolgray-300 dark:bg-coolgray-200">
            <h3 class="text-xl font-bold text-black dark:text-white">General</h3>
            <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Horizontal subsidebar stays compact and scrolls on smaller screens.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
