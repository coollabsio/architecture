import { createFileRoute } from "@tanstack/react-router";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/alert")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Alert sample"
      designDoc="DESIGN.md → design/overlays/alert.md"
      description="Compact inline notices for operational feedback."
    >
      <ShowcaseRow title="Variants">
        <div className="grid w-full gap-3">
          <Alert title="Deployment ready" icon="i">
            The latest image was built and is ready to deploy.
          </Alert>
          <Alert variant="success" title="Backup completed" icon="✓">
            The database backup finished 2 minutes ago.
          </Alert>
          <Alert variant="warning" title="Resource limit close" icon="!">
            This server is using 86% of its memory limit.
          </Alert>
          <Alert variant="destructive" title="Deployment failed" role="alert" icon="×">
            The health check did not pass. Review logs before retrying.
          </Alert>
          <div className="flex gap-2">
            <Button variant="highlighted">View logs</Button>
            <Button>Dismiss</Button>
          </div>
        </div>
      </ShowcaseRow>
    </Showcase>
  );
}
