import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link as RLink, type LinkProps as TanLinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const linkClass =
  "inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring";

export interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: ReactNode;
}

export function ExternalLink({
  href,
  target = "_blank",
  rel = "noreferrer",
  className,
  children,
  ...rest
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      data-slot="external-link"
      className={cn(linkClass, className)}
      {...rest}
    >
      {children}
      <svg
        className="size-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </a>
  );
}

export type InternalLinkProps = TanLinkProps & {
  className?: string;
  current?: boolean;
  children?: ReactNode;
};

export function InternalLink({
  className,
  current,
  children,
  ...rest
}: InternalLinkProps) {
  return (
    <RLink
      {...(rest as TanLinkProps)}
      data-slot="internal-link"
      aria-current={current ? "page" : undefined}
      className={cn(
        linkClass,
        current && "text-foreground no-underline",
        className
      )}
    >
      {children}
    </RLink>
  );
}
