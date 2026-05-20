import { createFileRoute } from "@tanstack/react-router";
import { Input, PasswordInput } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/input")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Input sample"
      designDoc="DESIGN.md → design/forms/input.md"
      description="Coolify Input primitive with inset shadow outline and 4px focus/dirty bar."
    >
      <ShowcaseRow>
        <div className="w-full space-y-4">
          <FormField
            forId="app-name"
            label="Application name"
            required
            helper="Used as the public service name in generated deployment labels."
            description="Keep it short and operator-readable."
          >
            <Input id="app-name" placeholder="api-production" />
          </FormField>

          <FormField forId="dirty-name" label="Dirty input" helper="The left bar shows unsaved changes.">
            <Input id="dirty-name" defaultValue="api-production" dirty />
          </FormField>

          <FormField
            forId="password"
            label="Password with reserved icon space"
            helper="The eye icon is only for visibility toggles; helper info uses a circled i icon."
          >
            <PasswordInput id="password" defaultValue="super-secret-token" />
          </FormField>

          <div className="grid gap-3 sm:grid-cols-2">
            <FormField forId="disabled" label="Disabled">
              <Input id="disabled" defaultValue="Disabled value" disabled />
            </FormField>
            <FormField forId="readonly" label="Readonly">
              <Input id="readonly" defaultValue="Readonly value" readOnly />
            </FormField>
          </div>

          <FormField
            forId="sticky"
            label="Sticky variant"
            error="Example error text uses text-xs text-error below the field."
          >
            <Input id="sticky" defaultValue="Thin 1px simulated border" sticky />
          </FormField>

          <FormField
            forId="ghost-input"
            label="Ghost input"
            description="Use only inside a row, toolbar, or panel that already provides the boundary."
          >
            <div className="p-2">
              <Input id="ghost-input" ghost placeholder="No border or background" />
            </div>
          </FormField>
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Spec notes">
        <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>No normal border; outline is layered inset box-shadow.</li>
          <li>Focus and dirty states use the same 4px left accent bar.</li>
          <li>Light accent is purple; dark accent is yellow.</li>
          <li>Disabled and readonly states remove the shadow entirely.</li>
          <li>Form labels compose required markers and circled info helper icons.</li>
          <li>Password field hides by default and toggles show/hide with eye icons.</li>
          <li>Password field reserves pr-[2.4rem] for the visibility button.</li>
          <li>Ghost inputs remove background and inset shadow; parent chrome provides the boundary.</li>
        </ul>
      </ShowcaseRow>
    </Showcase>
  );
}
