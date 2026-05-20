import { useSyncExternalStore } from "react";

export type ResolvedAppearance = "light" | "dark";
export type Appearance = ResolvedAppearance | "system";

export type UseAppearanceReturn = {
  readonly appearance: Appearance;
  readonly resolvedAppearance: ResolvedAppearance;
  readonly updateAppearance: (mode: Appearance) => void;
  readonly toggleAppearance: () => void;
};

const STORAGE_KEY = "component-sample-react-theme";

const listeners = new Set<() => void>();
let currentAppearance: Appearance = "system";

const prefersDark = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

const getStoredAppearance = (): Appearance => {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(STORAGE_KEY) as Appearance) || "dark";
};

const isDarkMode = (appearance: Appearance): boolean =>
  appearance === "dark" || (appearance === "system" && prefersDark());

const applyTheme = (appearance: Appearance): void => {
  if (typeof document === "undefined") return;
  const isDark = isDarkMode(appearance);
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
};

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

const notify = (): void => {
  listeners.forEach((l) => l());
};

const mediaQuery = (): MediaQueryList | null =>
  typeof window === "undefined" ? null : window.matchMedia("(prefers-color-scheme: dark)");

const handleSystemThemeChange = (): void => {
  applyTheme(currentAppearance);
  notify();
};

export function initializeTheme(): void {
  if (typeof window === "undefined") return;
  currentAppearance = getStoredAppearance();
  applyTheme(currentAppearance);
  mediaQuery()?.addEventListener("change", handleSystemThemeChange);
}

export function useAppearance(): UseAppearanceReturn {
  const appearance = useSyncExternalStore(
    subscribe,
    () => currentAppearance,
    () => "system" as Appearance
  );

  const resolvedAppearance: ResolvedAppearance = isDarkMode(appearance) ? "dark" : "light";

  const updateAppearance = (mode: Appearance): void => {
    currentAppearance = mode;
    localStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode);
    notify();
  };

  const toggleAppearance = (): void => {
    updateAppearance(resolvedAppearance === "dark" ? "light" : "dark");
  };

  return { appearance, resolvedAppearance, updateAppearance, toggleAppearance } as const;
}
