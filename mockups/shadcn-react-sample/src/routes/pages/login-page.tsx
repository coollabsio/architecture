import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import {
  AuthCard,
  AuthDivider,
  AuthHeader,
  AuthPrimaryButton,
  AuthSecondaryLink,
  AuthShell,
  AuthSuccess,
} from "@/components/ui/auth-shell";

export const Route = createFileRoute("/pages/login-page")({ component: Page });

function Page() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader />

        <div className="space-y-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormField label="Email" required>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>

            <FormField label="Password" required>
              <PasswordInput
                id="login-password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>

            <div className="flex items-center justify-between">
              <a
                href="/pages/forgot-password-page"
                className="rounded-sm text-sm text-neutral-600 transition-colors hover:text-coollabs hover:underline focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:text-warning dark:focus-visible:ring-warning"
              >
                Forgot password?
              </a>
            </div>

            <AuthPrimaryButton type="submit">Login</AuthPrimaryButton>
          </form>

          {submitted && (
            <AuthSuccess>Login submitted for {email}.</AuthSuccess>
          )}

          <AuthDivider>Don't have an account?</AuthDivider>

          <AuthSecondaryLink href="/pages/register-page">
            Register now
          </AuthSecondaryLink>

          <AuthDivider>or continue with</AuthDivider>

          <div className="flex flex-col gap-3">
            <Button className="h-12 w-full justify-center px-4" type="button">
              Login with GitHub
            </Button>
            <Button className="h-12 w-full justify-center px-4" type="button">
              Login with GitLab
            </Button>
          </div>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
