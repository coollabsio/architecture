import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/dialog")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Dialog sample"
      designDoc="DESIGN.md → design/overlays/modal.md"
      description="General modal dialog for forms, details, and focused tasks."
    >
      <ShowcaseRow>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="highlighted">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div>
                <DialogTitle>Create environment</DialogTitle>
                <DialogDescription>Add a new environment to this project.</DialogDescription>
              </div>
            </DialogHeader>
            <DialogBody>
              <div className="space-y-3">
                <p>Dialog content should be short, focused, and use existing form components.</p>
                <div className="rounded-sm border border-neutral-200 bg-neutral-100 p-3 text-xs dark:border-coolgray-300 dark:bg-coolgray-200">
                  Example form content area
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="highlighted">Create</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ShowcaseRow>
    </Showcase>
  );
}
