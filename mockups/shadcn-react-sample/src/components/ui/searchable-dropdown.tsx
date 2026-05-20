import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type SearchableDropdownOption = {
  label: string;
  value: string;
  description?: string;
};

interface Props {
  options: SearchableDropdownOption[];
  value?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  onSelect?: (option: SearchableDropdownOption) => void;
  className?: string;
}

export function SearchableDropdown({
  options,
  value,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  onSelect,
  className
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    // focus search on open
    queueMicrotask(() => inputRef.current?.focus());
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((option) => option.value === value);
  const filtered = options.filter((option) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${option.label} ${option.description ?? ""}`.toLowerCase().includes(q);
  });

  function handleSelect(option: SearchableDropdownOption) {
    setQuery("");
    setOpen(false);
    onSelect?.(option);
  }

  return (
    <div ref={rootRef} className={cn("relative w-full min-w-52 max-w-sm", className)}>
      <Button
        className="w-full justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn("truncate", !selected && "text-neutral-500 dark:text-neutral-400")}>
          {selected?.label ?? placeholder}
        </span>
        <svg
          className="size-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9L12 5.25 15.75 9" />
        </svg>
      </Button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-sm border border-neutral-300 bg-white p-1 shadow-sm dark:border-coolgray-300 dark:bg-coolgray-100">
          <div className="p-1">
            <Input
              ref={inputRef}
              className="dark:bg-app-base"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
            />
          </div>
          <div className="mt-1 max-h-56 overflow-y-auto overscroll-contain" role="listbox">
            {filtered.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                {emptyText}
              </div>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  className={cn(
                    "group flex w-full items-start gap-2 rounded-sm px-2 py-2 text-left text-sm text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-coollabs dark:hover:text-white",
                    option.value === value &&
                      "bg-neutral-100 font-semibold dark:bg-coolgray-200 dark:text-warning"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  <span className="w-4 shrink-0 text-center">
                    {option.value === value ? "✓" : ""}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{option.label}</span>
                    {option.description && (
                      <span className="block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400 dark:group-hover:text-white">
                        {option.description}
                      </span>
                    )}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
