import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AuthCard,
  AuthInfoBox,
  AuthPrimaryButton,
  AuthSecondaryLink,
  AuthShell,
  AuthSuccess,
} from "@/components/ui/auth-shell";

export const Route = createFileRoute("/pages/email-verification-page")({
  component: Page,
});

function Page() {
  const [resent, setResent] = useState(false);

  return (
    <AuthShell>
      <AuthCard className="text-center">
        <div className="space-y-2">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Coolify
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Verification Email Sent
          </p>
        </div>
        <div className="space-y-6">
          <AuthInfoBox className="text-left">
            To activate your account, please open the email and follow the
            instructions.
          </AuthInfoBox>
          <AuthPrimaryButton type="button" onClick={() => setResent(true)}>
            Resend verification email
          </AuthPrimaryButton>
          {resent && (
            <AuthSuccess>Verification email requested again.</AuthSuccess>
          )}
          <AuthSecondaryLink href="/pages/login-page">
            Back to Login
          </AuthSecondaryLink>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
