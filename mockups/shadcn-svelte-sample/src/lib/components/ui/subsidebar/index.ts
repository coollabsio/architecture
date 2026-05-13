import SubSidebar from "./subsidebar.svelte";

export type SubSidebarItem = {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
};

export { SubSidebar };
