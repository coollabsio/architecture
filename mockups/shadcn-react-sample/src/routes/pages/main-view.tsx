import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/ui/callout";
import { CommandPalette } from "@/components/ui/command-palette";
import {
  SidebarNavbar,
  Subsidebar,
  type SubsidebarItem,
} from "@/components/ui/sidebar-navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { mockListResources, type Resource } from "@/lib/query/mock";

export const Route = createFileRoute("/pages/main-view")({ component: Page });

type ViewMode = "grid" | "split" | "single";

const resourceSections: SubsidebarItem[] = [
  { label: "Environment", to: "/pages/main-view", active: true },
  { label: "Deployments", to: "/pages/main-view" },
  { label: "Commands", to: "/pages/main-view" },
  { label: "Logs", to: "/pages/main-view" },
  { label: "Metrics", to: "/pages/main-view" },
  { label: "Settings", to: "/pages/main-view" },
];

function Page() {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <div className="flex min-h-screen w-full">
      <SidebarNavbar />
      <CommandPalette />
      <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10">
        <section className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
          <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
            <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
              DESIGN.md → design/layouts/main-view.md
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
                  Main View layouts
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                  Three approved page-level compositions: Coolify resource
                  grid, split master-detail, and single-section workspace.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={view === "grid" ? "highlighted" : "default"}
                  onClick={() => setView("grid")}
                >
                  Coolify grid
                </Button>
                <Button
                  variant={view === "split" ? "highlighted" : "default"}
                  onClick={() => setView("split")}
                >
                  Split view
                </Button>
                <Button
                  variant={view === "single" ? "highlighted" : "default"}
                  onClick={() => setView("single")}
                >
                  Single section
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
            {view === "grid" && <GridView />}
            {view === "split" && <SplitView />}
            {view === "single" && <SingleView />}
          </div>
        </section>
      </main>
    </div>
  );
}

function GridView() {
  const { data, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: mockListResources,
  });

  return (
    <div className="mx-auto w-full max-w-5xl py-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white">
          Projects
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Deploy and manage applications, databases, and services.
        </p>
      </div>

      <Callout title="Resource grid layout">
        Use this layout for dashboard/index pages where the main job is
        choosing a resource or shortcut.
      </Callout>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <CoolboxSkeleton key={i} />
            ))
          : (data ?? []).map((resource) => (
              <Coolbox
                key={resource.id}
                href="/pages/main-view"
                title={resource.name}
                description={resourceDescription(resource)}
              >
                <div className="mt-2">
                  <Badge variant={badgeForStatus(resource.status)}>
                    {capitalize(resource.status)}
                  </Badge>
                </div>
              </Coolbox>
            ))}
        <Coolbox
          href="/pages/main-view"
          title="Create resource"
          description="Application, database, or service"
        />
      </div>
    </div>
  );
}

