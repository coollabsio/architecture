import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { CommandPalette } from "@/components/ui/command-palette";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SidebarNavbar } from "@/components/ui/sidebar-navbar";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { mockSaveSettings } from "@/lib/query/mock";

export const Route = createFileRoute("/pages/settings-page")({ component: Page });

function Page() {
  const [appName, setAppName] = useState("Coolify");
  const [publicUrl, setPublicUrl] = useState("https://app.example.com");
  const [supportEmail, setSupportEmail] = useState("support@example.com");
  const [timezone, setTimezone] = useState("UTC");
  const [registration, setRegistration] = useState(false);
  const [emailVerification, setEmailVerification] = useState(true);
  const [inviteOnly, setInviteOnly] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [adminEmail, setAdminEmail] = useState("ops@example.com");
  const [updateChannel, setUpdateChannel] = useState("stable");
  const [dirtyAppName, setDirtyAppName] = useState(false);
  const [dirtyPublicUrl, setDirtyPublicUrl] = useState(false);

  const save = useMutation({
    mutationFn: mockSaveSettings,
    onSuccess: () => {
      toast.success("Settings saved");
      setDirtyAppName(false);
      setDirtyPublicUrl(false);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save.mutate({
      appName,
      publicUrl,
      supportEmail,
      timezone,
      registration,
      emailVerification,
      inviteOnly,
      maintenance,
      adminEmail,
      updateChannel,
    });
  }

  return (
    <div className="flex min-h-screen w-full">
      <SidebarNavbar />
      <CommandPalette />
      <form
        onSubmit={handleSubmit}
        className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10"
      >
        <header className="mb-6 flex flex-col gap-4 border-b border-neutral-200 pb-4 dark:border-coolgray-200 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-1 font-mono text-xs font-bold text-coollabs dark:text-warning">
              DESIGN.md → design/pages/settings-page.md
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
              Application settings
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
              Configure instance identity, access policy, and operational
              behavior for the whole application.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="reset">Reset</Button>
            <Button
              variant="highlighted"
              type="submit"
              disabled={save.isPending}
            >
              {save.isPending ? <Spinner /> : null} Save changes
            </Button>
          </div>
        </header>

        <div className="mb-4">
          <Callout title="Instance-wide settings">
            Changes on this page can affect every user and project. Keep helper
            text visible for settings with operational impact.
          </Callout>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-4">
            <section className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
              <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
                <h2 className="text-base font-bold text-black dark:text-white">
                  General
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Identity and public routing values shown across the
                  application.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Application name"
                  helper="Shown in the sidebar brand, auth pages, emails, and browser title."
                >
                  <Input
                    id="app-name"
                    className="dark:bg-app-base"
                    value={appName}
                    dirty={dirtyAppName}
                    onChange={(event) => {
                      setAppName(event.target.value);
                      setDirtyAppName(true);
                    }}
                  />
                </FormField>

                <FormField
                  label="Public URL"
                  helper="Canonical URL used for callbacks, generated links, and email actions."
                >
                  <Input
                    id="public-url"
                    className="dark:bg-app-base"
                    value={publicUrl}
                    dirty={dirtyPublicUrl}
                    onChange={(event) => {
                      setPublicUrl(event.target.value);
                      setDirtyPublicUrl(true);
                    }}
                  />
                </FormField>

                <FormField
                  label="Support email"
                  hint="Used in system emails and account recovery screens."
                >
                  <Input
                    id="support-email"
                    className="dark:bg-app-base"
                    type="email"
                    value={supportEmail}
                    onChange={(event) => setSupportEmail(event.target.value)}
                  />
                </FormField>

                <FormField
                  label="Default timezone"
                  hint="Used for schedules until a user chooses their own timezone."
                >
                  <Select
                    id="timezone"
                    className="dark:bg-app-base"
                    value={timezone}
                    onChange={(event) => setTimezone(event.target.value)}
                  >
                    <option value="UTC">UTC</option>
                    <option value="Europe/Budapest">Europe/Budapest</option>
                    <option value="America/New_York">America/New_York</option>
                  </Select>
                </FormField>
              </div>
            </section>

            <section className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
              <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
                <h2 className="text-base font-bold text-black dark:text-white">
                  Access & registration
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Control who can join this instance and how accounts are
                  verified.
                </p>
              </div>

              <div className="space-y-2">
                <SwitchRow
                  checked={registration}
                  onCheckedChange={setRegistration}
                  label="Allow public registration"
                  description="Anyone with the public URL can create an account."
                />
                <SwitchRow
                  checked={emailVerification}
                  onCheckedChange={setEmailVerification}
                  label="Require email verification"
                  description="New users must verify their email address before using the app."
                />
                <SwitchRow
                  checked={inviteOnly}
                  onCheckedChange={setInviteOnly}
                  label="Invite-only mode"
                  description="Only invited users can join teams and projects."
                />
                <SwitchRow
                  checked={maintenance}
                  onCheckedChange={setMaintenance}
                  label="Maintenance mode"
                  description="Temporarily limit access while operators perform maintenance."
                />
              </div>
            </section>

            <section className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
              <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200">
                <h2 className="text-base font-bold text-black dark:text-white">
                  System notifications
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Keep operators informed about updates, security notices, and
                  failed background jobs.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Admin notification email"
                  hint="Receives update and incident notifications."
                >
                  <Input
                    id="admin-email"
                    className="dark:bg-app-base"
                    type="email"
                    value={adminEmail}
                    onChange={(event) => setAdminEmail(event.target.value)}
                  />
                </FormField>
                <FormField
                  label="Update channel"
                  hint="Controls which release notices appear in the dashboard."
                >
                  <Select
                    id="update-channel"
                    className="dark:bg-app-base"
                    value={updateChannel}
                    onChange={(event) => setUpdateChannel(event.target.value)}
                  >
                    <option value="stable">Stable</option>
                    <option value="preview">Preview</option>
                    <option value="none">None</option>
                  </Select>
                </FormField>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-base font-bold text-black dark:text-white">
                  Instance status
                </h2>
                <Badge variant="success">Healthy</Badge>
              </div>
              <dl className="space-y-3">
                <DescriptionRow term="Version" detail="v4.0.0" />
                <DescriptionRow term="Environment" detail="Production" />
                <DescriptionRow term="Last backup" detail="12 min ago" />
              </dl>
            </section>

            <section className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
              <h2 className="text-base font-bold text-black dark:text-white">
                Maintenance
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Run safe operational actions without leaving the settings
                page.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button type="button">Check for updates</Button>
                <Button type="button">Create backup</Button>
              </div>
            </section>

            <section className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100">
              <h2 className="text-base font-bold text-red-700 dark:text-red-300">
                Danger zone
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Irreversible actions require destructive confirmation. The
                outer card stays neutral.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="destructive" type="button">
                  Rotate instance secret
                </Button>
                <Button variant="destructive" type="button">
                  Reset application
                </Button>
              </div>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}

function SwitchRow({
  checked,
  onCheckedChange,
  label,
  description,
  className,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  description?: string;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex items-start justify-between gap-3 rounded-sm border border-transparent px-2 py-2 hover:bg-neutral-50 dark:hover:bg-coolgray-200/40",
        className
      )}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium text-black dark:text-white">
          {label}
        </span>
        {description && (
          <span className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
            {description}
          </span>
        )}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}

function DescriptionRow({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-sm bg-gray-50 px-3 py-2 dark:bg-app-base">
      <dt className="text-xs text-neutral-500 dark:text-neutral-400">{term}</dt>
      <dd className="text-sm font-medium text-black dark:text-white">
        {detail}
      </dd>
    </div>
  );
}
