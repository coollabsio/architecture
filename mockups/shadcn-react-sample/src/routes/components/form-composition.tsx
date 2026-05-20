import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/form-composition")({ component: Page });

type Example = "interactive" | "success" | "error";

const domainPattern = /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[0-9][0-9\s().-]{6,19}$/;

export function FormComposition({ example = "interactive" }: { example?: Example }) {
  const [name, setName] = useState(example === "interactive" ? "" : "production-api");
  const [domain, setDomain] = useState(example === "error" ? "not-a-domain" : "api.example.com");
  const [email, setEmail] = useState(example === "error" ? "ops@" : "ops@example.com");
  const [phone, setPhone] = useState("+1 555 123 4567");
  const [submitted, setSubmitted] = useState(example !== "interactive");
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    example === "interactive" ? "idle" : example
  );

  const nameError = useMemo(() => {
    if (submitted && name.length === 0) return "Name is required.";
    if (name.length > 0 && name.length < 3) return "Name must be at least 3 characters.";
    return "";
  }, [submitted, name]);

  const domainError = useMemo(() => {
    if (submitted && domain.length === 0) return "Domain is required.";
    if (domain.length > 0 && !domainPattern.test(domain))
      return "Enter a valid domain, for example api.example.com.";
    return "";
  }, [submitted, domain]);

  const emailError = useMemo(() => {
    if (submitted && email.length === 0) return "Notification email is required.";
    if (email.length > 0 && !emailPattern.test(email))
      return "Enter a valid email, for example ops@example.com.";
    return "";
  }, [submitted, email]);

  const phoneError = useMemo(() => {
    if (phone.length > 0 && !phonePattern.test(phone))
      return "Enter a valid phone number, for example +1 555 123 4567.";
    return "";
  }, [phone]);

  const canSave =
    name.length >= 3 &&
    !nameError &&
    domain.length > 0 &&
    !domainError &&
    email.length > 0 &&
    !emailError &&
    !phoneError;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setSubmitState(canSave ? "success" : "error");
  }

  return (
    <form
      className="space-y-4 rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-300 dark:bg-coolgray-100"
      onSubmit={handleSubmit}
    >
      <div className="border-b border-neutral-200 pb-3 dark:border-coolgray-300">
        <h2 className="text-xl font-bold text-black dark:text-white">Resource settings</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {example === "success"
            ? "Saved form state with persistent confirmation."
            : example === "error"
              ? "Failed submit state with form-level and field-level errors."
              : "Interactive validation example with dirty fields and submit feedback."}
        </p>
      </div>

      {submitState === "success" && (
        <Alert variant="success" aria-live="polite">
          <strong className="block">Settings saved</strong>
          Your resource settings were saved. Keep the form in place and confirm the saved state inline.
        </Alert>
      )}
      {submitState === "error" && (
        <Alert variant="destructive" role="alert">
          <strong className="block">Could not save settings</strong>
          Fix the highlighted fields below, then save again. Server-side errors use the same compact form-level placement.
        </Alert>
      )}

      <FormField
        forId="name"
        label="Name"
        required
        helper="Used in resource lists and URLs."
        error={nameError || undefined}
      >
        <Input
          id="name"
          className="dark:bg-app-base"
          value={name}
          onChange={(e) => setName(e.target.value)}
          dirty={name.length > 0}
          aria-invalid={!!nameError}
          placeholder="production-api"
        />
      </FormField>

      <FormField
        forId="domain"
        label="Domain"
        helper="Public hostname for this resource."
        error={domainError || undefined}
      >
        <Input
          id="domain"
          className="dark:bg-app-base"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          dirty={domain !== "api.example.com"}
          aria-invalid={!!domainError}
        />
      </FormField>

      <FormField
        forId="email"
        label="Notification email"
        required
        helper="Receives deployment and validation alerts."
        error={emailError || undefined}
      >
        <Input
          id="email"
          className="dark:bg-app-base"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dirty={email !== "ops@example.com"}
          aria-invalid={!!emailError}
        />
      </FormField>

      <FormField
        forId="phone"
        label="Escalation phone"
        helper="Optional international number for urgent alerts."
        error={phoneError || undefined}
      >
        <Input
          id="phone"
          className="dark:bg-app-base"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          dirty={phone !== "+1 555 123 4567"}
          aria-invalid={!!phoneError}
        />
      </FormField>

      <div className="flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-coolgray-300">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Dirty fields show the left accent bar. Submit feedback stays inline.
        </p>
        <Button type="submit" variant="highlighted">
          Save
        </Button>
      </div>
    </form>
  );
}

function Page() {
  return (
    <Showcase
      title="Form composition / validation sample"
      designDoc="DESIGN.md → design/forms/form-composition.md"
      description="Required markers, helper text, dirty state, errors, save action, and separate submitted feedback layouts."
    >
      <section
        className="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200"
        aria-labelledby="interactive-form-title"
      >
        <div className="mb-3">
          <h2 id="interactive-form-title" className="text-base font-bold text-black dark:text-white">
            Interactive validation
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Default editable form. Submit empty or invalid values to preview field and form-level errors.
          </p>
        </div>
        <FormComposition />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section
          className="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200"
          aria-labelledby="success-form-title"
        >
          <div className="mb-3">
            <h2 id="success-form-title" className="text-base font-bold text-black dark:text-white">
              Success / saved state
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Persistent confirmation sits below the form header and above fields.
            </p>
          </div>
          <FormComposition example="success" />
        </section>

        <section
          className="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-coolgray-200"
          aria-labelledby="error-form-title"
        >
          <div className="mb-3">
            <h2 id="error-form-title" className="text-base font-bold text-black dark:text-white">
              Error / failed submit state
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Form-level failure summarizes the issue while fields keep specific messages.
            </p>
          </div>
          <FormComposition example="error" />
        </section>
      </div>
    </Showcase>
  );
}
