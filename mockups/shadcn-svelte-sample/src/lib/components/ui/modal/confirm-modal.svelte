<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";

  export let open = false;
  export let title = "Confirm action";
  export let description = "Are you sure you want to continue?";
  export let cancelLabel = "Cancel";
  export let confirmLabel = "Confirm";
  export let onconfirm: () => void = () => {};

  function close() {
    open = false;
  }

  function confirm() {
    onconfirm();
    close();
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
    <button class="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[1px]" aria-label="Cancel confirmation" onclick={close}></button>
    <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-description" class="relative z-10 w-full max-w-md rounded-sm border border-neutral-200 bg-white p-4 shadow-xl dark:border-coolgray-300 dark:bg-coolgray-100">
      <div class="flex items-start justify-between gap-4"><h2 id="confirm-title" class="text-xl font-bold text-black dark:text-white">{title}</h2><Button variant="ghost" size="icon" aria-label="Close confirmation" onclick={close}>×</Button></div>
      <p id="confirm-description" class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      <div class="mt-5 flex flex-wrap justify-end gap-2">
        <Button onclick={close}>{cancelLabel}</Button>
        <Button variant="highlighted" onclick={confirm}>{confirmLabel}</Button>
      </div>
    </div>
  </div>
{/if}
