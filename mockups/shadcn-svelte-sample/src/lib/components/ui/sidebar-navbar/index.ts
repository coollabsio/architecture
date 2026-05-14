import SidebarNavbar from "./sidebar-navbar.svelte";
import TeamSwitcher from "./team-switcher.svelte";
import ThemeSwitcher from "./theme-switcher.svelte";

export type SidebarNavItem = {
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
};

export { SidebarNavbar, TeamSwitcher, ThemeSwitcher };
