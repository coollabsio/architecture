import { createFileRoute } from "@tanstack/react-router";
import { Tag } from "@/components/ui/tag";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/tag")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Tag sample"
      designDoc="DESIGN.md → design/status/tag.md"
      description="Compact metadata and removable labels."
    >
      <Card>
        <CardHeader>
          <CardTitle>Image metadata</CardTitle>
          <CardDescription>Tags are h-5, text-xs, rounded-sm.</CardDescription>
        </CardHeader>
        <div className="flex flex-wrap gap-2">
          <Tag>main</Tag>
          <Tag>v1.4.2</Tag>
          <Tag>amd64</Tag>
          <Tag removable>preview</Tag>
          <Tag className="border-coollabs bg-coollabs-50 text-coollabs-200 dark:border-warning dark:bg-warning/10 dark:text-warning">
            selected
          </Tag>
        </div>
      </Card>
    </Showcase>
  );
}
