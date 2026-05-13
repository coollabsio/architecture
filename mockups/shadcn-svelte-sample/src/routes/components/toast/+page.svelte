<script lang="ts">
  import { ToastPreview } from "$lib/components/ui/toast/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  type ToastItem = {
    id: number;
    variant: "default" | "success" | "warning" | "error";
    title: string;
    description: string;
  };

  let toasts: ToastItem[] = [];
  let nextToastId = 1;

  function triggerToast() {
    const id = nextToastId++;
    const toast: ToastItem = {
      id,
      variant: "success",
      title: "Settings saved",
      description: "The toast was triggered from the V2 mockup."
    };

    toasts = [toast, ...toasts].slice(0, 3);

    window.setTimeout(() => {
      toasts = toasts.filter((item) => item.id !== id);
    }, 3500);
  }

  function dismissToast(id: number) {
    toasts = toasts.filter((item) => item.id !== id);
  }
</script>

<svelte:head><title>Coolify V2 Toast sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN_V2.md → design/overlays/toast.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Toast sample</h1>
      <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Compact Sonner-style notifications with static previews and a working trigger.</p>
    </div>

    <div class="space-y-3 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
      <ToastPreview title="Settings saved" description="Environment variables were updated." />
      <ToastPreview variant="success" title="Deployment queued" description="The worker picked up the new build." />
      <ToastPreview variant="warning" title="Memory limit close" description="Server usage is above 85%." />
      <ToastPreview variant="error" title="Deploy failed" description="Health check timed out." />
      <Button variant="highlighted" onclick={triggerToast}>Trigger toast</Button>
    </div>
  </section>
</main>

<div class="fixed bottom-4 right-4 z-20 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2" aria-live="polite" aria-atomic="false">
  {#each toasts as toast (toast.id)}
    <div class="relative">
      <ToastPreview variant={toast.variant} title={toast.title} description={toast.description} />
      <button
        type="button"
        class="absolute right-2 top-2 grid size-5 place-items-center rounded-sm text-xs text-neutral-500 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-coolgray-200 dark:hover:text-white"
        aria-label="Dismiss toast"
        onclick={() => dismissToast(toast.id)}
      >
        ×
      </button>
    </div>
  {/each}
</div>
