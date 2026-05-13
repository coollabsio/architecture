<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";
  let name = "";
  let domain = "api.example.com";
  let email = "ops@example.com";
  let phone = "+1 555 123 4567";
  const domainPattern = /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phonePattern = /^\+?[0-9][0-9\s().-]{6,19}$/;

  $: nameError = name.length > 0 && name.length < 3 ? "Name must be at least 3 characters." : "";
  $: domainError = domain.length > 0 && !domainPattern.test(domain) ? "Enter a valid domain, for example api.example.com." : "";
  $: emailError = email.length > 0 && !emailPattern.test(email) ? "Enter a valid email, for example ops@example.com." : "";
  $: phoneError = phone.length > 0 && !phonePattern.test(phone) ? "Enter a valid phone number, for example +1 555 123 4567." : "";
  $: canSave = name.length >= 3 && !nameError && domain.length > 0 && !domainError && email.length > 0 && !emailError && !phoneError;
</script>
<form class="space-y-4 rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-base" onsubmit={(e) => e.preventDefault()}>
  <div class="border-b border-neutral-200 pb-3 dark:border-coolgray-300">
    <h2 class="text-xl font-bold text-black dark:text-white">Resource settings</h2>
    <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Update the resource name, public domain, and contact validation examples.</p>
  </div>
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
  <div class="flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-coolgray-300"><p class="text-xs text-neutral-500 dark:text-neutral-400">Dirty fields show the left accent bar.</p><Button variant="highlighted" disabled={!canSave}>Save</Button></div>
</form>
