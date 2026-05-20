import { createFileRoute } from "@tanstack/react-router";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/select")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Select sample"
      designDoc="DESIGN.md → design/forms/select.md"
      description="Native select wrapper with the same inset shadow system as Input and Coolify's stacked up/down chevron."
    >
      <ShowcaseRow>
        <div className="w-full space-y-4">
          <FormField
            forId="direction"
            label="Direction"
            required
            helper="Choose how incoming domains are normalized."
          >
            <Select id="direction" defaultValue="allow-www-and-non-www">
              <option value="allow-www-and-non-www">Allow www & non-www.</option>
              <option value="redirect-to-www">Redirect to www.</option>
              <option value="redirect-to-non-www">Redirect to non-www.</option>
            </Select>
          </FormField>

          <FormField
            forId="dirty-select"
            label="Dirty select"
            helper="The left bar shows an unsaved select value."
          >
            <Select id="dirty-select" defaultValue="redirect-to-www" dirty>
              <option value="allow-www-and-non-www">Allow www & non-www.</option>
              <option value="redirect-to-www">Redirect to www.</option>
              <option value="redirect-to-non-www">Redirect to non-www.</option>
            </Select>
          </FormField>

          <FormField forId="disabled-select" label="Disabled select">
            <Select id="disabled-select" defaultValue="disabled" disabled>
              <option value="disabled">Disabled option</option>
            </Select>
          </FormField>
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Spec notes">
        <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Select shares Input's inset box-shadow system.</li>
          <li>Focus and dirty states use the same 4px left accent bar.</li>
          <li>Chevron is stacked up/down, black in light mode and white in dark mode.</li>
          <li>Disabled state removes the inset shadow.</li>
          <li>Simple forms should prefer this native select wrapper.</li>
        </ul>
      </ShowcaseRow>
    </Showcase>
  );
}
