<script lang="ts">
  import AuthPrimaryButton from "./auth-primary-button.svelte";
  import { Input, PasswordInput } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";

  export let firstUser = true;

  let name = "test normal user";
  let email = "test@example.com";
  let password = "";
  let passwordConfirmation = "";
  let submitted = false;

  $: passwordMismatch = passwordConfirmation.length > 0 && password !== passwordConfirmation ? "Passwords must match." : "";
  $: canSubmit = name.length > 0 && email.length > 0 && password.length >= 8 && password === passwordConfirmation;
</script>

<section class="mx-auto w-full max-w-md space-y-8 text-black dark:text-white">
  <div class="space-y-2 text-center">
    <h2 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Coolify</h2>
    <p class="text-lg text-neutral-600 dark:text-neutral-400">Create your account</p>
  </div>

  <div class="space-y-6">
    {#if firstUser}
      <div class="rounded-sm border border-warning bg-warning/10 p-4">
        <div class="flex gap-3">
          <span class="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true">✓</span>
          <div>
            <p class="font-bold text-warning">Root User Setup</p>
            <p class="text-sm text-black dark:text-white">This user will be the root user with full admin access.</p>
          </div>
        </div>
      </div>
    {/if}

    <form class="flex flex-col gap-4" onsubmit={(event) => { event.preventDefault(); submitted = true; }}>
      <FormField forId="register-name" label="Name" required>
        <Input id="register-name" autocomplete="name" bind:value={name} />
      </FormField>

      <FormField forId="register-email" label="Email" required>
        <Input id="register-email" type="email" autocomplete="email" bind:value={email} />
      </FormField>

      <FormField forId="register-password" label="Password" required>
        <PasswordInput id="register-password" autocomplete="new-password" bind:value={password} />
      </FormField>

      <FormField forId="register-password-confirmation" label="Password again" required error={passwordMismatch || undefined}>
        <PasswordInput id="register-password-confirmation" autocomplete="new-password" bind:value={passwordConfirmation} aria-invalid={!!passwordMismatch} />
      </FormField>

      <div class="rounded-sm border border-neutral-200 bg-neutral-50 p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
        <p class="text-xs text-neutral-600 dark:text-neutral-400">Your password should be min 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.</p>
      </div>

      <AuthPrimaryButton class="mt-2" type="submit" disabled={!canSubmit}>Create Account</AuthPrimaryButton>
    </form>

    {#if submitted}
      <div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">Account creation submitted for {email}.</div>
    {/if}

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-neutral-300 dark:border-coolgray-300"></div></div>
      <div class="relative flex justify-center text-sm"><span class="bg-gray-50 px-2 text-neutral-500 dark:bg-base dark:text-neutral-400">Already have an account?</span></div>
    </div>

    <a href="/pages/login-page" class="block w-full rounded-sm border border-neutral-300 px-4 py-3 text-center font-medium transition-colors hover:border-coollabs dark:border-coolgray-300 dark:hover:border-warning">Already registered?</a>
  </div>
</section>
