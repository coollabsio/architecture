import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import {
  AuthCard,
  AuthDivider,
  AuthHeader,
  AuthInfoBox,
  AuthPrimaryButton,
  AuthSecondaryLink,
  AuthSuccess,
} from "./auth-shell";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface TotpChallengeProps {
  title?: string;
  subtitle?: string;
  length?: number;
  backHref?: string;
}

export function TotpChallenge({
  title = "Coolify",
  subtitle = "Two-Factor Authentication",
  length = 6,
  backHref = "/pages/login-page",
}: TotpChallengeProps) {
  const [showRecovery, setShowRecovery] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const [recoveryCode, setRecoveryCode] = useState("");
  const [submitted, setSubmitted] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const isCodeComplete = digits.every((d) => d.length === 1);
  const canSubmit = showRecovery
    ? recoveryCode.trim().length > 0
    : isCodeComplete;
  const code = digits.join("");

  function setDigit(index: number, value: string) {
    const cleaned = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => prev.map((d, i) => (i === index ? cleaned : d)));
  }

  function handleInput(index: number, value: string) {
    setDigit(index, value);
    const cleaned = value.replace(/\D/g, "").slice(-1);
    if (cleaned && index < length - 1) {
      // focus next on the next tick so state has applied
      window.requestAnimationFrame(() => inputs.current[index + 1]?.focus());
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData("text") ?? "";
    const pastedDigits = pasted.replace(/\D/g, "").slice(0, length).split("");
    if (pastedDigits.length === 0) return;
    setDigits((prev) =>
      prev.map((d, i) => (pastedDigits[i] !== undefined ? pastedDigits[i] : d))
    );
    window.requestAnimationFrame(() =>
      inputs.current[Math.min(pastedDigits.length, length) - 1]?.focus()
    );
  }

  function submit() {
    if (!canSubmit) return;
    setSubmitted(
      showRecovery
        ? `Recovery code submitted: ${recoveryCode}`
        : `Authenticator code submitted: ${code}`
    );
  }

  function toggleRecovery() {
    setShowRecovery((prev) => !prev);
    setSubmitted("");
  }

  useEffect(() => {
    if (!showRecovery) {
      window.requestAnimationFrame(() => inputs.current[0]?.focus());
    }
  }, [showRecovery]);

  return (
    <AuthCard className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-5xl font-extrabold tracking-tight">{title}</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {subtitle}
        </p>
      </div>

      {!showRecovery && (
        <AuthInfoBox>
          Enter the verification code from your authenticator app to continue.
        </AuthInfoBox>
      )}

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        {!showRecovery ? (
          <div>
            <div
              className="flex justify-center gap-2"
              onPaste={handlePaste}
              aria-label="One-time authenticator code"
            >
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputs.current[index] = el;
                  }}
                  value={digit}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  aria-label={`Digit ${index + 1}`}
                  className="h-14 w-12 rounded-sm border-2 border-neutral-200 bg-white text-center text-2xl font-bold text-black outline-none transition-colors focus:border-coollabs disabled:cursor-not-allowed disabled:opacity-60 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white dark:focus:border-warning"
                  onChange={(event) => handleInput(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={toggleRecovery}
              className="mt-4 cursor-pointer text-sm text-neutral-600 transition-colors hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-white"
            >
              Use recovery code instead
            </button>
          </div>
        ) : (
          <div>
            <label
              className="mb-1 block text-sm font-medium text-black dark:text-white"
              htmlFor="recovery-code"
            >
              Recovery code
            </label>
            <Input
              id="recovery-code"
              value={recoveryCode}
              onChange={(event) => setRecoveryCode(event.target.value)}
              placeholder="example-recovery-code"
              autoComplete="one-time-code"
            />
            <button
              type="button"
              onClick={toggleRecovery}
              className="mt-2 cursor-pointer text-sm text-neutral-600 transition-colors hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-white"
            >
              Use authenticator code instead
            </button>
          </div>
        )}

        <AuthPrimaryButton type="submit" disabled={!canSubmit}>
          Login
        </AuthPrimaryButton>
      </form>

      {submitted && <AuthSuccess>{submitted}</AuthSuccess>}

      <AuthDivider>Need help?</AuthDivider>

      <AuthSecondaryLink href={backHref} className={cn()}>
        Back to login
      </AuthSecondaryLink>
    </AuthCard>
  );
}
