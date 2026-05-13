<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input, PasswordInput } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";

  let email = "test@example.com";
  let password = "password";
  let submitted = false;
</script>

<section class="mx-auto w-full max-w-md space-y-8 text-black dark:text-white">
  <div class="space-y-2 text-center">
    <h2 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Coolify</h2>
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
        <a href="/pages/forgot-password-page" class="rounded-sm text-sm text-neutral-600 transition-colors hover:text-coollabs hover:underline focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:text-warning dark:focus-visible:ring-warning">Forgot password?</a>
      </div>

      <Button class="h-12 w-full justify-center py-3 text-base font-bold" variant="highlighted" type="submit">Login</Button>
    </form>

    {#if submitted}
      <div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">Login submitted for {email}.</div>
    {/if}

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-neutral-300 dark:border-coolgray-300"></div></div>
      <div class="relative flex justify-center text-sm"><span class="bg-gray-50 px-2 text-neutral-500 dark:bg-base dark:text-neutral-400">Don't have an account?</span></div>
    </div>

    <a href="/pages/register-page" class="block w-full rounded-sm border border-neutral-300 px-4 py-3 text-center font-medium transition-colors hover:border-coollabs dark:border-coolgray-300 dark:hover:border-warning">Register now</a>

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-neutral-300 dark:border-coolgray-300"></div></div>
      <div class="relative flex justify-center text-sm"><span class="bg-gray-50 px-2 text-neutral-500 dark:bg-base dark:text-neutral-400">or continue with</span></div>
    </div>

    <div class="flex flex-col gap-3">
      <Button class="w-full justify-center" type="button">Login with GitHub</Button>
      <Button class="w-full justify-center" type="button">Login with GitLab</Button>
    </div>
  </div>
</section>
