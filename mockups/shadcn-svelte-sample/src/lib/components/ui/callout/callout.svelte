<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLDivElement> & { title?: string };
  export let title: string | undefined = undefined;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<div class={cn("grid grid-cols-[1rem_1fr] gap-2 rounded-sm border border-neutral-200 bg-white p-3 text-sm text-neutral-700 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-neutral-400", className)} {...$$restProps}>
  <div class="mt-0.5 grid size-4 place-items-center rounded-full bg-coollabs text-xs font-bold text-white dark:bg-warning dark:text-base" aria-hidden="true">i</div>
  <div class="min-w-0 space-y-1">{#if title}<div class="font-bold text-black dark:text-white">{title}</div>{/if}<slot /></div>
</div>
