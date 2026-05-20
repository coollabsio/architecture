import { createFileRoute } from "@tanstack/react-router";
import { HighlightedText, RequiredAsterisk } from "@/components/ui/highlighted-text";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/components/highlighted-text")({ component: Page });

function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
      <section className="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
            DESIGN.md → design/text/highlighted-text.md
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            Highlighted text / required asterisk sample
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Inline emphasis and required field marker.
          </p>
        </div>
        <div className="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            Use <HighlightedText>production</HighlightedText> for compact inline emphasis.
          </p>
          <label className="block text-sm font-medium text-black dark:text-white" htmlFor="required-demo">
            Environment name <RequiredAsterisk />
          </label>
          <Input id="required-demo" placeholder="production" />
        </div>
      </section>
    </main>
  );
}
