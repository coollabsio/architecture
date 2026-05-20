import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/ui/callout";
import { ExternalLink } from "@/components/ui/link";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/callout")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Callout sample"
      designDoc="DESIGN.md → design/overlays/callout.md"
      description="Non-urgent guidance block built from Alert density."
    >
      <ShowcaseRow title="Inline guidance">
        <div className="grid w-full gap-3">
          <Callout title="DNS configuration tip">
            Point your domain to the server before enabling automatic HTTPS.{" "}
            <ExternalLink href="https://coolify.io/docs">Read docs</ExternalLink>
          </Callout>
          <Callout title="When to use Callout">
            Use this for help text, not deployment failure or success feedback.
          </Callout>
        </div>
      </ShowcaseRow>
    </Showcase>
  );
}
