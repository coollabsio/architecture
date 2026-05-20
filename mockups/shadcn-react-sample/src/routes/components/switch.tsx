import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Switch, SwitchRow } from "@/components/ui/switch";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/switch")({ component: Page });

function Page() {
  const [enabled, setEnabled] = useState(true);
  const [previews, setPreviews] = useState(false);

  return (
    <Showcase
      title="Switch sample"
      designDoc="DESIGN.md → design/forms/switch.md"
      description="Immediate on/off settings with compact Coolify Switch styling."
    >
      <ShowcaseRow title="Primitive states">
        <div className="flex items-center gap-4 text-sm text-black dark:text-white">
          <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Service enabled" /> Enabled
          <Switch checked={previews} onCheckedChange={setPreviews} aria-label="Preview deployments" /> Off
          <Switch checked disabled aria-label="Disabled switch" /> Disabled
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Rows">
        <div className="w-full space-y-1">
          <SwitchRow
            label="Auto deploy"
            description="Deploy when the main branch changes."
            defaultChecked
          />
          <SwitchRow
            label="Preview deployments"
            description="Create environments for pull requests."
          />
          <SwitchRow
            label="Locked setting"
            description="Requires owner permissions."
            disabled
            checked
          />
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Spec notes">
        <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>w-8 h-4 track.</li>
          <li>size-3 thumb.</li>
          <li>Use for immediate toggles.</li>
        </ul>
      </ShowcaseRow>
    </Showcase>
  );
}
