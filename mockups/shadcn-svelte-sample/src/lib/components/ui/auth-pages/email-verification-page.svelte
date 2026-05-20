<script lang="ts">
  import { base } from "$app/paths";
  import AuthPrimaryButton from "./auth-primary-button.svelte";
  let resent = false;
</script>

<section data-slot="auth-pages" class="mx-auto w-full max-w-md space-y-8 text-center text-foreground">
  <div class="space-y-2"><h2 class="text-5xl font-extrabold tracking-tight">Coolify</h2><p class="text-lg text-muted-foreground">Verification Email Sent</p></div>
  <div class="space-y-6">
    <div class="rounded-sm border border-border bg-muted p-4 text-left"><div class="flex gap-3"><span class="mt-0.5 font-bold text-primary">i</span><p class="text-sm text-muted-foreground">To activate your account, please open the email and follow the instructions.</p></div></div>
    <AuthPrimaryButton type="button" onclick={() => (resent = true)}>Resend verification email</AuthPrimaryButton>
    {#if resent}<div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">Verification email requested again.</div>{/if}
    <a href={`${base}/pages/login-page`} class="flex min-h-12 w-full items-center justify-center rounded-sm border border-border px-4 py-3 text-center font-medium transition-colors hover:border-primary">Back to Login</a>
  </div>
</section>
