import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppearance } from "@/hooks/use-appearance";
import { Showcase, ShowcaseRow } from "@/components/showcase";

export const Route = createFileRoute("/components/theme-switcher")({ component: Page });

function Page() {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <Showcase title="Theme Switcher" designDoc="design/navigation/sidebar-navbar.md">
      <ShowcaseRow title="Modes">
        <Button variant={appearance === "light" ? "highlighted" : "default"} onClick={() => updateAppearance("light")}>
          <Sun /> Light
        </Button>
        <Button variant={appearance === "dark" ? "highlighted" : "default"} onClick={() => updateAppearance("dark")}>
          <Moon /> Dark
        </Button>
        <Button variant={appearance === "system" ? "highlighted" : "default"} onClick={() => updateAppearance("system")}>
          <Monitor /> System
        </Button>
      </ShowcaseRow>
    </Showcase>
  );
}
