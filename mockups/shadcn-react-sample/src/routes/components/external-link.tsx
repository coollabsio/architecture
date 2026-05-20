import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "@/components/ui/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/components/external-link")({ component: Page });

function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
      <section className="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
            DESIGN.md → design/navigation/external-link.md
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            External Link sample
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Anchor with external icon, new-tab attrs, and focus ring.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>External destinations show the arrow icon.</CardDescription>
          </CardHeader>
          <div className="flex flex-col items-start gap-2 p-4 pt-0">
            <ExternalLink href="https://coolify.io/docs">Coolify docs</ExternalLink>
            <ExternalLink href="https://ui.shadcn.com/docs">shadcn/ui docs</ExternalLink>
          </div>
        </Card>
      </section>
    </main>
  );
}
