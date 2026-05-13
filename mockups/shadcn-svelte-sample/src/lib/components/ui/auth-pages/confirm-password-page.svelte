<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { PasswordInput } from "$lib/components/ui/input/index.js";
  import { FormField } from "$lib/components/ui/form-field/index.js";

  let password = "";
  let submitted = false;
</script>

<section class="mx-auto w-full max-w-md space-y-8 text-black dark:text-white">
  <div class="space-y-2 text-center"><h2 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Coolify</h2><p class="text-lg text-neutral-600 dark:text-neutral-400">Confirm Your Password</p></div>
  <div class="space-y-6">
    <div class="rounded-sm border border-neutral-200 bg-neutral-50 p-4 dark:border-coolgray-300 dark:bg-coolgray-100"><div class="flex gap-3"><span class="mt-0.5 font-bold text-coollabs dark:text-warning">i</span><p class="text-sm text-neutral-700 dark:text-neutral-400">This is a secure area. Please confirm your password before continuing.</p></div></div>
    <form class="flex flex-col gap-4" onsubmit={(event) => { event.preventDefault(); submitted = true; }}>
      <FormField forId="confirm-password" label="Password" required><PasswordInput id="confirm-password" autocomplete="current-password" bind:value={password} /></FormField>
      <Button class="h-12 w-full justify-center py-3 text-base font-bold" type="submit" variant="highlighted" disabled={password.length === 0}>Confirm password</Button>
    </form>
    {#if submitted}<div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">Password confirmation submitted.</div>{/if}
  </div>
</section>
