function delay<T>(value: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export type Resource = {
  id: string;
  name: string;
  type: "application" | "database" | "service";
  status: "running" | "stopped" | "degraded" | "deploying";
  url?: string;
  updatedAt: string;
};

export type Deployment = {
  id: string;
  resourceId: string;
  commit: string;
  message: string;
  status: "success" | "failed" | "running";
  durationSec: number;
  createdAt: string;
};

export type LogLine = {
  ts: string;
  level: "info" | "warn" | "error";
  message: string;
};

const RESOURCES: Resource[] = [
  { id: "r1", name: "coolify-web", type: "application", status: "running", url: "https://app.coolify.io", updatedAt: "2026-05-19T14:22:00Z" },
  { id: "r2", name: "postgres-prod", type: "database", status: "running", updatedAt: "2026-05-19T08:00:00Z" },
  { id: "r3", name: "redis-cache", type: "database", status: "degraded", updatedAt: "2026-05-20T01:11:00Z" },
  { id: "r4", name: "worker-queue", type: "service", status: "deploying", updatedAt: "2026-05-20T09:42:00Z" },
  { id: "r5", name: "marketing-site", type: "application", status: "stopped", updatedAt: "2026-05-18T19:10:00Z" },
  { id: "r6", name: "analytics-api", type: "application", status: "running", url: "https://analytics.coolify.io", updatedAt: "2026-05-19T22:01:00Z" }
];

export function mockListResources() {
  return delay(RESOURCES);
}

export function mockGetResource(id: string) {
  return delay(RESOURCES.find((r) => r.id === id) ?? RESOURCES[0]);
}

export function mockListDeployments(resourceId: string) {
  const items: Deployment[] = [
    { id: "d1", resourceId, commit: "a1b2c3d", message: "feat: add toast collapse", status: "success", durationSec: 47, createdAt: "2026-05-20T09:42:00Z" },
    { id: "d2", resourceId, commit: "9f8e7d6", message: "fix: dropdown focus loop", status: "success", durationSec: 51, createdAt: "2026-05-19T17:11:00Z" },
    { id: "d3", resourceId, commit: "5c4b3a2", message: "chore: bump tanstack/router", status: "failed", durationSec: 14, createdAt: "2026-05-19T11:02:00Z" }
  ];
  return delay(items);
}

export function mockListLogs(resourceId: string) {
  const items: LogLine[] = [
    { ts: "09:42:01", level: "info", message: `boot ${resourceId}` },
    { ts: "09:42:03", level: "info", message: "listening on :3000" },
    { ts: "09:42:11", level: "warn", message: "slow query (812ms): SELECT * FROM events" },
    { ts: "09:42:42", level: "error", message: "ECONNREFUSED redis:6379" }
  ];
  return delay(items, 400);
}

export function mockSaveSettings(payload: Record<string, unknown>) {
  return delay({ ok: true, savedAt: new Date().toISOString(), payload }, 800);
}
