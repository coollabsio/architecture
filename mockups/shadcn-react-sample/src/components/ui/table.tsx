import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn("w-full min-w-[42rem] border-collapse text-left text-sm", className)}
      {...props}
    />
  )
);
Table.displayName = "Table";

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "border-b border-neutral-200 bg-neutral-100 text-xs font-bold uppercase tracking-wide text-neutral-600 dark:border-coolgray-300 dark:bg-coolgray-200 dark:text-neutral-400",
        className
      )}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("divide-y divide-neutral-200 dark:divide-coolgray-300", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "hover:bg-neutral-100 dark:hover:bg-coolgray-200 data-[state=selected]:bg-neutral-100 dark:data-[state=selected]:bg-coolgray-200",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn("px-3 py-2 align-middle", className)} {...props} />;
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("px-3 py-2 align-middle text-neutral-600 dark:text-neutral-400", className)}
      {...props}
    />
  );
}
