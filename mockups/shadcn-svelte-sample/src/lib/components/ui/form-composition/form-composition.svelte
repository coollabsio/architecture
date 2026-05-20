<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";
  import { Alert } from "$lib/components/ui/alert/index.js";
  export let example: "interactive" | "success" | "error" = "interactive";

  let name = example === "interactive" ? "" : "production-api";
  let domain = example === "error" ? "not-a-domain" : "api.example.com";
  let email = example === "error" ? "ops@" : "ops@example.com";
  let phone = "+1 555 123 4567";
  let submitted = example !== "interactive";
  let submitState: "idle" | "success" | "error" = example === "interactive" ? "idle" : example;
  const domainPattern = /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phonePattern = /^\+?[0-9][0-9\s().-]{6,19}$/;

  $: nameError = submitted && name.length === 0 ? "Name is required." : name.length > 0 && name.length < 3 ? "Name must be at least 3 characters." : "";
  $: domainError = submitted && domain.length === 0 ? "Domain is required." : domain.length > 0 && !domainPattern.test(domain) ? "Enter a valid domain, for example api.example.com." : "";
  $: emailError = submitted && email.length === 0 ? "Notification email is required." : email.length > 0 && !emailPattern.test(email) ? "Enter a valid email, for example ops@example.com." : "";
  $: phoneError = phone.length > 0 && !phonePattern.test(phone) ? "Enter a valid phone number, for example +1 555 123 4567." : "";
  $: canSave = name.length >= 3 && !nameError && domain.length > 0 && !domainError && email.length > 0 && !emailError && !phoneError;

  function handleSubmit() {
    submitted = true;
    submitState = canSave ? "success" : "error";
  }
</script>
<form data-slot="form-composition" class="space-y-4 rounded-sm border border-border bg-card p-4" onsubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
  <div class="border-b border-border pb-3">
    <h2 class="text-xl font-bold text-foreground">Resource settings</h2>
    <p class="mt-1 text-sm text-muted-foreground">
      {#if example === "success"}
        Saved form state with persistent confirmation.
      {:else if example === "error"}
        Failed submit state with form-level and field-level errors.
      {:else}
        Interactive validation example with dirty fields and submit feedback.
      {/if}
    </p>
  </div>
  {#if submitState === "success"}
    <Alert variant="success" title="Settings saved" aria-live="polite" showIcon={false}>
      Your resource settings were saved. Keep the form in place and confirm the saved state inline.
    </Alert>
  {:else if submitState === "error"}
    <Alert variant="destructive" title="Could not save settings" role="alert" showIcon={false}>
      Fix the highlighted fields below, then save again. Server-side errors use the same compact form-level placement.
    </Alert>
  {/if}
  <FormField forId="name" label="Name" required helper="Used in resource lists and URLs." error={nameError || undefined}>
    <Input id="name" bind:value={name} dirty={name.length > 0} aria-invalid={!!nameError} placeholder="production-api" />
  </FormField>
  <FormField forId="domain" label="Domain" helper="Public hostname for this resource." error={domainError || undefined}>
    <Input id="domain" bind:value={domain} dirty={domain !== "api.example.com"} aria-invalid={!!domainError} />
  </FormField>
  <FormField forId="email" label="Notification email" required helper="Receives deployment and validation alerts." error={emailError || undefined}>
    <Input id="email" type="email" bind:value={email} dirty={email !== "ops@example.com"} aria-invalid={!!emailError} />
  </FormField>
  <FormField forId="phone" label="Escalation phone" helper="Optional international number for urgent alerts." error={phoneError || undefined}>
    <Input id="phone" type="tel" bind:value={phone} dirty={phone !== "+1 555 123 4567"} aria-invalid={!!phoneError} />
  </FormField>
  <div class="flex items-center justify-between border-t border-border pt-3"><p class="text-xs text-muted-foreground">Dirty fields show the left accent bar. Submit feedback stays inline.</p><Button type="submit" variant="highlighted">Save</Button></div>
</form>
