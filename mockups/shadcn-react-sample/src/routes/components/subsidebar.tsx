import { createFileRoute } from "@tanstack/react-router";
import { Subsidebar, type SubsidebarItem } from "@/components/ui/sidebar-navbar";

export const Route = createFileRoute("/components/subsidebar")({ component: Page });

const items: SubsidebarItem[] = [
  { label: "Documentation", to: "https://coolify.io/docs", external: true },
  { label: "General", to: "/components/subsidebar", active: true },
  { label: "Environment Variables", to: "/components/subsidebar" },
  { label: "Persistent Storages", to: "/components/subsidebar" },
  { label: "Scheduled Tasks", to: "/components/subsidebar" },
  { label: "Webhooks", to: "/components/subsidebar" },
  { label: "Resource Operations", to: "/components/subsidebar" },
  { label: "Tags", to: "/components/subsidebar" },
  { label: "Danger Zone", to: "/components/subsidebar" }
];

function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-10">
      <section className="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
            DESIGN.md → design/navigation/subsidebar.md
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            Subsidebar sample
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
            Secondary resource navigation based on Coolify's sub-menu pattern. Use vertical for
            settings/config pages and horizontal for compact top-level resource sections.
          </p>
        </div>

        <div className="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
          <div>
            <h2 className="mb-2 text-base font-bold text-black dark:text-white">Vertical</h2>
            <div className="flex flex-col gap-8 rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100 sm:flex-row">
              <Subsidebar items={items} ariaLabel="Service sections" />
              <div className="min-w-0 flex-1 rounded-sm border border-neutral-200 bg-neutral-100 p-4 dark:border-coolgray-300 dark:bg-coolgray-200">
                <h3 className="text-xl font-bold text-black dark:text-white">General</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  The selected section content renders beside the vertical subsidebar.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-base font-bold text-black dark:text-white">Horizontal</h2>
            <div className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
              <Subsidebar items={items} orientation="horizontal" ariaLabel="Resource top sections" />
              <div className="mt-4 rounded-sm border border-neutral-200 bg-neutral-100 p-4 dark:border-coolgray-300 dark:bg-coolgray-200">
                <h3 className="text-xl font-bold text-black dark:text-white">General</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Horizontal subsidebar stays compact and scrolls on smaller screens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
