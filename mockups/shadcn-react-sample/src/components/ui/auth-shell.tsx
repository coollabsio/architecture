import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * Outer auth page wrapper for the Coolify auth-pages compositions:
 * a centered column with `max-w-md` content, page background, vertical
 * centering, and the Coolify brand wordmark provided by the caller.
 */
export function AuthShell({ children, className }: AuthShellProps) {
  return (
    <main data-slot="auth-shell" className="min-h-screen bg-background px-6 py-8">
      <section
        className={cn(
          "mx-auto flex min-h-[calc(100vh-4rem)] w-full items-center justify-center sm:min-h-[calc(100vh-10rem)]",
          className
        )}
      >
        {children}
      </section>
    </main>
  );
}

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * The inner `max-w-md` auth column (header + form/content).
 */
export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <section
      data-slot="auth-card"
      className={cn(
        "mx-auto w-full max-w-md space-y-8 text-foreground",
        className
      )}
    >
      {children}
    </section>
  );
}

interface AuthHeaderProps {
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function AuthHeader({ subtitle, align = "center", className }: AuthHeaderProps) {
  return (
    <div
      data-slot="auth-header"
      className={cn(
        "space-y-2",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-5xl font-extrabold tracking-tight text-foreground">
        Coolify
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

interface AuthPrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Tall full-width highlighted submit button used by auth screens.
 * Implements the `auth-primary-button` spec from `design/auth/`.
 * Delegates to the shared `Button` primitive with `variant="highlighted"`.
 */
export function AuthPrimaryButton({
  className,
  type = "submit",
  children,
  ...props
}: AuthPrimaryButtonProps) {
  return (
    <Button
      data-slot="auth-primary-button"
      variant="highlighted"
      type={type}
      className={cn("h-12 w-full justify-center px-4", className)}
      {...props}
    >
      {children}
    </Button>
  );
}

interface AuthDividerProps {
  children: ReactNode;
  className?: string;
}

export function AuthDivider({ children, className }: AuthDividerProps) {
  return (
    <div data-slot="auth-divider" className={cn("relative my-6", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-background px-2 text-muted-foreground">
          {children}
        </span>
      </div>
    </div>
  );
}

interface AuthSecondaryLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

/**
 * Tall full-width neutral link used for "back to login" / "register now" etc.
 * Renders as a plain anchor so external auth flows can stay outside TanStack Router.
 */
export function AuthSecondaryLink({
  className,
  children,
  ...props
}: AuthSecondaryLinkProps) {
  return (
    <a
      data-slot="auth-secondary-link"
      className={cn(
        "flex min-h-12 w-full items-center justify-center rounded-sm border border-border px-4 py-3 text-center font-medium text-foreground transition-colors hover:border-primary",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

interface AuthSuccessProps {
  children: ReactNode;
  className?: string;
}

export function AuthSuccess({ children, className }: AuthSuccessProps) {
  return (
    <div
      data-slot="auth-success"
      className={cn(
        "rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300",
        className
      )}
    >
      {children}
    </div>
  );
}

interface AuthInfoBoxProps {
  children: ReactNode;
  variant?: "info" | "warning";
  icon?: ReactNode;
  className?: string;
}

/**
 * Neutral info/warning bordered box used on confirm/email-verification/forgot
 * pages. Default variant uses muted surface + primary leading icon.
 */
export function AuthInfoBox({
  children,
  variant = "info",
  icon,
  className,
}: AuthInfoBoxProps) {
  if (variant === "warning") {
    return (
      <div
        data-slot="auth-info-box"
        data-variant="warning"
        className={cn(
          "rounded-sm border border-warning bg-warning/10 p-4",
          className
        )}
      >
        <div className="flex gap-3">
          <span className="mt-0.5 font-bold text-warning" aria-hidden="true">
            {icon ?? "!"}
          </span>
          <div>{children}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      data-slot="auth-info-box"
      data-variant="info"
      className={cn(
        "rounded-sm border border-border bg-muted p-4 text-muted-foreground",
        className
      )}
    >
      <div className="flex gap-3">
        <span
          className="mt-0.5 font-bold text-primary"
          aria-hidden="true"
        >
          {icon ?? "i"}
        </span>
        <div className="text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
