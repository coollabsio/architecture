<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { DialogModal } from "$lib/components/ui/modal/index.js";

  const rows = [
    { name: "Production API", type: "Application", status: "Running", server: "fsn-01", updated: "2m ago" },
    { name: "Postgres", type: "Database", status: "Restarting", server: "fsn-01", updated: "8m ago" },
    { name: "Redis Queue", type: "Service", status: "Idle", server: "hel-02", updated: "1h ago" }
  ];

  type Row = (typeof rows)[number];

  let modalOpen = false;
  let selectedRow: Row | null = null;

  function openRow(row: Row) {
    selectedRow = row;
    modalOpen = true;
  }
</script>

<div class="overflow-hidden rounded-sm border border-neutral-200 bg-white dark:border-coolgray-300 dark:bg-coolgray-100">
  <div class="overflow-x-auto">
    <table class="w-full min-w-[42rem] text-left text-sm">
      <thead class="border-b border-neutral-200 bg-neutral-100 text-xs font-bold uppercase tracking-wide text-neutral-600 dark:border-coolgray-300 dark:bg-coolgray-200 dark:text-neutral-400">
        <tr><th class="px-3 py-2">Name</th><th class="px-3 py-2">Type</th><th class="px-3 py-2">Status</th><th class="px-3 py-2">Server</th><th class="px-3 py-2">Updated</th><th class="px-3 py-2 text-right">Actions</th></tr>
      </thead>
      <tbody class="divide-y divide-neutral-200 dark:divide-coolgray-300">
        {#each rows as row}
          <tr class="hover:bg-neutral-100 dark:hover:bg-coolgray-200">
            <td class="px-3 py-2 font-medium text-black dark:text-white">{row.name}</td>
            <td class="px-3 py-2 text-neutral-600 dark:text-neutral-400">{row.type}</td>
            <td class="px-3 py-2"><Badge variant={row.status === "Running" ? "success" : row.status === "Restarting" ? "warning" : "default"}>{row.status}</Badge></td>
            <td class="px-3 py-2 text-neutral-600 dark:text-neutral-400">{row.server}</td>
            <td class="px-3 py-2 text-neutral-600 dark:text-neutral-400">{row.updated}</td>
            <td class="px-3 py-2 text-right"><Button size="sm" onclick={() => openRow(row)}>Open</Button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>


<DialogModal bind:open={modalOpen} title={selectedRow ? selectedRow.name : "Resource"} description="Temporary table opener modal for testing.">
  {#if selectedRow}
    <dl class="grid gap-2 text-sm">
      <div class="flex justify-between gap-4"><dt class="text-neutral-600 dark:text-neutral-400">Type</dt><dd class="font-medium text-black dark:text-white">{selectedRow.type}</dd></div>
      <div class="flex justify-between gap-4"><dt class="text-neutral-600 dark:text-neutral-400">Status</dt><dd><Badge variant={selectedRow.status === "Running" ? "success" : selectedRow.status === "Restarting" ? "warning" : "default"}>{selectedRow.status}</Badge></dd></div>
      <div class="flex justify-between gap-4"><dt class="text-neutral-600 dark:text-neutral-400">Server</dt><dd class="font-medium text-black dark:text-white">{selectedRow.server}</dd></div>
      <div class="flex justify-between gap-4"><dt class="text-neutral-600 dark:text-neutral-400">Updated</dt><dd class="font-medium text-black dark:text-white">{selectedRow.updated}</dd></div>
    </dl>
  {/if}
  <svelte:fragment slot="footer">
    <Button onclick={() => (modalOpen = false)}>Close</Button>
  </svelte:fragment>
</DialogModal>
