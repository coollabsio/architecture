import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/destructive-confirmation")({ component: Page });

const CONFIRMATION_TEXT = "production";

function Page() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState("Resource is still present.");
  const canConfirm = typed === CONFIRMATION_TEXT;

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setTyped("");
  }

  function confirm() {
    if (!canConfirm) return;
    setResult("Environment deletion confirmed.");
    handleOpenChange(false);
  }

  return (
    <Showcase
      title="Destructive confirmation sample"
      designDoc="DESIGN.md → design/overlays/modal-confirmation.md"
      description="Two-step destructive confirmation requiring typed text."
    >
      <ShowcaseRow title="Delete environment">
        <div className="grid w-full gap-3">
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-fit">
                Delete environment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="rounded-sm border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/30">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-red-800 dark:text-red-300">
                    Delete environment?
                  </h2>
                </div>
                <p className="mt-2 text-sm text-red-700 dark:text-red-300/90">
                  All resources inside this environment will be permanently deleted. This cannot be
                  undone.
                </p>
              </div>

              <label
                className="mt-4 block text-sm text-neutral-700 dark:text-neutral-300"
                htmlFor="confirmation-text"
              >
                Type{" "}
                <span className="font-mono font-bold text-black dark:text-white">
                  {CONFIRMATION_TEXT}
                </span>{" "}
                to confirm.
              </label>
              <Input
                id="confirmation-text"
                className="mt-2 dark:bg-app-base"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={CONFIRMATION_TEXT}
              />

              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
                <Button variant="destructive" disabled={!canConfirm} onClick={confirm}>
                  Delete environment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{result}</p>
        </div>
      </ShowcaseRow>
    </Showcase>
  );
}
