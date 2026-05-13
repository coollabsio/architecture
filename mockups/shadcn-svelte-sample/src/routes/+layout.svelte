<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import "../app.css";
  import { componentSamples } from "$lib/component-registry";
  import { Button } from "$lib/components/ui/button/index.js";
  import { DropdownMenu, dropdownMenuItemVariants } from "$lib/components/ui/dropdown-menu/index.js";

  let theme: "light" | "dark" = "dark";
  let selectedComponentHref = componentSamples[0]?.href ?? "/components/buttons";

  $: selectedComponent = componentSamples.find((sample) => sample.href === selectedComponentHref) ?? componentSamples[0];

  $: if (browser) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("component-sample-theme", theme);
  }

  onMount(() => {
    const stored = localStorage.getItem("component-sample-theme");
    if (stored === "light" || stored === "dark") {
      theme = stored;
    }

    const current = componentSamples.find((sample) => window.location.pathname.startsWith(sample.href));
    selectedComponentHref = current?.href ?? componentSamples[0]?.href ?? "/components/buttons";
  });

  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
  }

  async function selectComponent(href = selectedComponentHref) {
    selectedComponentHref = href;
    await goto(href);
  }
</script>

<svelte:head>
  <script>
    try {
      const theme = localStorage.getItem("component-sample-theme") || "dark";
      document.documentElement.classList.toggle("dark", theme === "dark");
    } catch {}
  </script>
</svelte:head>

<div class:dark={theme === "dark"} class="min-h-screen bg-gray-50 text-black dark:bg-base dark:text-neutral-400">
  <div class="fixed right-4 top-4 z-10 flex items-center gap-2">
    <DropdownMenu label={selectedComponent?.label ?? "Component"}>
      {#each componentSamples as sample}
        <button
          class={dropdownMenuItemVariants()}
          role="menuitem"
          aria-current={selectedComponentHref === sample.href ? "page" : undefined}
          onclick={() => selectComponent(sample.href)}
        >
          <span class="size-4 text-center">{selectedComponentHref === sample.href ? "✓" : ""}</span>
          {sample.label}
        </button>
      {/each}
    </DropdownMenu>

    <Button onclick={toggleTheme} aria-label="Toggle light and dark mode">
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  </div>

  <slot />
</div>
