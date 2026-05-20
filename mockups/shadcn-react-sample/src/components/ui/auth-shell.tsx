import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * Outer auth page wrapper for the Coolify auth-pages compositions:
 * a centered column with `max-w-md` content, gray-50 / app-base background,
 * vertical centering, and the Coolify brand wordmark provided by the caller.
 */
export function AuthShell({ children, className }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8 dark:bg-app-base">
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
      className={cn(
        "mx-auto w-full max-w-md space-y-8 text-black dark:text-white",
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
      className={cn(
        "space-y-2",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Coolify
      </h2>
      {subtitle && (
        <p className="text-lg text-neutral-600 dark:text-neutral-400">{subtitle}</p>
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
 */
export function AuthPrimaryButton({
  className,
  type = "submit",
  children,
  ...props
}: AuthPrimaryButtonProps) {
  // imported lazily to avoid circular file order; this is just a re-render util
  // The styling matches Button variant="highlighted" with h-12 w-full justify-center px-4
  // and we re-implement the class string here to avoid forcing callers to pass through
  // a Button variant override.
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-w-fit shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm border-2 border-coollabs bg-coollabs-50 px-2 text-sm font-medium normal-case text-coollabs-200 outline-none transition-colors select-none hover:bg-coollabs hover:text-white dark:border-coollabs-100 dark:bg-coollabs/20 dark:text-white dark:hover:bg-coollabs-100 dark:hover:text-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100 disabled:border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-600 dark:disabled:border-coolgray-300 dark:disabled:bg-coolgray-100/60 dark:disabled:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coollabs dark:focus-visible:ring-warning focus-visible:ring-offset-2 dark:focus-visible:ring-offset-app-base",
        "h-12 w-full justify-center px-4",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface AuthDividerProps {
  children: ReactNode;
  className?: string;
}

export function AuthDivider({ children, className }: AuthDividerProps) {
  return (
    <div className={cn("relative my-6", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-neutral-300 dark:border-coolgray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-gray-50 px-2 text-neutral-500 dark:bg-app-base dark:text-neutral-400">
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
      className={cn(
        "flex min-h-12 w-full items-center justify-center rounded-sm border border-neutral-300 px-4 py-3 text-center font-medium transition-colors hover:border-coollabs dark:border-coolgray-300 dark:hover:border-warning",
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
 * pages. Default variant uses neutral surface + coollabs/warning leading icon.
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
      className={cn(
        "rounded-sm border border-neutral-200 bg-neutral-50 p-4 dark:border-coolgray-300 dark:bg-coolgray-100",
        className
      )}
    >
      <div className="flex gap-3">
        <span
          className="mt-0.5 font-bold text-coollabs dark:text-warning"
          aria-hidden="true"
        >
          {icon ?? "i"}
        </span>
        <div className="text-sm text-neutral-700 dark:text-neutral-400">
          {children}
        </div>
      </div>
    </div>
  );
}
