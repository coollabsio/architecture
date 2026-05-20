import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/page-loading")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Page loading / skeleton sample"
      designDoc="DESIGN.md → design/feedback/page-loading.md"
      description="Use skeletons for page content and spinner for short blocking actions."
    >
      <div className="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <Spinner />
          Loading resources
        </div>
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-24 w-full" />
        <div className="grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>
    </Showcase>
  );
}
