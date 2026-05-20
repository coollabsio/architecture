import { Outlet, createRootRoute } from "@tanstack/react-router";
import { SampleToolbar } from "@/components/sample-toolbar";

export const Route = createRootRoute({
  component: RootLayout
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-black dark:bg-app-base dark:text-neutral-400">
      <SampleToolbar />
      <div className="sm:pt-24 sm:[&>main]:min-h-[calc(100vh-6rem)]">
        <Outlet />
      </div>
    </div>
  );
}
