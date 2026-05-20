import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { useSidebar } from "@/hooks/use-sidebar";
import { useAppearance, type Appearance } from "@/hooks/use-appearance";
import { Kbd } from "./kbd";
import { Badge } from "./badge";
import { dropdownMenuContentClass, dropdownMenuItemVariants } from "./dropdown-menu";
import { cn } from "@/lib/utils";

export type SidebarNavItem = {
  label: string;
  to: string;
  /** Visual badge (e.g. counter) shown next to label when expanded. */
  badge?: string;
};

type IconRender = (props: { className?: string }) => ReactNode;

const NAV_ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", to: "/pages/main-view" },
  { label: "Projects", to: "/pages/main-view" },
  { label: "Servers", to: "/pages/main-view" },
  { label: "Sources", to: "/pages/main-view" },
  { label: "Destinations", to: "/pages/full-application-page" },
  { label: "S3 Storages", to: "/pages/full-application-page" },
  { label: "Shared variables", to: "/pages/settings-page", badge: "2" }
];

const ICON_PATHS = [
  "M3 12l9-8 9 8v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  "M12 4 4 8l8 4 8-4-8-4Zm-8 8 8 4 8-4M4 16l8 4 8-4",
  "M4 6h16v5H4zM4 13h10v5H4zM18 14l-2 3h3l-2 3",
  "M7 7h10v10H7zM4 4l3 3M20 4l-3 3M4 20l3-3M20 20l-3-3",
  "M4 6l6-3 6 3 4-2v14l-4 2-6-3-6 3V6z",
  "M4 7c0-2 16-2 16 0s-16 2-16 0Zm0 0v10c0 2 16 2 16 0V7M4 12c0 2 16 2 16 0",
  "M5 6h14M5 12h14M5 18h14"
];

