import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/command-palette";
import { Kbd } from "@/components/ui/kbd";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/command-palette")({ component: Page });

function Page() {
  const { setOpen } = useCommandPalette();

  return (
    <Showcase
      title="Command palette sample"
      designDoc="DESIGN.md → design/search/command-palette.md"
      description="Global search and command launcher."
    >
      <div className="rounded-sm border border-neutral-200 bg-gray-50 p-3 dark:border-coolgray-300 dark:bg-app-base">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="highlighted" onClick={() => setOpen(true)}>
            Open command palette
          </Button>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            or press <Kbd>⌘</Kbd> <Kbd>K</Kbd>
          </span>
        </div>
      </div>
      <CommandPalette />
    </Showcase>
  );
}
