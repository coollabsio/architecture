<script lang="ts">
  import { browser } from "$app/environment";
  import { cn } from "$lib/utils";

  type ThemePreference = "light" | "system" | "dark";

  export let collapsed = false;

  let selectedTheme: ThemePreference = "dark";

  if (browser) {
    const stored = localStorage.getItem("component-sample-theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      selectedTheme = stored;
    }
  }

  const themeOptions: { value: ThemePreference; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "system", label: "System default" },
    { value: "dark", label: "Dark" }
  ];

  function setTheme(theme: ThemePreference) {
    selectedTheme = theme;
    window.dispatchEvent(new CustomEvent("component-sample-theme-change", { detail: { theme } }));
  }

  function cycleTheme() {
    setTheme(selectedTheme === "light" ? "system" : selectedTheme === "system" ? "dark" : "light");
  }
</script>

<div class={cn("w-full", collapsed && "w-8")}>
  {#if collapsed}
    <button
      type="button"
      class="flex size-8 items-center justify-center rounded-sm hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs dark:hover:bg-coolgray-100 dark:hover:text-white dark:focus-visible:ring-warning"
      title="Theme: {themeOptions.find((option) => option.value === selectedTheme)?.label}. Click to change."
      aria-label="Cycle theme: light, system default, dark"
      onclick={cycleTheme}
    >
      {#if selectedTheme === "light"}
        <svg class="size-4 shrink-0 text-coollabs dark:text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      {:else if selectedTheme === "system"}
        <svg class="size-4 shrink-0 text-coollabs dark:text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M9 20h6M12 16v4"/></svg>
      {:else}
        <svg class="size-4 shrink-0 text-coollabs dark:text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      {/if}
    </button>
  {:else}
    <div class="flex min-h-7 w-full items-center gap-3 rounded-sm px-2 py-1 text-sm hover:bg-neutral-100 hover:text-black dark:hover:bg-coolgray-100 dark:hover:text-white">
      <span class="shrink-0">Theme</span>
      <div class="ml-auto inline-grid grid-cols-3 rounded-sm border border-neutral-200 bg-neutral-100 p-0.5 dark:border-coolgray-300 dark:bg-coolgray-200" role="radiogroup" aria-label="Theme preference">
        {#each themeOptions as option}
          <button
            type="button"
            role="radio"
            aria-checked={selectedTheme === option.value}
            title={option.label}
            aria-label={option.label}
            class={cn("grid size-6 place-items-center rounded-sm text-neutral-600 transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:text-white dark:focus-visible:ring-warning", selectedTheme === option.value && "bg-white text-coollabs shadow-sm dark:bg-app-base dark:text-warning")}
            onclick={() => setTheme(option.value)}
          >
            {#if option.value === "light"}
              <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            {:else if option.value === "system"}
              <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M9 20h6M12 16v4"/></svg>
            {:else}
              <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
