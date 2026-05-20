import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "@/components/ui/auth-shell";
import { TotpChallenge } from "@/components/ui/totp-challenge";

export const Route = createFileRoute("/pages/totp-challenge")({
  component: Page,
});

function Page() {
  return (
    <AuthShell>
      <TotpChallenge />
    </AuthShell>
  );
}
