import { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface CopyButtonProps {
  text?: string;
  /** Legacy alias for `text` used by older callers. */
  value?: string;
  label?: string;
  mono?: boolean;
  className?: string;
}

export function CopyButton({
  text,
  value,
  label = "Copy to clipboard",
  mono = false,
  className,
}: CopyButtonProps) {
  const content = text ?? value ?? "";
  const [copied, setCopied] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setIsSecure(typeof window !== "undefined" && window.isSecureContext && !!navigator.clipboard);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function copy() {
    if (!isSecure) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1000);
  }

  return (
    <div data-slot="copy-button" className={cn("relative", className)}>
      <Input value={content} readOnly className={mono ? "pr-11 font-mono" : "pr-11"} />

      {isSecure && (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          title={label}
          aria-label={label}
          onClick={copy}
        >
          {copied ? (
            <svg className="size-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
