import { createFileRoute } from "@tanstack/react-router";
import { Banner } from "@/components/ui/banner";

export const Route = createFileRoute("/components/banner")({ component: Page });

function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
      <section className="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
            DESIGN.md → design/navigation/banner.md
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            Banner sample
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Page-level notices above content.
          </p>
        </div>
        <div className="space-y-3 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
          <Banner>New Coolify version is available.</Banner>
          <Banner variant="warning">Server validation is required before deployment.</Banner>
          <Banner variant="success">Backup completed successfully.</Banner>
        </div>
      </section>
    </main>
  );
}
