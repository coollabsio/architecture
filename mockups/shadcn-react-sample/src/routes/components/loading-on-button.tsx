import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/loading-on-button")({ component: Page });

function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <Showcase
      title="Loading On Button sample"
      designDoc="DESIGN.md → design/feedback/loading-on-button.md"
      description="This is covered in Button, but separated here for accessibility and composition guidance."
    >
      <div className="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
        <div className="flex flex-wrap gap-2">
          <Button disabled={loading} aria-busy={loading ? "true" : undefined}>
            {loading ? "Saving" : "Save"}
            {loading && <Spinner />}
          </Button>

          <Button
            variant="highlighted"
            disabled={loading}
            aria-busy={loading ? "true" : undefined}
          >
            {loading ? "Deploying" : "Deploy"}
            {loading && <Spinner />}
          </Button>

          <Button
            variant="destructive"
            disabled={loading}
            aria-busy={loading ? "true" : undefined}
          >
            {loading ? "Removing" : "Remove"}
            {loading && <Spinner />}
          </Button>

          <Button
            size="icon"
            disabled={loading}
            aria-busy={loading ? "true" : undefined}
            aria-label={loading ? "Refreshing" : "Refresh"}
          >
            {loading ? (
              <Spinner />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M16 8h5V3" />
              </svg>
            )}
          </Button>
        </div>

        <label className="flex items-center gap-2 text-sm text-black dark:text-white">
          <input
            type="checkbox"
            checked={loading}
            onChange={(e) => setLoading(e.target.checked)}
          />
          loading flag: {loading ? "true" : "false"}
        </label>
      </div>
    </Showcase>
  );
}
