import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/slide-over")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Slide-over sample"
      designDoc="DESIGN.md → design/overlays/slide-over.md"
      description="Side sheet for secondary details and edit flows."
    >
      <ShowcaseRow>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="highlighted">Open slide-over</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div>
                <SheetTitle>Deployment details</SheetTitle>
                <SheetDescription>
                  Review logs and metadata without leaving the page.
                </SheetDescription>
              </div>
            </SheetHeader>
            <SheetBody>
              <div className="space-y-3">
                <div className="rounded-sm bg-neutral-100 p-3 dark:bg-coolgray-200">
                  Deployment #124 completed successfully.
                </div>
                <div className="rounded-sm bg-neutral-100 p-3 dark:bg-coolgray-200">
                  Duration: 46s
                </div>
              </div>
            </SheetBody>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ShowcaseRow>
    </Showcase>
  );
}
