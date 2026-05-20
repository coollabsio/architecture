import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let collapsed = false;

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

const notify = () => listeners.forEach((l) => l());

export function useSidebar() {
  const isCollapsed = useSyncExternalStore(subscribe, () => collapsed, () => false);
  const setCollapsed = (next: boolean) => {
    collapsed = next;
    notify();
  };
  return { collapsed: isCollapsed, setCollapsed, toggle: () => setCollapsed(!collapsed) } as const;
}
