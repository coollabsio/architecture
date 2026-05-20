import { createFileRoute } from "@tanstack/react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { Showcase, ShowcaseRow } from "@/components/showcase";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/components/buttons")({ component: Page });

function Page() {
  return (
    <Showcase
      title="Button sample"
      designDoc="DESIGN.md → design/forms/button.md"
      description="Focused shadcn primitive extension from DESIGN.md and the migrated Coolify Button spec. Use the top-right controls to switch components and test light/dark mode."
    >
      <ShowcaseRow title="Variants">
        <Button>Default</Button>
        <Button variant="highlighted">Highlighted</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link variant</Button>
      </ShowcaseRow>

      <ShowcaseRow title="States">
        <Button disabled>Disabled</Button>
        <Button disabled aria-busy="true">
          Saving
          <Spinner />
        </Button>
        <Button size="icon" aria-label="Refresh service status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M16 8h5V3" />
          </svg>
        </Button>
      </ShowcaseRow>

      <ShowcaseRow title="Special icon case: external link">
        <a
          href="https://ui.shadcn.com/docs/components/button"
          className={buttonVariants({ variant: "default" })}
        >
          shadcn/ui Button docs
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </ShowcaseRow>

      <ShowcaseRow title="Spec notes">
        <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <li>Base button uses h-8, px-2, gap-2, text-sm, font-medium, rounded-sm, cursor-pointer.</li>
          <li>Focus ring uses coollabs in light mode and warning in dark mode.</li>
          <li>Loading spinner inherits text in light mode and uses dark:text-warning.</li>
          <li>Normal text buttons do not use icons by default.</li>
          <li>Icons are reserved for icon-only buttons, loading spinners, external links, or rare domain-specific actions.</li>
          <li>Disabled/loading buttons stay readable with neutral backgrounds and text.</li>
          <li>No legacy boolean styling attributes; variants are Shadcn-style props.</li>
        </ul>
      </ShowcaseRow>
    </Showcase>
  );
}
