import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge, type BadgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/table")({ component: Page });

type Row = {
  name: string;
  type: string;
  status: "Running" | "Restarting" | "Idle";
  server: string;
  updated: string;
};

const rows: Row[] = [
  { name: "Production API", type: "Application", status: "Running", server: "fsn-01", updated: "2m ago" },
  { name: "Postgres", type: "Database", status: "Restarting", server: "fsn-01", updated: "8m ago" },
  { name: "Redis Queue", type: "Service", status: "Idle", server: "hel-02", updated: "1h ago" }
];

function statusVariant(status: Row["status"]): BadgeVariants["variant"] {
  if (status === "Running") return "success";
  if (status === "Restarting") return "warning";
  return "default";
}

function Page() {
  const [selected, setSelected] = useState<Row | null>(null);

  return (
    <Showcase
      title="Table sample"
      designDoc="DESIGN.md → design/data/table.md"
      description="Dense resource table with hover rows, badges, actions, and horizontal overflow."
    >
      <div className="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
        <div className="overflow-hidden rounded-sm border border-neutral-200 bg-white dark:border-coolgray-300 dark:bg-coolgray-100">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Server</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium text-black dark:text-white">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                    </TableCell>
                    <TableCell>{row.server}</TableCell>
                    <TableCell>{row.updated}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => setSelected(row)}>
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.name ?? "Resource"}</DialogTitle>
            <DialogDescription>Temporary table opener modal for testing.</DialogDescription>
          </DialogHeader>
          {selected && (
            <dl className="grid gap-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-600 dark:text-neutral-400">Type</dt>
                <dd className="font-medium text-black dark:text-white">{selected.type}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-600 dark:text-neutral-400">Status</dt>
                <dd>
                  <Badge variant={statusVariant(selected.status)}>{selected.status}</Badge>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-600 dark:text-neutral-400">Server</dt>
                <dd className="font-medium text-black dark:text-white">{selected.server}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-600 dark:text-neutral-400">Updated</dt>
                <dd className="font-medium text-black dark:text-white">{selected.updated}</dd>
              </div>
            </dl>
          )}
          <DialogFooter>
            <Button onClick={() => setSelected(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Showcase>
  );
}
