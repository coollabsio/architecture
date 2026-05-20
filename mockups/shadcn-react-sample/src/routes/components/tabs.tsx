import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/components/tabs")({ component: Page });

const items: TabItem[] = [
  { value: "overview", label: "Overview" },
  { value: "env", label: "Environment" },
  { value: "logs", label: "Logs" }
];

function Page() {
  const [active, setActive] = useState("overview");

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
      <section className="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
          <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
            DESIGN.md → design/navigation/tabs.md
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            Tabs sample
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
            Compact section navigation inside one service context.
          </p>
        </div>

        <div className="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
          <Tabs items={items} value={active} onValueChange={setActive}>
            {({ value }) => (
              <div className="rounded-sm border border-neutral-200 bg-white p-3 dark:border-coolgray-300 dark:bg-coolgray-100">
                {value === "overview" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-bold text-black dark:text-white">
                        Service overview
                      </h2>
                      <Badge variant="success">Running</Badge>
                    </div>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                      3 containers healthy. Last deploy completed 12 minutes ago.
                    </p>
                  </>
                )}
                {value === "env" && (
                  <>
                    <h2 className="text-base font-bold text-black dark:text-white">Environment</h2>
                    <p className="mt-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                      DATABASE_URL, REDIS_URL, APP_KEY configured.
                    </p>
                  </>
                )}
                {value === "logs" && (
                  <>
                    <h2 className="text-base font-bold text-black dark:text-white">Logs</h2>
                    <p className="mt-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                      [12:04:11] health check passed
                    </p>
                  </>
                )}
                <div className="mt-3">
                  <Button>Open details</Button>
                </div>
              </div>
            )}
          </Tabs>
        </div>
      </section>
    </main>
  );
}
