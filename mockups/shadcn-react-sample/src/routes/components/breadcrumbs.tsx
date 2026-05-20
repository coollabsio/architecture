import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/components/breadcrumbs")({ component: Page });

function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
      <section className="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
            DESIGN.md → design/navigation/breadcrumbs.md
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            Breadcrumbs sample
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Compact hierarchy navigation.
          </p>
        </div>
        <Card>
          <CardHeader>
            <Breadcrumbs
              items={[
                { label: "Projects", href: "/pages/main-view" },
                { label: "coolify-cloud", href: "/pages/main-view" },
                { label: "API" }
              ]}
            />
            <CardTitle>API service</CardTitle>
            <CardDescription>Current crumb uses aria-current page.</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </main>
  );
}
