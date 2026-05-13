<script lang="ts">
  import {
    DropdownMenu,
    dropdownMenuItemVariants,
    dropdownMenuSeparatorClass
  } from "$lib/components/ui/dropdown-menu/index.js";
</script>

<svelte:head>
  <title>Coolify V2 Dropdown sample</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN_V2.md → design/forms/dropdown.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Dropdown sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
        Focused Shadcn-Svelte Dropdown Menu primitive extension with compact content, dense items,
        touch rows, disabled state, and destructive action styling.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-[1fr_16rem]">
      <div class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
        <div class="mb-3 flex items-center justify-between gap-2">
          <div>
            <h2 class="text-base font-bold text-black dark:text-white">Service actions</h2>
            <p class="text-xs text-neutral-600 dark:text-neutral-400">Open the menu to inspect item density and states.</p>
          </div>

          <DropdownMenu label="Actions" align="end">
            <button class={dropdownMenuItemVariants()} role="menuitem">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M16 8h5V3" />
              </svg>
              Restart
            </button>
            <button class={dropdownMenuItemVariants()} role="menuitem">Redeploy</button>
            <button class={dropdownMenuItemVariants({ size: "touch" })} role="menuitem">Touch-sized deploy with cache</button>
            <button class={dropdownMenuItemVariants()} role="menuitem" disabled data-disabled="true">Rollback unavailable</button>
            <div class={dropdownMenuSeparatorClass}></div>
            <button class={dropdownMenuItemVariants({ variant: "danger" })} role="menuitem">Stop service</button>
          </DropdownMenu>
        </div>

        <div class="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
          <div class="flex items-center justify-between rounded-sm border border-neutral-200 bg-white px-2 py-2 dark:border-coolgray-300 dark:bg-coolgray-100">
            <span class="font-bold text-black dark:text-white">api-production</span>
            <span class="text-green-700 dark:text-green-400">running</span>
          </div>
          <div class="flex items-center justify-between rounded-sm border border-neutral-200 bg-white px-2 py-2 dark:border-coolgray-300 dark:bg-coolgray-100">
            <span class="font-bold text-black dark:text-white">Last deploy</span>
            <span>2 minutes ago</span>
          </div>
        </div>
      </div>

      <aside class="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Spec notes</h2>
        <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Content uses p-1, border, shadow-sm, rounded-sm.</li>
          <li>Default items use text-xs, py-1, pl-2, pr-4, gap-2.</li>
          <li>Touch item uses min-h-10, px-3, py-2, text-sm.</li>
          <li>Dark hover/focus uses the documented purple fill exception.</li>
          <li>Disabled item uses pointer-events-none and opacity-50.</li>
        </ul>
      </aside>
    </div>
  </section>
</main>
