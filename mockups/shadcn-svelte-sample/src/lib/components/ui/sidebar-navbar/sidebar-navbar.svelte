<script lang="ts">
  import { base } from "$app/paths";
  import { Kbd } from "$lib/components/ui/kbd/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import type { SidebarNavItem } from "./index.js";
  import { cn } from "$lib/utils";
  import TeamSwitcher from "./team-switcher.svelte";
  import ThemeSwitcher from "./theme-switcher.svelte";
  import { SettingsIcon } from "$lib/components/ui/icons/index.js";

  export let collapsed = false;
  export let items: SidebarNavItem[] = [
    { label: "Dashboard", href: `${base}/components/sidebar-navbar` },
    { label: "Projects", href: `${base}/components/sidebar-navbar`, active: true },
    { label: "Servers", href: `${base}/components/sidebar-navbar` },
    { label: "Sources", href: `${base}/components/sidebar-navbar` },
    { label: "Destinations", href: `${base}/components/sidebar-navbar` },
    { label: "S3 Storages", href: `${base}/components/sidebar-navbar` },
    { label: "Shared variables", href: `${base}/components/sidebar-navbar`, badge: "2" }
  ];

  const iconPaths = [
    "M3 12l9-8 9 8v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
    "M12 4 4 8l8 4 8-4-8-4Zm-8 8 8 4 8-4M4 16l8 4 8-4",
    "M4 6h16v5H4zM4 13h10v5H4zM18 14l-2 3h3l-2 3",
    "M7 7h10v10H7zM4 4l3 3M20 4l-3 3M4 20l3-3M20 20l-3-3",
    "M4 6l6-3 6 3 4-2v14l-4 2-6-3-6 3V6z",
    "M4 7c0-2 16-2 16 0s-16 2-16 0Zm0 0v10c0 2 16 2 16 0V7M4 12c0 2 16 2 16 0",
    "M5 6h14M5 12h14M5 18h14"
  ];

</script>

<aside class={cn("relative flex min-h-[34rem] flex-col border-r border-neutral-300 bg-white px-2 text-neutral-700 transition-all dark:border-coolgray-200 dark:bg-app-base dark:text-neutral-400", collapsed ? "w-16" : "w-64")}>
  <div class={cn("flex items-start gap-2 px-2 pb-4 pt-6", collapsed && "flex-col items-center px-0")}>
    {#if collapsed}
      <div class="flex flex-col items-center gap-0.5">
        <a href={`${base}/components/sidebar-navbar`} class="grid size-8 place-items-center rounded-sm text-lg font-bold text-black hover:opacity-80 dark:text-white" title="Coolify" aria-label="Coolify">C</a>
        <p class="max-w-12 truncate text-center text-[10px] leading-[0.875rem] text-neutral-500 dark:text-neutral-400" title="v4.0.0">v4.0.0</p>
      </div>
    {:else}
      <div class="min-w-0 flex-1">
        <a href={`${base}/components/sidebar-navbar`} class="block truncate text-2xl font-bold tracking-tight text-black hover:opacity-80 dark:text-white">Coolify</a>
        <p class="text-[10px] text-neutral-500 dark:text-neutral-400">v4.0.0</p>
      </div>
    {/if}
  </div>

  <button
    type="button"
    class="absolute -right-3 top-8 z-10 grid size-6 place-items-center rounded-full border border-neutral-300 bg-white text-black shadow-sm hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-200 dark:bg-app-base dark:text-warning dark:hover:bg-coolgray-100 dark:focus-visible:ring-warning"
    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    aria-expanded={!collapsed}
    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    onclick={() => (collapsed = !collapsed)}
  >
    <svg class={cn("size-3.5 transition-transform", collapsed && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18 9 12l6-6" /></svg>
  </button>

  {#if !collapsed}
    <div class="px-2 pb-4">
      <button type="button" class="inline-flex h-8 w-full items-center justify-between gap-1.5 rounded-sm border border-neutral-300 bg-neutral-100 px-2.5 text-sm hover:bg-neutral-200 dark:border-coolgray-200 dark:bg-coolgray-100 dark:hover:bg-coolgray-200">
        <span class="inline-flex items-center gap-1.5"><svg class="size-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m21 21-4.35-4.35"/><circle cx="11" cy="11" r="7"/></svg>Search</span>
        <Kbd>/</Kbd>
      </button>
    </div>
  {/if}


  <TeamSwitcher {collapsed} />

  <nav aria-label="Primary" class="flex-1 overflow-hidden">
    <ul class="flex flex-col gap-1.5">
      {#each items as item, i}
        <li>
          <a href={item.href} title={item.label} aria-current={item.active ? "page" : undefined} class={cn("flex min-h-7 w-full min-w-0 items-center gap-3 truncate rounded-sm px-2 py-1 text-sm hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs dark:hover:bg-coolgray-100 dark:hover:text-white dark:focus-visible:ring-warning", item.active && "bg-neutral-200 text-black dark:bg-coolgray-200 dark:text-warning", collapsed && "mx-auto size-8 justify-center gap-0 px-0 py-0")}>
            <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={iconPaths[i]} /></svg>
            {#if !collapsed}
              <span class="min-w-0 flex-1 truncate">{item.label}</span>
              {#if item.badge}<Badge variant="warning">{item.badge}</Badge>{/if}
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <div class={cn("space-y-1 border-t border-neutral-200 py-3 dark:border-coolgray-200", collapsed && "flex flex-col items-center")}>
    <ThemeSwitcher {collapsed} />
    <a href={`${base}/components/sidebar-navbar`} class={cn("flex min-h-7 items-center gap-3 rounded-sm px-2 py-1 text-sm hover:bg-neutral-100 hover:text-black dark:hover:bg-coolgray-100 dark:hover:text-white", collapsed && "size-8 justify-center px-0 py-0")} title="Settings">
      <SettingsIcon />
      {#if !collapsed}<span>Settings</span>{/if}
    </a>
  </div>
</aside>
