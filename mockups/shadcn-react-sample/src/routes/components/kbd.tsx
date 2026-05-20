import { createFileRoute } from "@tanstack/react-router";
import { Kbd } from "@/components/ui/kbd";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/components/kbd")({ component: Page });

function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
      <section className="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
            DESIGN.md → design/text/kbd.md
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            KBD sample
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Compact keyboard hints for shortcuts.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Shortcuts</CardTitle>
            <CardDescription>Use semantic kbd elements with mono text.</CardDescription>
          </CardHeader>
          <div className="space-y-2 p-4 pt-0 text-sm text-black dark:text-white">
            <div className="flex items-center justify-between">
              <span>Open command palette</span>
              <span className="flex items-center gap-1">
                <Kbd>⌘</Kbd>
                <span>+</span>
                <Kbd>K</Kbd>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Close dialog</span>
              <Kbd>Esc</Kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Save form</span>
              <span className="flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <span>+</span>
                <Kbd>S</Kbd>
              </span>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
