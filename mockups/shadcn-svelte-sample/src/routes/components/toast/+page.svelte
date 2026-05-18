<script lang="ts">
  import { ToastPreview } from "$lib/components/ui/toast/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  type ToastItem = {
    id: number;
    variant: "default" | "success" | "warning" | "error";
    title: string;
    description: string;
  };

  let toasts: ToastItem[] = [
    {
      id: 3,
      variant: "success",
      title: "Settings saved",
      description: "Newest notification stays readable at the front."
    },
    {
      id: 2,
      variant: "warning",
      title: "Memory limit close",
      description: "Older toasts sit behind until hover or focus."
    },
    {
      id: 1,
      variant: "default",
      title: "Deployment queued",
      description: "The stack expands to reveal all visible toasts."
    }
  ];
  let nextToastId = 4;
  let stackExpanded = false;

  const collapsedLift = 12;
  const expandedOffset = 92;

  function triggerToast() {
    const id = nextToastId++;
    const variants: ToastItem["variant"][] = ["success", "default", "warning", "error"];
    const variant = variants[id % variants.length];
    const toast: ToastItem = {
      id,
      variant,
      title: variant === "error" ? "Deploy failed" : variant === "warning" ? "Memory limit close" : "Settings saved",
      description: "The newest toast is placed in front of the stack."
    };

    toasts = [toast, ...toasts].slice(0, 3);

    window.setTimeout(() => {
      toasts = toasts.filter((item) => item.id !== id);
    }, 3500);
  }

  function dismissToast(id: number) {
    toasts = toasts.filter((item) => item.id !== id);
  }

  function toastStyle(index: number) {
    if (stackExpanded) {
      return `bottom: ${index * expandedOffset}px; z-index: ${30 - index}; transform: translateY(0) scale(1); opacity: 1;`;
    }

    const scale = 1 - index * 0.05;
    const lift = index * collapsedLift;
    const opacity = index === 0 ? 1 : 0.92 - index * 0.14;
    return `bottom: 0; z-index: ${30 - index}; transform: translateY(-${lift}px) scale(${scale}); opacity: ${opacity};`;
  }
</script>

<svelte:head><title>Coolify Toast sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN.md → design/overlays/toast.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">Toast sample</h1>
      <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Compact Sonner-style notifications with static previews and a working stacked trigger.</p>
    </div>

    <div class="grid gap-4 rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base md:grid-cols-[1fr_17rem]">
      <div class="space-y-3">
        <ToastPreview title="Settings saved" description="Environment variables were updated." />
        <ToastPreview variant="success" title="Deployment queued" description="The worker picked up the new build." />
        <ToastPreview variant="warning" title="Memory limit close" description="Server usage is above 85%." />
        <ToastPreview variant="error" title="Deploy failed" description="Health check timed out." />
        <Button variant="highlighted" onclick={triggerToast}>Trigger toast</Button>
      </div>

      <div class="rounded-sm border border-neutral-200 bg-white p-3 text-sm text-neutral-600 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-neutral-400">
        <p class="font-bold text-black dark:text-white">Stack rule</p>
        <p class="mt-1">Active notifications collapse behind the newest toast. Hover or tab into the bottom-right stack to expand all visible toasts.</p>
        <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 font-mono text-xs">
          <dt class="text-coollabs dark:text-warning">expand</dt><dd>false</dd>
          <dt class="text-coollabs dark:text-warning">visible</dt><dd>3 toasts</dd>
          <dt class="text-coollabs dark:text-warning">gap</dt><dd>14px expanded</dd>
        </dl>
      </div>
    </div>
  </section>
</main>

<div
  class="fixed bottom-4 right-4 z-20 h-72 w-[min(24rem,calc(100vw-2rem))]"
  aria-live="polite"
  aria-atomic="false"
  aria-label="Notifications"
  role="region"
  onmouseenter={() => (stackExpanded = true)}
  onmouseleave={() => (stackExpanded = false)}
  onfocusin={() => (stackExpanded = true)}
  onfocusout={() => (stackExpanded = false)}
>
  {#each toasts as toast (toast.id)}
    <div
      class="group absolute right-0 w-full origin-bottom-right transition-all duration-300 ease-out"
      style={toastStyle(toasts.indexOf(toast))}
      aria-hidden={!stackExpanded && toasts.indexOf(toast) > 0 ? "true" : "false"}
    >
      <ToastPreview
        variant={toast.variant}
        title={toast.title}
        description={toast.description}
        class={!stackExpanded && toasts.indexOf(toast) > 0 ? "pointer-events-none overflow-hidden" : ""}
      />
      <button
        type="button"
        class="absolute right-2 top-2 grid size-5 place-items-center rounded-sm text-xs text-neutral-500 opacity-0 transition-opacity hover:bg-neutral-100 hover:text-black focus:opacity-100 group-hover:opacity-100 dark:text-neutral-400 dark:hover:bg-coolgray-200 dark:hover:text-white"
        aria-label="Dismiss toast"
        tabindex={stackExpanded || toasts.indexOf(toast) === 0 ? 0 : -1}
        onclick={() => dismissToast(toast.id)}
      >
        ×
      </button>
    </div>
  {/each}
</div>
