import { Skeleton } from "./skeleton";
import { Spinner } from "./spinner";

export function PageLoading({ label = "Loading..." }: { label?: string }) {
  return (
    <div
      data-slot="page-loading"
      className="flex items-center gap-2 text-sm text-muted-foreground"
    >
      <Spinner />
      <span>{label}</span>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div data-slot="page-skeleton" className="space-y-4">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-24 w-full" />
      <div className="grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    </div>
  );
}
