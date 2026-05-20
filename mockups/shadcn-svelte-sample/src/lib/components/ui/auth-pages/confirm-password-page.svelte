<script lang="ts">
  import AuthPrimaryButton from "./auth-primary-button.svelte";
  import { PasswordInput } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";

  let password = "";
  let submitted = false;
</script>

<section data-slot="auth-pages" class="mx-auto w-full max-w-md space-y-8 text-foreground">
  <div class="space-y-2 text-center"><h2 class="text-5xl font-extrabold tracking-tight">Coolify</h2><p class="text-lg text-muted-foreground">Confirm Your Password</p></div>
  <div class="space-y-6">
    <div class="rounded-sm border border-border bg-muted p-4"><div class="flex gap-3"><span class="mt-0.5 font-bold text-primary">i</span><p class="text-sm text-muted-foreground">This is a secure area. Please confirm your password before continuing.</p></div></div>
    <form class="flex flex-col gap-4" onsubmit={(event) => { event.preventDefault(); submitted = true; }}>
      <FormField forId="confirm-password" label="Password" required><PasswordInput id="confirm-password" autocomplete="current-password" bind:value={password} /></FormField>
      <AuthPrimaryButton type="submit" disabled={password.length === 0}>Confirm password</AuthPrimaryButton>
    </form>
    {#if submitted}<div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">Password confirmation submitted.</div>{/if}
  </div>
</section>
