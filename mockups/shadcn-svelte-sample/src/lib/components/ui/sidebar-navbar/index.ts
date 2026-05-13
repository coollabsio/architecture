import SidebarNavbar from "./sidebar-navbar.svelte";

export type SidebarNavItem = {
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
};

export { SidebarNavbar };
