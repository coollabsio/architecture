<script lang="ts">
  import { EmailVerificationPage } from "$lib/components/ui/auth-pages/index.js";
</script>

<svelte:head><title>Coolify Email verification page sample</title></svelte:head>

<main class="min-h-screen bg-gray-50 px-6 py-8 dark:bg-base">
  <section class="mx-auto flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
    <EmailVerificationPage />
  </section>
</main>
