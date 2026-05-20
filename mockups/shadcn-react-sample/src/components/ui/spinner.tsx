import type { SVGAttributes } from "react";
import { cn } from "@/lib/utils";

export function Spinner({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      className={cn("size-4 animate-spin dark:text-warning", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="status"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
      />
    </svg>
  );
}