function SplitView() {
  return (
    <div className="grid min-h-[42rem] gap-2 lg:grid-cols-[32rem_1fr]">
      <section className="rounded-sm border border-neutral-200 bg-white dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-coolgray-200">
          <h2 className="text-xl font-bold text-black dark:text-white">Inbox</h2>
          <div className="flex gap-2">
            <Button variant="highlighted">Compose</Button>
            <Button>Refresh</Button>
          </div>
        </div>
        <div className="border-b border-neutral-200 p-4 dark:border-coolgray-200">
          <Input className="dark:bg-app-base" placeholder="Search" />
        </div>
        <div className="space-y-2 p-4">
          <div className="rounded-sm bg-neutral-100 p-4 text-sm text-neutral-600 dark:bg-coolgray-200 dark:text-neutral-400">
            No SMTP messages yet. Send mail to this receiver to populate the
            inbox.
          </div>
        </div>
      </section>

      <section className="rounded-sm border border-neutral-200 bg-white p-6 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="flex min-h-56 items-center justify-center rounded-sm bg-neutral-100 p-8 text-center dark:bg-coolgray-200">
          <div>
            <div className="mb-4 text-3xl text-neutral-500 dark:text-neutral-400">
              ›_
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Waiting for inbound SMTP email
            </h2>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
              Send a message to your configured mailbox route, then refresh the
              inbox.
            </p>
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
              In production, send mail after your DNS MX record points at this
              server.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SingleView() {
  return (
    <div className="min-h-[42rem] rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Inspired by Laravel Cloud-style resource workspaces
          </p>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-sm bg-cyan-100 text-sm font-bold text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">
              B
            </span>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Beep
            </h2>
            <span className="text-neutral-500 dark:text-neutral-400">•</span>
            <span className="text-2xl text-neutral-600 dark:text-neutral-400">
              production
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span>github.com/coollabs/beep:main</span>
            <span>US East (Ohio)</span>
            <span>beep.com</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="highlighted">Deploy</Button>
          <Button>Visit</Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8 sm:flex-row">
        <Subsidebar items={resourceSections} ariaLabel="Resource sections" />

        <div className="min-w-0 flex-1">
          <div className="min-h-[30rem] rounded-sm border border-neutral-200 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_0)] [background-size:24px_24px] p-6 dark:border-coolgray-300 dark:bg-coolgray-200 dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)]">
            <div className="mb-4 rounded-sm border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-600 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-neutral-400">
              Hint: this single-section topology view borrows the resource-map
              feel from Laravel Cloud, adapted to Coolify colors, spacing, and
              shadcn primitives.
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-3">
                <TopologyCard title="Network" badge={<Badge variant="success">Active</Badge>}>
                  <div>DDoS protection</div>
                  <div>CDN</div>
                  <div>Edge caching</div>
                </TopologyCard>
                <TopologyCard title="Domains">
                  <div>Cloud domain · enabled</div>
                  <div>Custom domain · not connected</div>
                </TopologyCard>
              </div>

              <div className="space-y-3">
                <TopologyCard title="App" badge={<Badge>Web</Badge>}>
                  <div>Web traffic · enabled</div>
                  <div>Size · large</div>
                </TopologyCard>
                <TopologyCard
                  title="Queue worker"
                  badge={<Badge>Worker</Badge>}
                  flat
                >
                  <div>Size · small</div>
                  <div>Auto-scaling · 2-4 replicas</div>
                </TopologyCard>
              </div>

              <div className="space-y-3">
                <TopologyCard
                  title="Beep"
                  badge={<Badge variant="warning">Database</Badge>}
                >
                  <div>Type · Serverless Postgres</div>
                  <div>Name · main</div>
                  <div>Compute · 0.5-2.0 units</div>
                </TopologyCard>
                <TopologyCard title="Cache" badge={<Badge>KV Store</Badge>}>
                  <div>Disk · private</div>
                  <div>Size · 1GB</div>
                </TopologyCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopologyCard({
  title,
  badge,
  children,
  flat = false,
}: {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  flat?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-100",
        !flat && "hover:border-coollabs dark:hover:border-warning"
      )}
    >
      <div className="mb-3 flex items-center justify-between text-sm font-bold text-black dark:text-white">
        <span>{title}</span>
        {badge}
      </div>
      <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
        {children}
      </div>
    </div>
  );
}

function Coolbox({
  href,
  title,
  description,
  children,
}: {
  href: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block rounded-sm border border-neutral-200 bg-white p-4 transition-colors hover:border-coollabs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coollabs dark:border-coolgray-300 dark:bg-coolgray-100 dark:hover:border-warning dark:focus-visible:ring-warning"
    >
      <div className="text-sm font-bold text-black dark:text-white">{title}</div>
      {description && (
        <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          {description}
        </div>
      )}
      {children}
    </a>
  );
}

function CoolboxSkeleton() {
  return (
    <div className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-3 h-5 w-20" />
    </div>
  );
}

function resourceDescription(r: Resource) {
  switch (r.type) {
    case "application":
      return r.url ? `Application · ${r.url}` : "Application";
    case "database":
      return "Database · backups enabled";
    case "service":
      return "Service · worker";
    default:
      return r.type;
  }
}

function badgeForStatus(status: Resource["status"]) {
  switch (status) {
    case "running":
      return "success" as const;
    case "deploying":
      return "warning" as const;
    case "degraded":
      return "warning" as const;
    case "stopped":
    default:
      return "default" as const;
  }
}

function capitalize(value: string) {
  return value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);
}
