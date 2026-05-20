import { useMemo } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SearchableDropdown, type SearchableDropdownOption } from "@/components/ui/searchable-dropdown";
import { componentSamples, pageSamples } from "@/lib/component-registry";
import { useAppearance } from "@/hooks/use-appearance";

export function SampleToolbar() {
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { resolvedAppearance, toggleAppearance } = useAppearance();

  const componentOptions: SearchableDropdownOption[] = useMemo(
    () => componentSamples.map((s) => ({ label: s.label, value: s.href, description: s.designDoc })),
    []
  );
  const pageOptions: SearchableDropdownOption[] = useMemo(
    () => pageSamples.map((s) => ({ label: s.label, value: s.href, description: s.designDoc })),
    []
  );

  const selectedComponent = componentSamples.find(
    (s) => path === s.href || path.startsWith(`${s.href}/`)
  );
  const selectedPage = pageSamples.find(
    (s) => path === s.href || path.startsWith(`${s.href}/`)
  );

  return (
    <div className="relative z-10 grid w-full grid-cols-1 items-end gap-2 border-b border-neutral-200 bg-gray-50 p-4 dark:border-coolgray-200 dark:bg-app-base sm:fixed sm:right-4 sm:top-4 sm:w-[min(56rem,calc(100vw-2rem))] sm:grid-cols-[minmax(14rem,1fr)_minmax(14rem,1fr)_auto] sm:border-b-0 sm:bg-transparent sm:p-0">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="text-[0.7rem] font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Components
          </span>
          <span className="hidden truncate text-[0.7rem] text-neutral-500 dark:text-neutral-500 sm:block">
            Reusable primitives
          </span>
        </div>
        <SearchableDropdown
          options={componentOptions}
          value={selectedComponent?.href}
          placeholder={selectedComponent?.label ?? "Choose component"}
          searchPlaceholder="Search components..."
          emptyText="No component found."
          onSelect={(o) => navigate({ to: o.value })}
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="text-[0.7rem] font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Pages
          </span>
          <span className="hidden truncate text-[0.7rem] text-neutral-500 dark:text-neutral-500 sm:block">
            Complex layouts
          </span>
        </div>
        <SearchableDropdown
          options={pageOptions}
          value={selectedPage?.href}
          placeholder={selectedPage?.label ?? "Choose page"}
          searchPlaceholder="Search pages..."
          emptyText="No page found."
          onSelect={(o) => navigate({ to: o.value })}
        />
      </div>

      <div className="space-y-1">
        <span className="block px-1 text-[0.7rem] font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Theme
        </span>
        <Button
          className="w-full whitespace-nowrap sm:w-auto"
          onClick={toggleAppearance}
          aria-label="Toggle light and dark mode"
        >
          {resolvedAppearance === "dark" ? "Light mode" : "Dark mode"}
        </Button>
      </div>
    </div>
  );
}
