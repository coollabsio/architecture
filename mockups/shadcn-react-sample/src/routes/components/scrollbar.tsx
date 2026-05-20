import { createFileRoute } from "@tanstack/react-router";
import { Scrollbar } from "@/components/ui/scrollbar";

export const Route = createFileRoute("/components/scrollbar")({ component: Page });

function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
      <section className="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
            DESIGN.md → design/utilities/scrollbar.md
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            Scrollbar sample
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Compact scroll containers for logs, menus, and tables.
          </p>
        </div>
        <div className="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
          <Scrollbar className="max-h-48 rounded-sm border border-neutral-200 bg-white p-3 text-sm dark:border-coolgray-300 dark:bg-coolgray-100">
            {Array.from({ length: 24 }).map((_, i) => (
              <p
                key={i}
                className="border-b border-neutral-100 py-2 dark:border-coolgray-300"
              >
                Log line {i + 1}: deployment event message.
              </p>
            ))}
          </Scrollbar>
        </div>
      </section>
    </main>
  );
}
