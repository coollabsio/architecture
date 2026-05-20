<script lang="ts">
  import { tick } from "svelte";
  import { base } from "$app/paths";
  import AuthPrimaryButton from "$lib/components/ui/auth-pages/auth-primary-button.svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import { cn } from "$lib/utils";

  export let title = "Coolify";
  export let subtitle = "Two-Factor Authentication";

  let showRecovery = false;
  let digits = ["", "", "", "", "", ""];
  let recoveryCode = "";
  let submitted = "";
  let digitInputs: HTMLInputElement[] = [];

  $: code = digits.join("");
  $: isCodeComplete = digits.every((digit) => digit.length === 1);
  $: canSubmit = showRecovery ? recoveryCode.trim().length > 0 : isCodeComplete;

  function setDigit(index: number, value: string) {
    digits[index] = value.replace(/\D/g, "").slice(-1);
    digits = [...digits];
  }

  async function handleInput(index: number, event: Event) {
    setDigit(index, (event.target as HTMLInputElement).value);
    if (digits[index] && index < digitInputs.length - 1) {
      await tick();
      digitInputs[index + 1]?.focus();
    }
  }

  function handleKeydown(index: number, event: KeyboardEvent) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      digitInputs[index - 1]?.focus();
    }
  }

  async function handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData("text") ?? "";
    const pastedDigits = pasted.replace(/\D/g, "").slice(0, 6).split("");
    if (pastedDigits.length === 0) return;

    digits = digits.map((digit, index) => pastedDigits[index] ?? digit);
    await tick();
    digitInputs[Math.min(pastedDigits.length, 6) - 1]?.focus();
  }

  function submit() {
    if (!canSubmit) return;
    submitted = showRecovery ? `Recovery code submitted: ${recoveryCode}` : `Authenticator code submitted: ${code}`;
  }

  async function toggleRecovery() {
    showRecovery = !showRecovery;
    submitted = "";
    await tick();
    if (!showRecovery) digitInputs[0]?.focus();
  }
</script>

<section data-slot="totp-challenge" class="mx-auto w-full max-w-md space-y-6 text-foreground">
  <div class="space-y-2 text-center">
    <h2 class="text-5xl font-extrabold tracking-tight">{title}</h2>
    <p class="text-lg text-muted-foreground">{subtitle}</p>
  </div>

  {#if !showRecovery}
    <div class="rounded-sm border border-border bg-muted p-4">
      <div class="flex gap-3">
        <span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-sm font-bold text-primary" aria-hidden="true">i</span>
        <p class="text-sm text-muted-foreground">Enter the verification code from your authenticator app to continue.</p>
      </div>
    </div>
  {/if}

  <form class="flex flex-col gap-4" onsubmit={(event) => { event.preventDefault(); submit(); }}>
    {#if !showRecovery}
      <div>
        <div class="flex justify-center gap-2" onpaste={handlePaste} aria-label="One-time authenticator code">
          {#each digits as digit, index}
            <input
              bind:this={digitInputs[index]}
              value={digit}
              type="text"
              inputmode="numeric"
              autocomplete={index === 0 ? "one-time-code" : "off"}
              maxlength="1"
              aria-label={`Digit ${index + 1}`}
              class="h-14 w-12 rounded-sm bg-background text-center font-mono text-2xl text-foreground outline-none transition-shadow [box-shadow:inset_0_0_0_1px_var(--input)] focus-visible:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_1px_var(--input)] disabled:cursor-not-allowed disabled:opacity-60"
              oninput={(event) => handleInput(index, event)}
              onkeydown={(event) => handleKeydown(index, event)}
            />
          {/each}
        </div>
        <button type="button" onclick={toggleRecovery} class="mt-4 cursor-pointer text-sm text-primary hover:underline">
          Use recovery code instead
        </button>
      </div>
    {:else}
      <div>
        <label class="mb-1 block text-sm font-medium text-foreground" for="recovery-code">Recovery code</label>
        <Input id="recovery-code" bind:value={recoveryCode} placeholder="example-recovery-code" autocomplete="one-time-code" />
        <button type="button" onclick={toggleRecovery} class="mt-2 cursor-pointer text-sm text-primary hover:underline">
          Use authenticator code instead
        </button>
      </div>
    {/if}

    <AuthPrimaryButton type="submit" disabled={!canSubmit}>Login</AuthPrimaryButton>
  </form>

  {#if submitted}
    <div class="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">{submitted}</div>
  {/if}

  <div class="relative">
    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-border"></div></div>
    <div class="relative flex justify-center text-sm"><span class="bg-background px-2 text-muted-foreground">Need help?</span></div>
  </div>

  <a href={`${base}/pages/login-page`} class={cn("flex min-h-12 w-full items-center justify-center rounded-sm border border-border px-4 py-3 text-center font-medium transition-colors hover:border-primary")}>Back to login</a>
</section>
