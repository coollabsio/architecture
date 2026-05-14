<script lang="ts">
  import { browser } from "$app/environment";
  import { onDestroy, onMount } from "svelte";
  import "../app.css";
  import SampleToolbar from "$lib/components/sample-toolbar.svelte";

  type ThemePreference = "light" | "dark" | "system";

  let theme: ThemePreference = "dark";
  let systemTheme: "light" | "dark" = "dark";
  $: resolvedTheme = theme === "system" ? systemTheme : theme;

  $: if (browser) {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    localStorage.setItem("component-sample-theme", theme);
  }

  function toggleTheme() {
    theme = resolvedTheme === "dark" ? "light" : "dark";
  }

  function setTheme(nextTheme: ThemePreference) {
    theme = nextTheme;
  }

  function handleThemeChange(event: Event) {
    const nextTheme = (event as CustomEvent<{ theme: ThemePreference }>).detail?.theme;
    if (nextTheme === "light" || nextTheme === "dark" || nextTheme === "system") {
      setTheme(nextTheme);
    }
  }

  onMount(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      systemTheme = media.matches ? "dark" : "light";
    };

    syncSystemTheme();

    const stored = localStorage.getItem("component-sample-theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      theme = stored;
    }

    media.addEventListener("change", syncSystemTheme);
    window.addEventListener("component-sample-theme-toggle", toggleTheme);
    window.addEventListener("component-sample-theme-change", handleThemeChange);

    return () => {
      media.removeEventListener("change", syncSystemTheme);
      window.removeEventListener("component-sample-theme-toggle", toggleTheme);
      window.removeEventListener("component-sample-theme-change", handleThemeChange);
    };
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("component-sample-theme-toggle", toggleTheme);
      window.removeEventListener("component-sample-theme-change", handleThemeChange);
    }
  });
</script>

<svelte:head>
  <meta property="og:title" content="coolLabs: Design" />
  <meta property="og:site_name" content="coolLabs: Design" />
  <meta property="og:description" content="because why not...." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:image:width" content="1024" />
  <meta property="og:image:height" content="512" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="coolLabs: Design" />
  <meta name="twitter:description" content="because why not...." />
  <meta name="twitter:image" content="/og-image.png" />
  <script>
    try {
      const theme = localStorage.getItem("component-sample-theme") || "dark";
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", theme === "dark" || (theme === "system" && systemDark));
    } catch {}
  </script>
</svelte:head>

<div class:dark={resolvedTheme === "dark"} class="min-h-screen bg-gray-50 text-black dark:bg-app-base dark:text-neutral-400">
  <SampleToolbar bind:theme />
  <div class="sm:pt-24 sm:[&>main]:min-h-[calc(100vh-6rem)]">
    <slot />
  </div>
</div>
