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

<div data-slot="table" class="overflow-hidden rounded-sm border border-border bg-card">
  <div class="overflow-x-auto">
    <table class="w-full min-w-[42rem] text-left text-sm">
      <thead class="border-b border-border bg-muted text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <tr><th class="px-3 py-2">Name</th><th class="px-3 py-2">Type</th><th class="px-3 py-2">Status</th><th class="px-3 py-2">Server</th><th class="px-3 py-2">Updated</th><th class="px-3 py-2 text-right">Actions</th></tr>
      </thead>
      <tbody class="divide-y divide-border">
        {#each rows as row}
          <tr class="hover:bg-muted">
            <td class="px-3 py-2 font-medium text-foreground">{row.name}</td>
            <td class="px-3 py-2 text-muted-foreground">{row.type}</td>
            <td class="px-3 py-2"><Badge variant={row.status === "Running" ? "success" : row.status === "Restarting" ? "warning" : "default"}>{row.status}</Badge></td>
            <td class="px-3 py-2 text-muted-foreground">{row.server}</td>
            <td class="px-3 py-2 text-muted-foreground">{row.updated}</td>
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
      <div class="flex justify-between gap-4"><dt class="text-muted-foreground">Type</dt><dd class="font-medium text-foreground">{selectedRow.type}</dd></div>
      <div class="flex justify-between gap-4"><dt class="text-muted-foreground">Status</dt><dd><Badge variant={selectedRow.status === "Running" ? "success" : selectedRow.status === "Restarting" ? "warning" : "default"}>{selectedRow.status}</Badge></dd></div>
      <div class="flex justify-between gap-4"><dt class="text-muted-foreground">Server</dt><dd class="font-medium text-foreground">{selectedRow.server}</dd></div>
      <div class="flex justify-between gap-4"><dt class="text-muted-foreground">Updated</dt><dd class="font-medium text-foreground">{selectedRow.updated}</dd></div>
    </dl>
  {/if}
  <svelte:fragment slot="footer">
    <Button onclick={() => (modalOpen = false)}>Close</Button>
  </svelte:fragment>
</DialogModal>
