<script lang="ts">
  import AuthPrimaryButton from "./auth-primary-button.svelte";
  import { PasswordInput } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";

  let password = "";
  let passwordConfirmation = "";
  let submitted = false;
  $: mismatch = passwordConfirmation.length > 0 && password !== passwordConfirmation ? "Passwords must match." : "";
  $: canSubmit = password.length >= 8 && password === passwordConfirmation;
</script>

<section class="mx-auto w-full max-w-md space-y-8 text-black dark:text-white">
  <div class="space-y-2 text-center"><h2 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Coolify</h2><p class="text-lg text-neutral-600 dark:text-neutral-400">Reset password</p></div>
  <div class="space-y-6">
    <p class="text-sm text-neutral-600 dark:text-neutral-400">Enter your new password below. Make sure it's strong and secure.</p>
    <form class="flex flex-col gap-4" onsubmit={(event) => { event.preventDefault(); submitted = true; }}>
      <FormField forId="reset-password" label="Password" required><PasswordInput id="reset-password" autocomplete="new-password" bind:value={password} /></FormField>
      <FormField forId="reset-password-confirmation" label="Password again" required error={mismatch || undefined}><PasswordInput id="reset-password-confirmation" autocomplete="new-password" bind:value={passwordConfirmation} aria-invalid={!!mismatch} /></FormField>
      <div class="rounded-sm border border-neutral-200 bg-neutral-50 p-4 dark:border-coolgray-300 dark:bg-coolgray-100"><p class="text-xs text-neutral-600 dark:text-neutral-400">Your password should be min 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.</p></div>
      <AuthPrimaryButton class="mt-2" type="submit" disabled={!canSubmit}>Reset password</AuthPrimaryButton>
    </form>
    {#if submitted}<div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">Password reset submitted.</div>{/if}
    <div class="relative my-6"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-neutral-300 dark:border-coolgray-300"></div></div><div class="relative flex justify-center text-sm"><span class="bg-gray-50 px-2 text-neutral-500 dark:bg-app-base dark:text-neutral-400">Remember your password?</span></div></div>
    <a href="/pages/login-page" class="flex min-h-12 w-full items-center justify-center rounded-sm border border-neutral-300 px-4 py-3 text-center font-medium transition-colors hover:border-coollabs dark:border-coolgray-300 dark:hover:border-warning">Back to Login</a>
  </div>
</section>
