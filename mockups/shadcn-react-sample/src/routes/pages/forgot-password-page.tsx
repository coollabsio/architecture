import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
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

export const Route = createFileRoute("/pages/forgot-password-page")({
  component: Page,
});

function Page() {
  const emailsEnabled = true;
  const [email, setEmail] = useState("test@example.com");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader subtitle="Forgot password?" />

        <div className="space-y-6">
          {emailsEnabled ? (
            <>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <FormField label="Email" required>
                  <Input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormField>
                <AuthPrimaryButton type="submit">
                  Send password reset email
                </AuthPrimaryButton>
              </form>
              {submitted && (
                <AuthSuccess>Reset link requested for {email}.</AuthSuccess>
              )}
            </>
          ) : (
            <div className="rounded-sm border border-warning bg-warning/10 p-4">
              <div className="flex gap-3">
                <span className="mt-0.5 text-warning">!</span>
                <div>
                  <p className="mb-2 font-bold text-warning">
                    Email Not Configured
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    Transactional emails are not active on this instance.
                    Configure email or use the manual reset documentation.
                  </p>
                </div>
              </div>
            </div>
          )}

          <AuthDivider>Remember your password?</AuthDivider>

          <AuthSecondaryLink href="/pages/login-page">
            Back to Login
          </AuthSecondaryLink>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
