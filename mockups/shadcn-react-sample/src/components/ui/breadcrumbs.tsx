import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  /** Backwards-compatible alias for href. */
  to?: string;
};

export function Breadcrumbs({
  items,
  className
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const href = item.href ?? item.to;
          return (
            <Fragment key={i}>
              <li className="inline-flex items-center gap-1.5">
                {i > 0 && <span className="text-neutral-400">/</span>}
                {href && !isLast ? (
                  <Link
                    to={href}
                    className={cn(
                      "rounded-sm text-neutral-600 hover:text-coollabs focus-visible:ring-2 focus-visible:ring-coollabs dark:text-neutral-400 dark:hover:text-warning dark:focus-visible:ring-warning"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-black dark:text-white" aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export type Crumb = BreadcrumbItem;
