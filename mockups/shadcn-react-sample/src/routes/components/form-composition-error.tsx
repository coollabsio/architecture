import { createFileRoute } from "@tanstack/react-router";
import { Showcase } from "@/components/showcase";
import { FormComposition } from "./form-composition";

export const Route = createFileRoute("/components/form-composition-error")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Form error / failed submit state"
      designDoc="DESIGN.md → design/forms/form-composition.md"
      description="Reusable submitted form primitive showing blocking form-level feedback plus field-specific errors."
    >
      <div className="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200">
        <FormComposition example="error" />
      </div>
    </Showcase>
  );
}
