<script lang="ts">
  import { TotpChallenge } from "$lib/components/ui/totp-challenge/index.js";
</script>

<svelte:head><title>Coolify V2 TOTP challenge sample</title></svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
  <section class="w-full rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
    <div class="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
      <p class="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN_V2.md → design/auth/totp-challenge.md</p>
      <h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">TOTP / one-time token challenge</h1>
      <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Six-digit authenticator entry, paste support, recovery-code fallback, and Coolify auth-page density.</p>
    </div>
    <div class="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-base">
      <TotpChallenge />
    </div>
  </section>
</main>
