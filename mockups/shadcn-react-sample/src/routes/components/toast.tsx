import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/toast")({ component: Page });

type Variant = "default" | "success" | "warning" | "error";

const ICON: Record<Variant, string> = {
  default: "i",
  success: "✓",
  warning: "!",
  error: "×"
};

const ICON_COLOR: Record<Variant, string> = {
  default: "text-coollabs dark:text-warning",
  success: "text-green-600",
  warning: "text-yellow-600 dark:text-warning",
  error: "text-error"
};

function ToastPreview({
  variant = "default",
  title,
  description,
  className
}: {
  variant?: Variant;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid max-w-sm grid-cols-[1rem_1fr] gap-2 rounded-sm border border-neutral-200 bg-white p-3 text-sm text-black shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white",
        className
      )}
    >
      <span
        className={cn("mt-0.5 size-4 text-center font-bold", ICON_COLOR[variant])}
        aria-hidden="true"
      >
        {ICON[variant]}
      </span>
      <div className="min-w-0">
        <div className="font-bold">{title}</div>
        <div className="text-neutral-600 dark:text-neutral-400">{description}</div>
      </div>
    </div>
  );
}

function triggerToast() {
  const variants: Variant[] = ["success", "default", "warning", "error"];
  const variant = variants[Math.floor(Math.random() * variants.length)];
  const title =
    variant === "error"
      ? "Deploy failed"
      : variant === "warning"
        ? "Memory limit close"
        : "Settings saved";
  const description = "The newest toast is placed in front of the stack.";
  if (variant === "success") toast.success(title, { description });
  else if (variant === "warning") toast.warning(title, { description });
  else if (variant === "error") toast.error(title, { description });
  else toast(title, { description });
}

function triggerStack() {
  toast("Deployment queued", { description: "The stack expands to reveal all visible toasts." });
  toast.warning("Memory limit close", { description: "Older toasts sit behind until hover or focus." });
  toast.success("Settings saved", { description: "Newest notification stays readable at the front." });
}

function Page() {
  return (
    <Showcase
      title="Toast sample"
      designDoc="DESIGN.md → design/overlays/toast.md"
      description="Compact Sonner-style notifications with static previews and a working stacked trigger."
    >
      <ShowcaseRow title="Static previews">
        <div className="grid w-full gap-3 md:grid-cols-[1fr_17rem]">
          <div className="space-y-3">
            <ToastPreview title="Settings saved" description="Environment variables were updated." />
            <ToastPreview
              variant="success"
              title="Deployment queued"
              description="The worker picked up the new build."
            />
            <ToastPreview
              variant="warning"
              title="Memory limit close"
              description="Server usage is above 85%."
            />
            <ToastPreview variant="error" title="Deploy failed" description="Health check timed out." />
            <div className="flex flex-wrap gap-2">
              <Button variant="highlighted" onClick={triggerToast}>
                Trigger toast
              </Button>
              <Button onClick={triggerStack}>Trigger stacked</Button>
            </div>
          </div>

          <div className="rounded-sm border border-neutral-200 bg-white p-3 text-sm text-neutral-600 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-neutral-400">
            <p className="font-bold text-black dark:text-white">Stack rule</p>
            <p className="mt-1">
              Active notifications collapse behind the newest toast. Hover or tab into the
              bottom-right stack to expand all visible toasts.
            </p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 font-mono text-xs">
              <dt className="text-coollabs dark:text-warning">expand</dt>
              <dd>false</dd>
              <dt className="text-coollabs dark:text-warning">visible</dt>
              <dd>3 toasts</dd>
              <dt className="text-coollabs dark:text-warning">gap</dt>
              <dd>14px expanded</dd>
            </dl>
          </div>
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Variants">
        <Button onClick={() => toast("Resource restarted")}>Default</Button>
        <Button onClick={() => toast.success("Saved")}>Success</Button>
        <Button onClick={() => toast.error("Deploy failed")}>Error</Button>
        <Button onClick={() => toast.warning("Disk at 90%")}>Warning</Button>
      </ShowcaseRow>
    </Showcase>
  );
}
