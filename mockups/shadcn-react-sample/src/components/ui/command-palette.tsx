import { useEffect } from "react";
import { Command } from "cmdk";
import * as D from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { useNavigate } from "@tanstack/react-router";
import { allComponentSamples } from "@/lib/component-registry";
import { Kbd } from "./kbd";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <D.Root open={open} onOpenChange={setOpen}>
      <D.Portal>
        <D.Overlay data-slot="command-palette-overlay" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <D.Content
          aria-describedby={undefined}
          data-slot="command-palette-content"
          className="fixed left-1/2 top-24 z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-sm border border-border bg-popover p-3 text-popover-foreground shadow-xl"
        >
          <D.Title className="sr-only">Command Palette</D.Title>
          <Command label="Command Palette">
            <div className="flex items-center gap-2">
              <div className="flex h-8 flex-1 items-center gap-2 rounded-sm bg-background px-2">
                <Search className="size-4 text-muted-foreground" />
                <Command.Input
                  placeholder="Search commands, resources, settings..."
                  className="h-8 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Kbd>Esc</Kbd>
            </div>
            <Command.List className="mt-3 max-h-80 overflow-y-auto border-t border-border pt-2">
              <Command.Empty className="px-2 py-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>
              <Command.Group
                heading="Components"
                className="px-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {allComponentSamples.map((s) => (
                  <Command.Item
                    key={s.href}
                    value={`${s.label} ${s.slug}`}
                    onSelect={() => {
                      setOpen(false);
                      navigate({ to: s.href });
                    }}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-sm px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                    )}
                  >
                    <span>{s.label}</span>
                    <span className="text-xs text-muted-foreground">↵</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
