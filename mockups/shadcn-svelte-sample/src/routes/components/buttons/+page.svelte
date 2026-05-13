<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<svelte:head>
  <title>Coolify Button sample</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/forms/button.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Button sample</h1>
      <p class="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
        Focused Shadcn-Svelte primitive extension from DESIGN.md and the migrated Coolify Button spec.
        Use the top-right controls to switch components and test light/dark mode.
      </p>
    </div>

    <div class="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
      <div>
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Variants</h2>
        <div class="flex flex-wrap items-center gap-2">
          <Button>Default</Button>
          <Button variant="highlighted">Highlighted</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link variant</Button>
        </div>
      </div>

      <div>
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">States</h2>
        <div class="flex flex-wrap items-center gap-2">
          <Button disabled>Disabled</Button>
          <Button disabled aria-busy="true">
            Saving
            <Spinner />
          </Button>
          <Button size="icon" aria-label="Refresh service status">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M16 8h5V3" />
            </svg>
          </Button>
        </div>
      </div>

      <div>
        <h2 class="mb-2 text-base font-bold text-black dark:text-white">Special icon case: external link</h2>
        <a
          href="https://www.shadcn-svelte.com/docs/components/button"
          class={buttonVariants({ variant: "default" })}
        >
          Shadcn-Svelte Button docs
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>

      <div class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
        <h2 class="mb-1 text-base font-bold text-black dark:text-white">Spec notes</h2>
        <ul class="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Base button uses h-8, px-2, gap-2, text-sm, font-medium, rounded-sm, cursor-pointer.</li>
          <li>Focus ring uses coollabs in light mode and warning in dark mode.</li>
          <li>Loading spinner inherits text in light mode and uses dark:text-warning.</li>
          <li>Normal text buttons do not use icons by default.</li>
          <li>Icons are reserved for icon-only buttons, loading spinners, external links, or rare domain-specific actions.</li>
          <li>Disabled/loading buttons stay readable with neutral backgrounds and text.</li>
          <li>No legacy boolean styling attributes; variants are Shadcn-style props.</li>
        </ul>
      </div>
    </div>
  </section>
</main>
