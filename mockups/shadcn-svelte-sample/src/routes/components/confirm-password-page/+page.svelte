<script lang="ts">
  import { ConfirmPasswordPage } from "$lib/components/ui/auth-pages/index.js";
</script>

<svelte:head><title>Coolify V2 Confirm password page sample</title></svelte:head>

<main class="min-h-screen bg-gray-50 px-6 py-8 dark:bg-base">
  <section class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">
    <div class="w-full rounded-sm border border-neutral-200 bg-gray-50 p-4 dark:border-coolgray-300 dark:bg-base">
      <p class="mb-4 font-mono text-xs font-bold text-coollabs dark:text-warning">DESIGN_V2.md → design/auth/confirm-password-page.md</p>
      <ConfirmPasswordPage />
    </div>
  </section>
</main>
