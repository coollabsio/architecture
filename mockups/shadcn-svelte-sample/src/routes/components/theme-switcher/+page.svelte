<script lang="ts">
  import { ThemeSwitcher } from "$lib/components/ui/sidebar-navbar/index.js";
  import { cn } from "$lib/utils";
</script>

<svelte:head><title>Coolify Theme Switcher sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/navigation/sidebar-navbar.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Theme Switcher sample</h1>
      <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Reusable sidebar footer theme action with light, dark, and system default options.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem]">
      {#each [false, true] as collapsed}
        <section class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base" aria-labelledby={collapsed ? "theme-collapsed-title" : "theme-expanded-title"}>
          <h2 id={collapsed ? "theme-collapsed-title" : "theme-expanded-title"} class="mb-3 text-base font-bold text-black dark:text-white">{collapsed ? "Collapsed" : "Expanded"}</h2>
          <div class={cn("rounded-sm border border-neutral-200 bg-white px-2 pt-3 text-neutral-700 dark:border-coolgray-200 dark:bg-app-base dark:text-neutral-400", collapsed ? "mx-auto w-16" : "w-full max-w-64")}>
            <div class={cn("space-y-1 border-t border-neutral-200 py-3 dark:border-coolgray-200", collapsed && "flex flex-col items-center")}>
              <ThemeSwitcher {collapsed} />
            </div>
          </div>
        </section>
      {/each}
    </div>
  </section>
</main>
