<script lang="ts">
  import AuthPrimaryButton from "./auth-primary-button.svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";

  export let emailsEnabled = true;
  let email = "test@example.com";
  let submitted = false;
</script>

<section class="mx-auto w-full max-w-md space-y-8 text-black dark:text-white">
  <div class="space-y-2 text-center"><h2 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Coolify</h2><p class="text-lg text-neutral-600 dark:text-neutral-400">Forgot password?</p></div>
  <div class="space-y-6">
    {#if emailsEnabled}
      <form class="flex flex-col gap-4" onsubmit={(event) => { event.preventDefault(); submitted = true; }}>
        <FormField forId="forgot-email" label="Email" required><Input id="forgot-email" type="email" autocomplete="email" bind:value={email} /></FormField>
        <AuthPrimaryButton type="submit">Send password reset email</AuthPrimaryButton>
      </form>
      {#if submitted}<div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">Reset link requested for {email}.</div>{/if}
    {:else}
      <div class="rounded-sm border border-warning bg-warning/10 p-4"><div class="flex gap-3"><span class="mt-0.5 text-warning">!</span><div><p class="mb-2 font-bold text-warning">Email Not Configured</p><p class="text-sm text-black dark:text-white">Transactional emails are not active on this instance. Configure email or use the manual reset documentation.</p></div></div></div>
    {/if}
    <div class="relative my-6"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-neutral-300 dark:border-coolgray-300"></div></div><div class="relative flex justify-center text-sm"><span class="bg-gray-50 px-2 text-neutral-500 dark:bg-app-base dark:text-neutral-400">Remember your password?</span></div></div>
    <a href="/pages/login-page" class="flex min-h-12 w-full items-center justify-center rounded-sm border border-neutral-300 px-4 py-3 text-center font-medium transition-colors hover:border-coollabs dark:border-coolgray-300 dark:hover:border-warning">Back to Login</a>
  </div>
</section>
