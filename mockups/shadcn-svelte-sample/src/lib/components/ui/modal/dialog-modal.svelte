<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils";

  export let open = false;
  export let title = "Dialog";
  export let description = "";
  export let size: "sm" | "md" | "lg" = "md";

  $: panelWidth = size === "sm" ? "max-w-md" : size === "lg" ? "max-w-2xl" : "max-w-lg";

  function close() {
    open = false;
  }
</script>

{#if open}
  <div data-slot="modal" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
    <button class="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm" aria-label="Close dialog" onclick={close}></button>
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby={description ? "dialog-description" : undefined}
      class={cn("relative z-10 w-full rounded-sm border border-border bg-card p-4 text-card-foreground shadow-xl outline-none", panelWidth)}
    >
      <div class="flex items-start justify-between gap-4 border-b border-border pb-3">
        <div>
          <h2 id="dialog-title" class="text-xl font-bold text-foreground">{title}</h2>
          {#if description}
            <p id="dialog-description" class="mt-1 text-sm text-muted-foreground">{description}</p>
          {/if}
        </div>
        <Button variant="ghost" size="icon" aria-label="Close dialog" onclick={close}>×</Button>
      </div>

      <div class="py-4 text-sm text-foreground">
        <slot />
      </div>

      <div class="flex flex-wrap justify-end gap-2 border-t border-border pt-3">
        <slot name="footer">
          <Button onclick={close}>Close</Button>
        </slot>
      </div>
    </div>
  </div>
{/if}
