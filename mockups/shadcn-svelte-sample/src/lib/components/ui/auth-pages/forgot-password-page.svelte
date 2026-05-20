<script lang="ts">
  import { base } from "$app/paths";
  import AuthPrimaryButton from "./auth-primary-button.svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";

  export let emailsEnabled = true;
  let email = "test@example.com";
  let submitted = false;
</script>

<section data-slot="auth-pages" class="mx-auto w-full max-w-md space-y-8 text-foreground">
  <div class="space-y-2 text-center"><h2 class="text-5xl font-extrabold tracking-tight">Coolify</h2><p class="text-lg text-muted-foreground">Forgot password?</p></div>
  <div class="space-y-6">
    {#if emailsEnabled}
      <form class="flex flex-col gap-4" onsubmit={(event) => { event.preventDefault(); submitted = true; }}>
        <FormField forId="forgot-email" label="Email" required><Input id="forgot-email" type="email" autocomplete="email" bind:value={email} /></FormField>
        <AuthPrimaryButton type="submit">Send password reset email</AuthPrimaryButton>
      </form>
      {#if submitted}<div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">Reset link requested for {email}.</div>{/if}
    {:else}
      <div class="rounded-sm border border-warning bg-warning/10 p-4"><div class="flex gap-3"><span class="mt-0.5 text-warning">!</span><div><p class="mb-2 font-bold text-warning">Email Not Configured</p><p class="text-sm text-foreground">Transactional emails are not active on this instance. Configure email or use the manual reset documentation.</p></div></div></div>
    {/if}
    <div class="relative my-6"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-border"></div></div><div class="relative flex justify-center text-sm"><span class="bg-background px-2 text-muted-foreground">Remember your password?</span></div></div>
    <a href={`${base}/pages/login-page`} class="flex min-h-12 w-full items-center justify-center rounded-sm border border-border px-4 py-3 text-center font-medium transition-colors hover:border-primary">Back to Login</a>
  </div>
</section>
