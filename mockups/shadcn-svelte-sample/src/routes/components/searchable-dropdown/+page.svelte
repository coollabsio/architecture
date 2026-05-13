<script lang="ts">
  import { SearchableDropdown, type SearchableDropdownOption } from "$lib/components/ui/searchable-dropdown/index.js";

  let value = "production";
  const options: SearchableDropdownOption[] = [
    { label: "Production", value: "production", description: "Main live environment" },
    { label: "Staging", value: "staging", description: "Pre-production testing" },
    { label: "Preview PR-128", value: "preview-pr-128", description: "Temporary pull request environment" },
    { label: "Development", value: "development", description: "Internal developer environment" },
    { label: "Disaster recovery", value: "dr", description: "Secondary region failover" }
  ];
</script>

<svelte:head><title>Coolify Searchable Dropdown sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/forms/searchable-dropdown.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Searchable dropdown sample</h1>
      <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Combobox-style dropdown for longer option lists.</p>
    </div>
    <div class="space-y-3 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
      <SearchableDropdown bind:value {options} placeholder="Select environment" searchPlaceholder="Search environments..." />
      <p class="text-sm text-neutral-600 dark:text-neutral-400">Selected value: <span class="font-mono text-black dark:text-white">{value}</span></p>
    </div>
  </section>
</main>
