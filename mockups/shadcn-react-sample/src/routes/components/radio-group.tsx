import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RadioGroup, RadioRow, type RadioOption } from "@/components/ui/radio-group";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/radio-group")({ component: Page });

const strategyOptions: RadioOption[] = [
  { value: "rolling", label: "Rolling deploy", description: "Deploy gradually with no downtime." },
  { value: "recreate", label: "Recreate containers", description: "Stop old containers before starting new ones." },
  { value: "blue-green", label: "Blue/green", description: "Not available for this project.", disabled: true },
];

function Page() {
  const [strategy, setStrategy] = useState("rolling");
  const [region, setRegion] = useState("eu");

  return (
    <Showcase
      title="Radio Group sample"
      designDoc="DESIGN.md → design/forms/radio-group.md"
      description="Compact single-choice rows for the Coolify Radio Group primitive."
    >
      <ShowcaseRow title="Deployment strategy">
        <div className="w-full">
          <RadioGroup value={strategy} onValueChange={setStrategy} name="strategy">
            {strategyOptions.map((option) => (
              <RadioRow
                key={option.value}
                value={option.value}
                label={option.label}
                description={option.description}
                disabled={option.disabled}
              />
            ))}
          </RadioGroup>
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Region">
        <div className="w-full">
          <RadioGroup value={region} onValueChange={setRegion} name="region">
            <RadioRow value="eu" label="Europe" description="Use the existing Frankfurt server." />
            <RadioRow value="us" label="United States" description="Use a remote worker node." />
          </RadioGroup>
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Spec notes">
        <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Single-choice only.</li>
          <li>Controls are circular size-4.</li>
          <li>Selected uses inner dot.</li>
          <li>Rows wrap labels safely.</li>
        </ul>
      </ShowcaseRow>
    </Showcase>
  );
}
