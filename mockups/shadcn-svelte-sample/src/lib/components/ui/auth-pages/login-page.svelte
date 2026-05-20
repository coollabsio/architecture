<script lang="ts">
  import { base } from "$app/paths";
  import { Button } from "$lib/components/ui/button/index.js";
  import AuthPrimaryButton from "./auth-primary-button.svelte";
  import { Input, PasswordInput } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";

  let email = "test@example.com";
  let password = "password";
  let submitted = false;
</script>

<section data-slot="auth-pages" class="mx-auto w-full max-w-md space-y-8 text-foreground">
  <div class="space-y-2 text-center">
    <h2 class="text-5xl font-extrabold tracking-tight">Coolify</h2>
  </div>

  <div class="space-y-6">
    <form class="flex flex-col gap-4" onsubmit={(event) => { event.preventDefault(); submitted = true; }}>
      <FormField forId="login-email" label="Email" required>
        <Input id="login-email" type="email" autocomplete="email" bind:value={email} />
      </FormField>

      <FormField forId="login-password" label="Password" required>
        <PasswordInput id="login-password" autocomplete="current-password" bind:value={password} />
      </FormField>

      <div class="flex items-center justify-between">
        <a href={`${base}/pages/forgot-password-page`} class="rounded-sm text-sm text-muted-foreground transition-colors hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring">Forgot password?</a>
      </div>

      <AuthPrimaryButton type="submit">Login</AuthPrimaryButton>
    </form>

    {#if submitted}
      <div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">Login submitted for {email}.</div>
    {/if}

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-border"></div></div>
      <div class="relative flex justify-center text-sm"><span class="bg-background px-2 text-muted-foreground">Don't have an account?</span></div>
    </div>

    <a href={`${base}/pages/register-page`} class="flex min-h-12 w-full items-center justify-center rounded-sm border border-border px-4 py-3 text-center font-medium transition-colors hover:border-primary">Register now</a>

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-border"></div></div>
      <div class="relative flex justify-center text-sm"><span class="bg-background px-2 text-muted-foreground">or continue with</span></div>
    </div>

    <div class="flex flex-col gap-3">
      <Button class="h-12 w-full justify-center px-4" type="button">Login with GitHub</Button>
      <Button class="h-12 w-full justify-center px-4" type="button">Login with GitLab</Button>
    </div>
  </div>
</section>
