import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/badge")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Badge sample"
      designDoc="DESIGN.md → design/status/badge.md"
      description="Compact labels for deployment state and metadata."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
            <CardDescription>Short semantic labels only.</CardDescription>
          </CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">Healthy</Badge>
            <Badge variant="warning">Queued</Badge>
            <Badge variant="error">Failed</Badge>
            <Badge variant="outline">v1.4.2</Badge>
            <Badge variant="accent">Preview</Badge>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Service rows</CardTitle>
            <CardDescription>Badges remain small inside dense tables.</CardDescription>
          </CardHeader>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>API</span>
              <Badge variant="success">Running</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Worker</span>
              <Badge variant="warning">Restarting</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Database</span>
              <Badge variant="error">Down</Badge>
            </div>
          </div>
        </Card>
      </div>
    </Showcase>
  );
}
