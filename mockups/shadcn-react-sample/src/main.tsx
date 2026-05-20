import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Toaster } from "sonner";
import "./app.css";
import { routeTree } from "./routeTree.gen";
import { initializeTheme } from "./hooks/use-appearance";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchOnWindowFocus: false }
  }
});

const basepath = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;
const router = createRouter({ routeTree, defaultPreload: "intent", basepath });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

initializeTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors theme="dark" position="bottom-right" />
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  </StrictMode>
);
