import { createFileRoute } from "@tanstack/react-router";
import { HelperTooltip } from "@/components/ui/helper-tooltip";
import { Input } from "@/components/ui/input";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/helper-tooltip")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Helper Tooltip sample"
      designDoc="DESIGN.md → design/overlays/helper-tooltip.md"
      description="Reusable info icon tooltip with fit-to-content width."
    >
      <ShowcaseRow title="Examples">
        <div className="grid w-full gap-4">
          <div>
            <div className="mb-1 flex items-center gap-1">
              <label className="text-sm font-medium text-black dark:text-white" htmlFor="domain">
                Domain
              </label>
              <HelperTooltip text="Used as the public service hostname." />
            </div>
            <Input id="domain" defaultValue="app.example.com" />
          </div>
          <div className="flex items-center gap-1 text-sm text-black dark:text-white">
            Short helper <HelperTooltip text="Two words" />
          </div>
          <div className="flex items-center gap-1 text-sm text-black dark:text-white">
            Long helper
            <HelperTooltip text="This longer tooltip wraps within the viewport instead of using one fixed width for every helper message." />
          </div>
        </div>
      </ShowcaseRow>
    </Showcase>
  );
}
