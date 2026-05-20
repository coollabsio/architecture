import { createFileRoute } from "@tanstack/react-router";
import { SidebarNavbar } from "@/components/ui/sidebar-navbar";
import { CommandPalette } from "@/components/ui/command-palette";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSidebar } from "@/hooks/use-sidebar";

export const Route = createFileRoute("/components/sidebar-navbar")({ component: Page });

function Page() {
  const { collapsed } = useSidebar();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <section className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
            DESIGN.md → design/navigation/sidebar-navbar.md
          </p>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
              Sidebar Navbar sample
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
              Dense app shell navigation with active state, search, internal collapse trigger, and
              page subnav.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border border-neutral-200 bg-gray-50 dark:border-coolgray-300 dark:bg-app-base lg:grid lg:grid-cols-[auto_1fr]">
          <SidebarNavbar />
          <CommandPalette />

          <div className="min-w-0 p-4">
            <div className="mb-4 flex flex-col gap-4 border-b-2 border-neutral-200 pb-2 text-neutral-700 dark:border-coolgray-200 dark:text-neutral-400 sm:justify-between md:flex-row md:items-center">
              <div>
                <Breadcrumbs
                  items={[
                    { label: "Projects", href: "/components/sidebar-navbar" },
                    { label: "coolify-cloud", href: "/components/sidebar-navbar" },
                    { label: "API" }
                  ]}
                />
                <div className="mt-2 flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-black dark:text-white">API service</h2>
                  <Badge variant="success">Running</Badge>
                </div>
              </div>
              <nav className="flex min-h-10 items-center gap-6 overflow-x-auto whitespace-nowrap pt-2 text-sm">
                <a
                  className="text-black dark:text-white"
                  href="/components/sidebar-navbar"
                  aria-current="page"
                >
                  Configuration
                </a>
                <a
                  className="hover:text-coollabs dark:hover:text-warning"
                  href="/components/sidebar-navbar"
                >
                  Deployments
                </a>
                <a
                  className="hover:text-coollabs dark:hover:text-warning"
                  href="/components/sidebar-navbar"
                >
                  Logs
                </a>
                <a
                  className="hover:text-coollabs dark:hover:text-warning"
                  href="/components/sidebar-navbar"
                >
                  Terminal
                </a>
              </nav>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Navigation rules</CardTitle>
                  <CardDescription>
                    Active dark item uses yellow text on a dark neutral fill.
                  </CardDescription>
                </CardHeader>
                <ul className="list-inside list-disc space-y-1 p-4 pt-0 text-xs text-neutral-600 dark:text-neutral-400">
                  <li>Sidebar is border-separated, not shadowed.</li>
                  <li>Items are compact text-sm rows with size-4 icons.</li>
                  <li>Collapsed mode keeps titles for icon-only items.</li>
                  <li>Page subnav scrolls horizontally when needed.</li>
                </ul>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content surface</CardTitle>
                  <CardDescription>
                    The main content remains independent from sidebar state.
                  </CardDescription>
                </CardHeader>
                <div className="space-y-2 p-4 pt-0 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex justify-between">
                    <span>Sidebar state</span>
                    <span className="font-mono text-black dark:text-white">
                      {collapsed ? "collapsed" : "expanded"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active section</span>
                    <span className="font-mono text-black dark:text-white">Projects</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shortcut</span>
                    <span className="font-mono text-black dark:text-white">/</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
