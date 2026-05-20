import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SearchableDropdown, type SearchableDropdownOption } from "@/components/ui/searchable-dropdown";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/searchable-dropdown")({ component: Page });

const OPTIONS: SearchableDropdownOption[] = [
  { label: "Production", value: "production", description: "Main live environment" },
  { label: "Staging", value: "staging", description: "Pre-production testing" },
  { label: "Preview PR-128", value: "preview-pr-128", description: "Temporary pull request environment" },
  { label: "Development", value: "development", description: "Internal developer environment" },
  { label: "Disaster recovery", value: "dr", description: "Secondary region failover" }
];

function Page() {
  const [value, setValue] = useState("production");
  return (
    <Showcase
      title="Searchable dropdown sample"
      designDoc="DESIGN.md → design/forms/searchable-dropdown.md"
      description="Combobox-style dropdown for longer option lists."
    >
      <ShowcaseRow title="Environments">
        <div className="grid w-full gap-3">
          <SearchableDropdown
            options={OPTIONS}
            value={value}
            placeholder="Select environment"
            searchPlaceholder="Search environments..."
            onSelect={(o) => setValue(o.value)}
          />
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Selected value: <span className="font-mono text-black dark:text-white">{value}</span>
          </p>
        </div>
      </ShowcaseRow>
    </Showcase>
  );
}
