import { createFileRoute } from "@tanstack/react-router";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/status-indicator")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Status Indicator sample"
      designDoc="DESIGN.md → design/status/status-indicator.md"
      description="Dot plus text state, optionally paired with Badge."
    >
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>Color is paired with readable text.</CardDescription>
        </CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <StatusIndicator variant="success" label="Running" detail="api" />
            <Badge variant="success">Healthy</Badge>
          </div>
          <div className="flex items-center justify-between">
            <StatusIndicator variant="warning" label="Deploying" detail="worker" />
            <Badge variant="warning">Queued</Badge>
          </div>
          <div className="flex items-center justify-between">
            <StatusIndicator variant="error" label="Failed" detail="db" />
            <Badge variant="error">Down</Badge>
          </div>
          <div className="flex items-center justify-between">
            <StatusIndicator variant="muted" label="Unknown" detail="cache" />
            <Badge>Pending</Badge>
          </div>
        </div>
      </Card>
    </Showcase>
  );
}
