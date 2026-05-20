<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  export let open = false;
  export let title = "Confirm destructive action";
  export let description = "This action is permanent and cannot be undone.";
  export let confirmationText = "DELETE";
  export let cancelLabel = "Cancel";
  export let confirmLabel = "Delete";
  export let onconfirm: () => void = () => {};

  let typed = "";
  $: canConfirm = typed === confirmationText;

  function close() {
    open = false;
    typed = "";
  }

  function confirm() {
    if (!canConfirm) return;
    onconfirm();
    close();
  }
</script>

{#if open}
  <div data-slot="destructive-confirmation" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
    <button class="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm" aria-label="Cancel destructive confirmation" onclick={close}></button>
    <div role="alertdialog" aria-modal="true" aria-labelledby="destructive-title" aria-describedby="destructive-description" class="relative z-10 w-full max-w-lg rounded-sm border border-border bg-card p-4 text-card-foreground shadow-xl">
      <div class="rounded-sm border border-destructive/30 bg-destructive/10 p-3">
        <div class="flex items-start justify-between gap-4"><h2 id="destructive-title" class="text-xl font-bold text-destructive">{title}</h2><Button variant="ghost" size="icon" aria-label="Close destructive confirmation" onclick={close}>×</Button></div>
        <p id="destructive-description" class="mt-2 text-sm text-destructive">{description}</p>
      </div>

      <label class="mt-4 block text-sm text-foreground" for="confirmation-text">
        Type <span class="font-mono font-bold text-foreground">{confirmationText}</span> to confirm.
      </label>
      <Input id="confirmation-text" class="mt-2" bind:value={typed} placeholder={confirmationText} />

      <div class="mt-5 flex flex-wrap justify-end gap-2">
        <Button onclick={close}>{cancelLabel}</Button>
        <Button variant="destructive" disabled={!canConfirm} onclick={confirm}>{confirmLabel}</Button>
      </div>
    </div>
  </div>
{/if}
