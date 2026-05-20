import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Input, PasswordInput } from "@/components/ui/input";
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

export const Route = createFileRoute("/pages/register-page")({ component: Page });

function Page() {
  const firstUser = true;
  const [name, setName] = useState("test normal user");
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const passwordMismatch =
    passwordConfirmation.length > 0 && password !== passwordConfirmation
      ? "Passwords must match."
      : "";
  const canSubmit =
    name.length > 0 &&
    email.length > 0 &&
    password.length >= 8 &&
    password === passwordConfirmation;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader subtitle="Create your account" />

        <div className="space-y-6">
          {firstUser && (
            <div className="rounded-sm border border-warning bg-warning/10 p-4">
              <div className="flex gap-3">
                <span
                  className="mt-0.5 size-5 shrink-0 text-warning"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div>
                  <p className="font-bold text-warning">Root User Setup</p>
                  <p className="text-sm text-black dark:text-white">
                    This user will be the root user with full admin access.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormField label="Name" required>
              <Input
                id="register-name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormField>

            <FormField label="Email" required>
              <Input
                id="register-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>

            <FormField label="Password" required>
              <PasswordInput
                id="register-password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>

            <FormField
              label="Password again"
              required
              error={passwordMismatch || undefined}
            >
              <PasswordInput
                id="register-password-confirmation"
                autoComplete="new-password"
                value={passwordConfirmation}
                aria-invalid={passwordMismatch ? true : undefined}
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
              Create Account
            </AuthPrimaryButton>
          </form>

          {submitted && (
            <AuthSuccess>Account creation submitted for {email}.</AuthSuccess>
          )}

          <AuthDivider>Already have an account?</AuthDivider>

          <AuthSecondaryLink href="/pages/login-page">
            Already registered?
          </AuthSecondaryLink>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
