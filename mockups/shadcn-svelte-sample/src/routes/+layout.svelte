<script lang="ts">
  import { browser } from "$app/environment";
  import { onDestroy, onMount } from "svelte";
  import "../app.css";
  import SampleToolbar from "$lib/components/sample-toolbar.svelte";

  let theme: "light" | "dark" = "dark";

  $: if (browser) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("component-sample-theme", theme);
  }

  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
  }

  onMount(() => {
    const stored = localStorage.getItem("component-sample-theme");
    if (stored === "light" || stored === "dark") {
      theme = stored;
    }

    window.addEventListener("component-sample-theme-toggle", toggleTheme);
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("component-sample-theme-toggle", toggleTheme);
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
      document.documentElement.classList.toggle("dark", theme === "dark");
    } catch {}
  </script>
</svelte:head>

<div class:dark={theme === "dark"} class="min-h-screen bg-gray-50 text-black dark:bg-app-base dark:text-neutral-400">
  <SampleToolbar bind:theme />
  <div class="sm:pt-24 sm:[&>main]:min-h-[calc(100vh-6rem)]">
    <slot />
  </div>
</div>
