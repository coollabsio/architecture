import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/popover")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Popover / popup sample"
      designDoc="DESIGN.md → design/overlays/popup.md"
      description="Small anchored overlay for compact actions or contextual content."
    >
      <ShowcaseRow>
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-neutral-700 dark:text-neutral-300">
              Use for small, anchored content. For destructive or complex workflows, use a modal.
            </p>
            <div className="mt-3 flex gap-2">
              <Button size="sm">Action</Button>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </ShowcaseRow>
    </Showcase>
  );
}
