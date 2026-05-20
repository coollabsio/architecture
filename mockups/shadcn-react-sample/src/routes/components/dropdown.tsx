import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/dropdown")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Dropdown sample"
      designDoc="DESIGN.md → design/forms/dropdown.md"
      description="Focused Shadcn Dropdown Menu primitive extension with compact content, dense items, touch rows, disabled state, and destructive action styling."
    >
      <ShowcaseRow title="Service actions">
        <div className="grid w-full gap-4 md:grid-cols-[1fr_16rem]">
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-black dark:text-white">Service actions</h2>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Open the menu to inspect item density and states.
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="menu">
                    Actions
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9L12 5.25 15.75 9" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <svg
                      className="size-4"
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
                    Restart
                  </DropdownMenuItem>
                  <DropdownMenuItem>Redeploy</DropdownMenuItem>
                  <DropdownMenuItem size="touch">Touch-sized deploy with cache</DropdownMenuItem>
                  <DropdownMenuItem disabled>Rollback unavailable</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem danger>Stop service</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center justify-between rounded-sm border border-neutral-200 bg-white px-2 py-2 dark:border-coolgray-300 dark:bg-coolgray-100">
                <span className="font-bold text-black dark:text-white">api-production</span>
                <span className="text-green-700 dark:text-green-400">running</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-neutral-200 bg-white px-2 py-2 dark:border-coolgray-300 dark:bg-coolgray-100">
                <span className="font-bold text-black dark:text-white">Last deploy</span>
                <span>2 minutes ago</span>
              </div>
            </div>
          </div>

          <aside className="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
            <h2 className="mb-2 text-base font-bold text-black dark:text-white">Spec notes</h2>
            <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
              <li>Content uses p-1, border, shadow-sm, rounded-sm.</li>
              <li>Default items use text-xs, py-1, pl-2, pr-4, gap-2.</li>
              <li>Touch item uses min-h-10, px-3, py-2, text-sm.</li>
              <li>Dark hover/focus uses the documented purple fill exception.</li>
              <li>Disabled item uses pointer-events-none and opacity-50.</li>
            </ul>
          </aside>
        </div>
      </ShowcaseRow>
    </Showcase>
  );
}
