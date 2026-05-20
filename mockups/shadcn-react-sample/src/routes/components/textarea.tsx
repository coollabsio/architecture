import { createFileRoute } from "@tanstack/react-router";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/textarea")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Textarea sample"
      designDoc="DESIGN.md → design/forms/textarea.md"
      description="Coolify Textarea primitive with mono text, inset shadow outline, dirty bar, and optional Tab insertion."
    >
      <ShowcaseRow>
        <div className="w-full space-y-4">
          <FormField
            forId="env"
            label="Environment variables"
            required
            helper="Multi-line technical values use mono text and the same dirty bar as Input."
          >
            <Textarea id="env" placeholder={"APP_ENV=production\nPORT=3000"} />
          </FormField>

          <FormField forId="dirty-textarea" label="Dirty textarea" helper="The left bar shows unsaved changes.">
            <Textarea id="dirty-textarea" dirty defaultValue={"APP_ENV=production\nPORT=3000"} />
          </FormField>

          <FormField
            forId="tab-textarea"
            label="Tab insertion"
            description="Press Tab inside this field to insert two spaces."
          >
            <Textarea
              id="tab-textarea"
              allowTab
              defaultValue={"services:\n  api:\n    image: coollabsio/api"}
            />
          </FormField>

          <div className="grid gap-3 sm:grid-cols-2">
            <FormField forId="disabled-textarea" label="Disabled">
              <Textarea id="disabled-textarea" defaultValue="Disabled text" disabled />
            </FormField>
            <FormField forId="readonly-textarea" label="Readonly">
              <Textarea id="readonly-textarea" defaultValue="Readonly text" readOnly />
            </FormField>
          </div>

          <FormField
            forId="ghost-textarea"
            label="Ghost textarea"
            description="Use only when the surrounding panel or editor shell supplies the visual boundary."
          >
            <div className="p-2">
              <Textarea
                id="ghost-textarea"
                ghost
                defaultValue={"# No border or background\nDEPLOYMENT_NOTES=compact"}
              />
            </div>
          </FormField>
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Spec notes">
        <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Textarea uses Geist Mono / font-mono.</li>
          <li>Textarea shares Input's inset shadow and dirty bar.</li>
          <li>Disabled and readonly states remove the inset shadow.</li>
          <li>Tab insertion is opt-in with allowTab.</li>
          <li>Password-like secrets should be a separate composition.</li>
          <li>Ghost textareas remove background and inset shadow; parent chrome provides the boundary.</li>
        </ul>
      </ShowcaseRow>
    </Showcase>
  );
}
