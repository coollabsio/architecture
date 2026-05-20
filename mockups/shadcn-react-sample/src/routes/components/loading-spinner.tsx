import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/loading-spinner")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Loading Spinner sample"
      designDoc="DESIGN.md → design/feedback/loading-spinner.md"
      description="Compact SVG spinner for inline loading states."
    >
      <Card aria-busy>
        <CardHeader>
          <CardTitle>Loading deployment logs</CardTitle>
          <CardDescription>Spinner remains size-4 and visible in dark mode.</CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
          <Spinner /> Fetching logs…
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Spinner className="size-3" />
          <Spinner />
          <Spinner className="size-5" />
        </div>
      </Card>
    </Showcase>
  );
}