function NavIcon({ d, className }: { d: string; className?: string }) {
  return (
    <svg
      className={cn("size-4 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

const SUN: IconRender = ({ className }) => (
  <svg
    className={cn("shrink-0", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const SYSTEM: IconRender = ({ className }) => (
  <svg
    className={cn("shrink-0", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="5" width="16" height="11" rx="1.5" />
    <path d="M9 20h6M12 16v4" />
  </svg>
);

const MOON: IconRender = ({ className }) => (
  <svg
    className={cn("shrink-0", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const THEME_OPTIONS: { value: Appearance; label: string; icon: IconRender }[] = [
  { value: "light", label: "Light", icon: SUN },
  { value: "system", label: "System default", icon: SYSTEM },
  { value: "dark", label: "Dark", icon: MOON }
];

export interface SidebarNavbarProps {
  items?: SidebarNavItem[];
  children?: ReactNode;
}

export function SidebarNavbar({ items = NAV_ITEMS, children }: SidebarNavbarProps) {
  const { collapsed, toggle: toggleSidebar } = useSidebar();
  const { setOpen: setCommandPaletteOpen } = useCommandPalette();
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      data-slot="sidebar-navbar"
      className={cn(
        "relative flex min-h-[34rem] flex-col border-r border-border bg-background px-2 text-muted-foreground transition-all",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex items-start gap-2 px-2 pb-4 pt-6",
          collapsed && "flex-col items-center px-0"
        )}
      >
        {collapsed ? (
          <div className="flex flex-col items-center gap-0.5">
            <Link
              to="/pages/main-view"
              className="grid size-8 place-items-center rounded-sm text-lg font-bold text-foreground hover:opacity-80"
              title="Coolify"
              aria-label="Coolify"
            >
              C
            </Link>
            <p
              className="max-w-12 truncate text-center text-[10px] leading-[0.875rem] text-muted-foreground"
              title="v4.0.0"
            >
              v4.0.0
            </p>
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            <Link
              to="/pages/main-view"
              className="block truncate text-2xl font-bold tracking-tight text-foreground hover:opacity-80"
            >
              Coolify
            </Link>
            <p className="text-[10px] text-muted-foreground">v4.0.0</p>
          </div>
        )}
      </div>

      <button
        type="button"
        className="absolute -right-3 top-8 z-10 grid size-6 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={toggleSidebar}
      >
        <svg
          className={cn("size-3.5 transition-transform", collapsed && "rotate-180")}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18 9 12l6-6" />
        </svg>
      </button>

      {!collapsed && (
        <div className="px-2 pb-4">
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="inline-flex h-8 w-full items-center justify-between gap-1.5 rounded-sm border border-border bg-card px-2.5 text-sm text-muted-foreground hover:border-primary hover:text-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m21 21-4.35-4.35" />
                <circle cx="11" cy="11" r="7" />
              </svg>
              Search
            </span>
            <Kbd>/</Kbd>
          </button>
        </div>
      )}

      <TeamSwitcher collapsed={collapsed} />

      <nav aria-label="Primary" className="flex-1 overflow-hidden">
        <ul className="flex flex-col gap-1.5">
          {items.map((item, i) => {
            const active = path === item.to;
            return (
              <li key={`${item.label}-${i}`}>
                <Link
                  to={item.to}
                  title={item.label}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-7 w-full min-w-0 items-center gap-3 truncate rounded-sm px-2 py-1 text-sm hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                    active && "bg-muted text-primary",
                    collapsed && "mx-auto size-8 justify-center gap-0 px-0 py-0"
                  )}
                >
                  <NavIcon d={ICON_PATHS[i % ICON_PATHS.length]} />
                  {!collapsed && (
                    <>
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      {item.badge && <Badge variant="warning">{item.badge}</Badge>}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        {children}
      </nav>

      <div
        className={cn(
          "space-y-1 border-t border-border py-3",
          collapsed && "flex flex-col items-center"
        )}
      >
        <ThemeSwitcher collapsed={collapsed} />
        <Link
          to="/pages/settings-page"
          title="Settings"
          className={cn(
            "flex min-h-7 items-center gap-3 rounded-sm px-2 py-1 text-sm hover:bg-muted hover:text-foreground",
            collapsed && "size-8 justify-center px-0 py-0"
          )}
        >
          <SettingsIcon />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}

export interface TeamSwitcherProps {
  collapsed?: boolean;
  selectedTeam?: string;
  teams?: string[];
}

export function TeamSwitcher({
  collapsed = false,
  selectedTeam: selectedTeamProp,
  teams = ["Coolify", "Personal", "Acme Cloud"]
}: TeamSwitcherProps) {
  const [internalSelected, setInternalSelected] = useState(selectedTeamProp ?? "Coolify");
  const selectedTeam = selectedTeamProp ?? internalSelected;
  const [open, setOpen] = useState(false);

  const initial = selectedTeam.slice(0, 1).toUpperCase();

  const selectTeam = (team: string) => {
    setInternalSelected(team);
    setOpen(false);
  };

  return (
    <div
      data-slot="team-switcher"
      className={cn("px-2 pb-7", collapsed && "flex justify-center px-0 pb-4")}
    >
      <div className={cn("relative", collapsed ? "mx-auto w-8" : "w-full")}>
        {collapsed ? (
          <button
            type="button"
            title={`Team: ${selectedTeam}`}
            className="flex size-8 cursor-pointer items-center justify-center rounded-sm bg-primary p-0 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Switch team. Current team: ${selectedTeam}`}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {initial}
          </button>
        ) : (
          <button
            type="button"
            className="flex h-8 w-full items-center justify-between gap-2 rounded-sm border border-border bg-card px-2 text-left text-sm text-card-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Switch team. Current team: ${selectedTeam}`}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="min-w-0 truncate">{selectedTeam}</span>
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
          </button>
        )}

        {open && (
          <div
            role="menu"
            tabIndex={-1}
            className={cn(
              dropdownMenuContentClass,
              collapsed
                ? "absolute left-full top-0 ml-2 mt-0 max-h-72 min-w-48 overflow-y-auto"
                : "absolute left-0 right-auto w-full min-w-full"
            )}
          >
            <div className={dropdownMenuItemVariants({ variant: "label" })}>Switch team</div>
            {teams.map((team) => (
              <button
                key={team}
                type="button"
                role="menuitem"
                className={cn(
                  dropdownMenuItemVariants(),
                  team === selectedTeam && "font-semibold text-primary"
                )}
                onClick={() => selectTeam(team)}
              >
                {team}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ThemeSwitcher({ collapsed = false }: { collapsed?: boolean }) {
  const { appearance, updateAppearance } = useAppearance();
  const current = THEME_OPTIONS.find((o) => o.value === appearance) ?? THEME_OPTIONS[2];

  const cycleTheme = () => {
    const next: Appearance =
      appearance === "light" ? "system" : appearance === "system" ? "dark" : "light";
    updateAppearance(next);
  };

  return (
    <div
      data-slot="theme-switcher"
      className={cn("w-full", collapsed && "w-8")}
    >
      {collapsed ? (
        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-sm hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          title={`Theme: ${current.label}. Click to change.`}
          aria-label="Cycle theme: light, system default, dark"
          onClick={cycleTheme}
        >
          <current.icon className="size-4 text-primary" />
        </button>
      ) : (
        <div className="flex min-h-7 w-full items-center gap-3 rounded-sm px-2 py-1 text-sm hover:bg-muted hover:text-foreground">
          <span className="shrink-0">Theme</span>
          <div
            className="ml-auto inline-grid grid-cols-3 rounded-sm border border-border bg-card p-0.5 text-muted-foreground"
            role="radiogroup"
            aria-label="Theme preference"
          >
            {THEME_OPTIONS.map((option) => {
              const active = appearance === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  title={option.label}
                  aria-label={option.label}
                  className={cn(
                    "grid size-6 place-items-center rounded-sm transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                    active && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => updateAppearance(option.value)}
                >
                  <option.icon className="size-3.5" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export type SubsidebarItem = {
  label: string;
  to: string;
  /** Backwards-compatible alias for `to`. */
  href?: string;
  active?: boolean;
  external?: boolean;
};

export interface SubsidebarProps {
  items: SubsidebarItem[];
  orientation?: "vertical" | "horizontal";
  ariaLabel?: string;
}

export function Subsidebar({
  items,
  orientation = "vertical",
  ariaLabel = "Section navigation"
}: SubsidebarProps) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      data-slot="subsidebar"
      aria-label={ariaLabel}
      className={cn(
        orientation === "vertical"
          ? "flex w-full flex-col items-start gap-2 sm:w-48 sm:min-w-48 sm:flex-shrink-0"
          : "scrollbar flex min-h-10 w-full flex-nowrap items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap pb-1"
      )}
    >
      {items.map((item, i) => {
        const target = item.to ?? item.href ?? "#";
        const active = item.active ?? path === target;
        const baseClass = cn(
          "flex min-h-7 min-w-0 items-center gap-2 truncate rounded-sm px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
          orientation === "vertical" ? "w-full" : "shrink-0",
          active && "bg-muted text-primary"
        );
        const inner = (
          <>
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.external && (
              <svg
                className="size-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            )}
          </>
        );
        if (item.external) {
          return (
            <a
              key={`${item.label}-${i}`}
              href={target}
              target="_blank"
              rel="noreferrer"
              className={baseClass}
            >
              {inner}
            </a>
          );
        }
        return (
          <Link
            key={`${item.label}-${i}`}
            to={target}
            aria-current={active ? "page" : undefined}
            className={baseClass}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
