import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/card")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Card sample"
      designDoc="DESIGN.md → design/containers/card.md"
      description="Dense operational surfaces with sharp borders and no decorative shadow."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Production API</CardTitle>
            <CardDescription>api.coolify.local</CardDescription>
          </CardHeader>
          <div className="flex items-center justify-between">
            <span>Status</span>
            <Badge variant="success">Running</Badge>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span>CPU</span>
            <span className="font-mono text-black dark:text-white">42%</span>
          </div>
          <CardFooter>
            <Button variant="highlighted">Deploy</Button>
            <Button>Logs</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Worker</CardTitle>
            <CardDescription>Background jobs and queues.</CardDescription>
          </CardHeader>
          <div className="flex items-center justify-between">
            <span>Status</span>
            <Badge variant="warning">Restarting</Badge>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span>Memory</span>
            <span className="font-mono text-black dark:text-white">768 MB</span>
          </div>
          <CardFooter>
            <Button>Restart</Button>
            <Button variant="destructive">Stop</Button>
          </CardFooter>
        </Card>
      </div>
    </Showcase>
  );
}
