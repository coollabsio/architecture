import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/deprecated-badge")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Deprecated Badge sample"
      designDoc="DESIGN.md → design/status/deprecated-badge.md"
      description="Lifecycle label for legacy features."
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Build pack v1 <Badge variant="warning">Deprecated</Badge>
          </CardTitle>
          <CardDescription>
            This builder remains available, but new services should use Nixpacks.
          </CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-black dark:text-white">Legacy Docker Compose parser</span>
          <Badge variant="warning">Legacy</Badge>
        </div>
      </Card>
    </Showcase>
  );
}
