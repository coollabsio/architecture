<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { componentSamples, pageSamples } from "$lib/component-registry";
  import { Button } from "$lib/components/ui/button/index.js";
  import { SearchableDropdown, type SearchableDropdownOption } from "$lib/components/ui/searchable-dropdown/index.js";

  export let theme: "light" | "dark" | "system" = "dark";

  let selectedComponentHref = "";
  let selectedPageHref = "";

  $: selectedComponent = componentSamples.find((sample) => sample.href === selectedComponentHref);
  $: selectedPage = pageSamples.find((sample) => sample.href === selectedPageHref);
  $: componentOptions = componentSamples.map((sample) => ({
    label: sample.label,
    value: sample.href,
    description: sample.designDoc
  })) satisfies SearchableDropdownOption[];
  $: pageOptions = pageSamples.map((sample) => ({
    label: sample.label,
    value: sample.href,
    description: sample.designDoc
  })) satisfies SearchableDropdownOption[];

  onMount(() => {
    syncSelection(window.location.pathname);
  });

  function syncSelection(path: string) {
    const currentComponent =
      componentSamples.find((sample) => path === sample.href) ??
      componentSamples.find((sample) => path.startsWith(`${sample.href}/`));
    const currentPage =
      pageSamples.find((sample) => path === sample.href) ??
      pageSamples.find((sample) => path.startsWith(`${sample.href}/`));
    selectedComponentHref = currentComponent?.href ?? "";
    selectedPageHref = currentPage?.href ?? "";
  }

  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
  }

  async function selectComponent(href: string) {
    selectedComponentHref = href;
    selectedPageHref = "";
    await goto(href);
  }

  async function selectPage(href: string) {
    selectedPageHref = href;
    selectedComponentHref = "";
    await goto(href);
  }

  function selectComponentOption(option: SearchableDropdownOption) {
    void selectComponent(option.value);
  }

  function selectPageOption(option: SearchableDropdownOption) {
    void selectPage(option.value);
  }
</script>

<div class="relative z-10 grid w-full grid-cols-1 items-end gap-2 border-b border-neutral-200 bg-gray-50 p-4 dark:border-coolgray-200 dark:bg-app-base sm:fixed sm:right-4 sm:top-4 sm:w-[min(56rem,calc(100vw-2rem))] sm:grid-cols-[minmax(14rem,1fr)_minmax(14rem,1fr)_auto] sm:border-b-0 sm:bg-transparent sm:p-0">
  <div class="space-y-1">
    <div class="flex items-center justify-between gap-2 px-1">
      <span class="text-[0.7rem] font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Components</span>
      <span class="hidden truncate text-[0.7rem] text-neutral-500 dark:text-neutral-500 sm:block">Reusable primitives</span>
    </div>
    <SearchableDropdown
      class="max-w-none"
      bind:value={selectedComponentHref}
      options={componentOptions}
      placeholder={selectedComponent?.label ?? "Choose component"}
      searchPlaceholder="Search components..."
      emptyText="No component found."
      onselect={selectComponentOption}
    />
  </div>

  <div class="space-y-1">
    <div class="flex items-center justify-between gap-2 px-1">
      <span class="text-[0.7rem] font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Pages</span>
      <span class="hidden truncate text-[0.7rem] text-neutral-500 dark:text-neutral-500 sm:block">Complex layouts</span>
    </div>
    <SearchableDropdown
      class="max-w-none"
      bind:value={selectedPageHref}
      options={pageOptions}
      placeholder={selectedPage?.label ?? "Choose page"}
      searchPlaceholder="Search pages..."
      emptyText="No page found."
      onselect={selectPageOption}
    />
  </div>

  <div class="space-y-1">
    <span class="block px-1 text-[0.7rem] font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Theme</span>
    <Button class="w-full whitespace-nowrap sm:w-auto" onclick={toggleTheme} aria-label="Toggle light and dark mode">
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  </div>
</div>
