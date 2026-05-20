import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let open = false;

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

const notify = () => listeners.forEach((l) => l());

export function useCommandPalette() {
  const isOpen = useSyncExternalStore(subscribe, () => open, () => false);
  const setOpen = (next: boolean) => {
    open = next;
    notify();
  };
  return { open: isOpen, setOpen, toggle: () => setOpen(!open) } as const;
}
