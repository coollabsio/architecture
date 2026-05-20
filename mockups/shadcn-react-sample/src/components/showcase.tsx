import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  title: ReactNode;
  designDoc?: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Showcase({ title, designDoc, description, children, className }: Props) {
  return (
    <main className={cn("mx-auto w-full max-w-5xl space-y-6 px-4 pb-12 sm:px-8", className)}>
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-black dark:text-white">{title}</h1>
        {designDoc && (
          <p className="font-mono text-[0.7rem] text-neutral-500">{designDoc}</p>
        )}
        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        )}
      </header>
      <div className="space-y-6">{children}</div>
    </main>
  );
}

export function ShowcaseRow({ title, children, className }: { title?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("space-y-2", className)}>
      {title && (
        <h2 className="text-[0.7rem] font-bold uppercase tracking-wide text-neutral-500">{title}</h2>
      )}
      <div className="rounded-sm border border-neutral-200 bg-white p-4 dark:border-coolgray-200 dark:bg-coolgray-100">
        <div className="flex flex-wrap items-center gap-3">{children}</div>
      </div>
    </section>
  );
}
