import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/confirm-modal")({ component: Page });

function Page() {
  const [result, setResult] = useState("No action confirmed yet.");
  return (
    <Showcase
      title="Confirm modal sample"
      designDoc="DESIGN.md → design/overlays/confirm-modal.md"
      description="Single-step confirmation for reversible or low-risk actions."
    >
      <ShowcaseRow title="Redeploy">
        <div className="grid w-full gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="highlighted" className="w-fit">
                Confirm redeploy
              </Button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>
                <div>
                  <DialogTitle>Redeploy application?</DialogTitle>
                  <DialogDescription>
                    This will start a new deployment using the latest available configuration.
                  </DialogDescription>
                </div>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="highlighted" onClick={() => setResult("Redeploy confirmed.")}>
                    Redeploy
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{result}</p>
        </div>
      </ShowcaseRow>
    </Showcase>
  );
}
