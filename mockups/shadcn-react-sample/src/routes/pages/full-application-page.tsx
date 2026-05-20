import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommandPalette } from "@/components/ui/command-palette";
import { Input } from "@/components/ui/input";
import { SidebarNavbar } from "@/components/ui/sidebar-navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  mockGetResource,
  mockListDeployments,
  mockListLogs,
} from "@/lib/query/mock";

export const Route = createFileRoute("/pages/full-application-page")({
  component: Page,
});

function Page() {
  const [autoDeploy, setAutoDeploy] = useState(true);
  const [previews, setPreviews] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  const [resource, deployments, logs] = useQueries({
    queries: [
      { queryKey: ["resource", "r1"], queryFn: () => mockGetResource("r1") },
      {
        queryKey: ["deployments", "r1"],
        queryFn: () => mockListDeployments("r1"),
      },
      { queryKey: ["logs", "r1"], queryFn: () => mockListLogs("r1") },
    ],
  });

  return (
    <main className="min-h-screen bg-gray-50 text-black dark:bg-app-base dark:text-neutral-400 lg:grid lg:grid-cols-[auto_1fr]">
      <SidebarNavbar />
      <CommandPalette />

      <section className="min-w-0 px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6 flex flex-col gap-4 border-b-2 border-neutral-200 pb-4 dark:border-coolgray-200 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
                DESIGN.md → design/pages/full-application-page.md
              </p>
              <Breadcrumbs
                items={[
                  {
                    label: "Projects",
                    to: "/pages/full-application-page",
                  },
                  {
                    label: "coolify-cloud",
                    to: "/pages/full-application-page",
                  },
                  { label: resource.data?.name ?? "API" },
                ]}
              />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
                  {resource.data?.name ? (
                    `${resource.data.name} service`
                  ) : (
                    <Skeleton className="h-8 w-48" />
                  )}
                </h1>
                <Badge variant="success">Running</Badge>
                <Badge>Production</Badge>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                A full application shell with the Coolify sidebar navbar, page
                header, subnavigation, settings, and operational cards.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button>Visit</Button>
              <Button>Restart</Button>
              <Button variant="highlighted">Deploy</Button>
            </div>
          </header>

          <nav
            className="mb-4 flex min-h-10 items-center gap-6 overflow-x-auto whitespace-nowrap pt-2 text-sm text-neutral-700 dark:text-neutral-400"
            aria-label="Resource sections"
          >
            <a
              className="text-black dark:text-white"
              href="/pages/full-application-page"
              aria-current="page"
            >
              Configuration
            </a>
            <a
              className="hover:text-coollabs dark:hover:text-warning"
              href="/pages/full-application-page"
            >
              Deployments
            </a>
            <a
              className="hover:text-coollabs dark:hover:text-warning"
              href="/pages/full-application-page"
            >
              Logs
            </a>
            <a
              className="hover:text-coollabs dark:hover:text-warning"
              href="/pages/full-application-page"
            >
              Terminal
            </a>
            <a
              className="hover:text-coollabs dark:hover:text-warning"
              href="/pages/full-application-page"
            >
              Settings
            </a>
          </nav>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="space-y-4">
              <section className="py-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border">
                <CardHeader>
                  <CardTitle>General configuration</CardTitle>
                  <CardDescription>
                    Production service identity and routing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-1 text-sm font-medium text-black dark:text-white">
                    <span>Service name</span>
                    <Input className="dark:bg-app-base" defaultValue="api" />
                  </label>
                  <label className="space-y-1 text-sm font-medium text-black dark:text-white">
                    <span>Public domain</span>
                    <Input
                      className="dark:bg-app-base"
                      defaultValue="api.example.com"
                    />
                  </label>
                  <label className="space-y-1 text-sm font-medium text-black dark:text-white md:col-span-2">
                    <span>Repository</span>
                    <Input
                      className="dark:bg-app-base"
                      defaultValue="github.com/coollabs/api:main"
                      readOnly
                    />
                  </label>
                </CardContent>
              </section>

              <section className="py-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border">
                <CardHeader>
                  <CardTitle>Deployment behavior</CardTitle>
                  <CardDescription>
                    Immediate settings use the switch component and keep helper
                    text visible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SwitchRow
                    checked={autoDeploy}
                    onCheckedChange={setAutoDeploy}
                    label="Auto deploy"
                    description="Deploy when the main branch receives a new commit."
                  />
                  <SwitchRow
                    checked={previews}
                    onCheckedChange={setPreviews}
                    label="Preview deployments"
                    description="Create temporary deployments for pull requests."
                  />
                  <SwitchRow
                    checked={maintenance}
                    onCheckedChange={setMaintenance}
                    label="Maintenance mode"
                    description="Pause incoming deploys while operators work on the service."
                  />
                </CardContent>
              </section>

              <section className="py-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border">
                <CardHeader>
                  <CardTitle>Recent deployments</CardTitle>
                  <CardDescription>
                    Latest pipeline runs for this service.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  {deployments.isLoading && <Spinner />}
                  {deployments.data?.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 dark:bg-app-base"
                    >
                      <span className="font-mono text-coollabs dark:text-warning">
                        {d.commit}
                      </span>
                      <span className="flex-1 truncate text-neutral-600 dark:text-neutral-400">
                        {d.message}
                      </span>
                      <Badge
                        variant={
                          d.status === "success"
                            ? "success"
                            : d.status === "failed"
                              ? "destructive"
                              : "warning"
                        }
                      >
                        {d.status}
                      </Badge>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {d.durationSec}s
                      </span>
                    </div>
                  ))}
                </CardContent>
              </section>

              <section className="py-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border">
                <CardHeader>
                  <CardTitle>Tail</CardTitle>
                  <CardDescription>Recent log lines.</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-72 overflow-auto rounded-sm bg-neutral-100 p-3 font-mono text-[0.7rem] text-neutral-700 dark:bg-coolgray-200 dark:text-neutral-300">
                    {logs.isLoading
                      ? "loading..."
                      : logs.data
                          ?.map(
                            (l) =>
                              `[${l.ts}] ${l.level.toUpperCase().padEnd(5)} ${l.message}`
                          )
                          .join("\n")}
                  </pre>
                </CardContent>
              </section>
            </div>

            <aside className="space-y-4">
              <section className="py-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border">
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                  <CardDescription>Runtime metadata.</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3">
                    <DescriptionRow term="Region" detail="EU" />
                    <DescriptionRow term="Replicas" detail="3" />
                    <DescriptionRow term="Last deploy" detail="8 min ago" />
                  </dl>
                </CardContent>
              </section>

              <section className="py-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border">
                <CardHeader>
                  <CardTitle>Quick actions</CardTitle>
                  <CardDescription>
                    Secondary operator actions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Button type="button">View logs</Button>
                    <Button type="button">Open terminal</Button>
                    <Button variant="destructive" type="button">
                      Stop service
                    </Button>
                  </div>
                </CardContent>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function SwitchRow({
  checked,
  onCheckedChange,
  label,
  description,
  className,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  description?: string;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex items-start justify-between gap-3 rounded-sm border border-transparent px-2 py-2 hover:bg-neutral-50 dark:hover:bg-coolgray-200/40",
        className
      )}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium text-black dark:text-white">
          {label}
        </span>
        {description && (
          <span className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
            {description}
          </span>
        )}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}

function DescriptionRow({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 dark:bg-app-base">
      <dt className="text-xs text-neutral-500 dark:text-neutral-400">{term}</dt>
      <dd className="text-sm font-medium text-black dark:text-white">
        {detail}
      </dd>
    </div>
  );
}
