<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAnchorAttributes & { title?: string; description?: string };
  export let href: string;
  export let title: string;
  export let description: string | undefined = undefined;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<a {href} class={cn("group relative flex min-h-[4rem] cursor-pointer flex-col rounded-sm border border-neutral-200 bg-white p-2 text-black transition-all duration-150 hover:ring-2 hover:ring-coollabs hover:no-underline dark:border-coolgray-400 dark:bg-coolgray-100 dark:text-white dark:hover:ring-warning", className)} {...$$restProps}>
  <div class="font-bold text-black dark:text-white"><slot name="title">{title}</slot></div>
  {#if description}<div class="text-xs font-bold text-neutral-500 group-hover:text-black dark:group-hover:text-white">{description}</div>{/if}
  <slot />
</a>
