<script lang="ts">
  import { TeamSwitcher } from "$lib/components/ui/sidebar-navbar/index.js";
</script>

<svelte:head><title>Coolify Team Switcher sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/navigation/sidebar-navbar.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Team Switcher sample</h1>
      <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Reusable sidebar team/workspace switcher with expanded and collapsed states.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem]">
      <section class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base" aria-labelledby="team-expanded-title">
        <h2 id="team-expanded-title" class="mb-3 text-base font-bold text-black dark:text-white">Expanded</h2>
        <div class="w-full max-w-64 rounded-sm border border-neutral-200 bg-white pt-3 text-neutral-700 dark:border-coolgray-200 dark:bg-app-base dark:text-neutral-400">
          <TeamSwitcher />
        </div>
      </section>

      <section class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base" aria-labelledby="team-collapsed-title">
        <h2 id="team-collapsed-title" class="mb-3 text-base font-bold text-black dark:text-white">Collapsed</h2>
        <div class="mx-auto w-16 rounded-sm border border-neutral-200 bg-white pt-3 text-neutral-700 dark:border-coolgray-200 dark:bg-app-base dark:text-neutral-400">
          <TeamSwitcher collapsed />
        </div>
      </section>
    </div>
  </section>
</main>
