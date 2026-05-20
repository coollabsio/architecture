import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PasswordInput } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import {
  AuthCard,
  AuthDivider,
  AuthHeader,
  AuthInfoBox,
  AuthPrimaryButton,
  AuthSecondaryLink,
  AuthShell,
  AuthSuccess,
} from "@/components/ui/auth-shell";

export const Route = createFileRoute("/pages/reset-password-page")({
  component: Page,
});

function Page() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mismatch =
    passwordConfirmation.length > 0 && password !== passwordConfirmation
      ? "Passwords must match."
      : "";
  const canSubmit = password.length >= 8 && password === passwordConfirmation;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader subtitle="Reset password" />

        <div className="space-y-6">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Enter your new password below. Make sure it's strong and secure.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormField label="Password" required>
              <PasswordInput
                id="reset-password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>
            <FormField
              label="Password again"
              required
              error={mismatch || undefined}
            >
              <PasswordInput
                id="reset-password-confirmation"
                autoComplete="new-password"
                value={passwordConfirmation}
                aria-invalid={mismatch ? true : undefined}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
              />
            </FormField>
            <AuthInfoBox>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Your password should be min 8 characters long and contain at
                least one uppercase letter, one lowercase letter, one number,
                and one symbol.
              </p>
            </AuthInfoBox>
            <AuthPrimaryButton
              className="mt-2"
              type="submit"
              disabled={!canSubmit}
            >
              Reset password
            </AuthPrimaryButton>
          </form>
          {submitted && <AuthSuccess>Password reset submitted.</AuthSuccess>}

          <AuthDivider>Remember your password?</AuthDivider>

          <AuthSecondaryLink href="/pages/login-page">
            Back to Login
          </AuthSecondaryLink>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
