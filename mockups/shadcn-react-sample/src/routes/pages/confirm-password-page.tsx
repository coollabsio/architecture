import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PasswordInput } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import {
  AuthCard,
  AuthHeader,
  AuthInfoBox,
  AuthPrimaryButton,
  AuthShell,
  AuthSuccess,
} from "@/components/ui/auth-shell";

export const Route = createFileRoute("/pages/confirm-password-page")({
  component: Page,
});

function Page() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader subtitle="Confirm Your Password" />

        <div className="space-y-6">
          <AuthInfoBox>
            This is a secure area. Please confirm your password before
            continuing.
          </AuthInfoBox>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormField label="Password" required>
              <PasswordInput
                id="confirm-password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>
            <AuthPrimaryButton type="submit" disabled={password.length === 0}>
              Confirm password
            </AuthPrimaryButton>
          </form>
          {submitted && (
            <AuthSuccess>Password confirmation submitted.</AuthSuccess>
          )}
        </div>
      </AuthCard>
    </AuthShell>
  );
}
