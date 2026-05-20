import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { HelperTooltip } from "@/components/ui/helper-tooltip";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/tooltip")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Tooltip variants sample"
      designDoc="DESIGN.md → design/overlays/tooltip.md"
      description="Action tooltip and helper tooltip variants."
    >
      <ShowcaseRow>
        <Tooltip content="Redeploy application">
          <Button>Hover action</Button>
        </Tooltip>
        <div className="flex items-center gap-2 text-sm text-black dark:text-white">
          Label helper <HelperTooltip text="Use helper tooltip for field explanations." />
        </div>
        <Tooltip side="bottom" content="Bottom positioned tooltip">
          <Button variant="ghost">Bottom</Button>
        </Tooltip>
      </ShowcaseRow>
    </Showcase>
  );
}
