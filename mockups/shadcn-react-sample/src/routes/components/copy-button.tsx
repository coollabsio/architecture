import { createFileRoute } from "@tanstack/react-router";
import { CopyButton } from "@/components/ui/copy-button";
import { FormField } from "@/components/ui/form-field";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/copy-button")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Copy Button sample"
      designDoc="DESIGN.md → design/forms/copy-button.md"
      description="Readonly Input composition with secure-context clipboard action and temporary copied check state."
    >
      <ShowcaseRow>
        <div className="w-full space-y-4">
          <FormField
            forId="public-url"
            label="Public URL"
            helper="Copyable values use readonly input styling and an inline icon action."
          >
            <CopyButton text="https://api.example.com" />
          </FormField>

          <FormField forId="certificate-path" label="Certificate mount path">
            <CopyButton
              text="- /data/coolify/ssl/coolify-ca.crt:/etc/ssl/certs/coolify-ca.crt:ro"
              mono
            />
          </FormField>

          <FormField
            forId="invite-link"
            label="Invitation link"
            description="Click the icon to show the green copied state for 1 second."
          >
            <CopyButton text="https://coolify.example.com/invitations/team_7f3c9a" />
          </FormField>
        </div>
      </ShowcaseRow>

      <ShowcaseRow title="Spec notes">
        <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Composes readonly Input plus absolute icon button.</li>
          <li>Copy button renders only in secure clipboard contexts.</li>
          <li>Input reserves right padding so text stays clear of the icon.</li>
          <li>Copied state uses green check for 1 second.</li>
          <li>Icon button keeps visible focus ring.</li>
        </ul>
      </ShowcaseRow>
    </Showcase>
  );
}
