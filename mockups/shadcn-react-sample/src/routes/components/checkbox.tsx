import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Checkbox, CheckboxRow } from "@/components/ui/checkbox";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/checkbox")({ component: Page });

function Page() {
  const [checked, setChecked] = useState(true);
  const [unchecked, setUnchecked] = useState(false);

  return (
    <Showcase
      title="Checkbox sample"
      designDoc="DESIGN.md → design/forms/checkbox.md"
      description="Compact checkbox primitive with right-aligned row composition, wrapped labels, and Coolify focus rings."
    >
      <ShowcaseRow title="Primitive states">
        <label className="flex items-center gap-2 text-sm text-black dark:text-white">
          <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} /> Checked
        </label>
        <label className="flex items-center gap-2 text-sm text-black dark:text-white">
          <Checkbox checked={unchecked} onCheckedChange={(v) => setUnchecked(v === true)} /> Unchecked
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-500">
          <Checkbox checked disabled /> Disabled
        </label>
      </ShowcaseRow>

      <ShowcaseRow title="Rows">
        <div className="w-full space-y-1">
          <CheckboxRow
            label="Enable preview deployments"
            description="Create preview environments for pull requests."
            defaultChecked
          />
          <CheckboxRow
            label="Auto-apply configuration changes"
            description="This label wraps without shrinking the checkbox control on the right side of the row."
          />
          <CheckboxRow
            label="Disabled setting"
            description="Disabled rows remain readable but are not interactive."
            disabled
            checked
          />
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Spec notes">
        <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Checkbox is size-4, rounded-sm, shrink-0.</li>
          <li>Checked state uses purple fill and white check.</li>
          <li>Focus ring uses purple light and yellow dark.</li>
          <li>Rows are clickable and dark-hoverable when enabled.</li>
          <li>Long labels wrap without compressing the control.</li>
        </ul>
      </ShowcaseRow>
    </Showcase>
  );
}
