import {
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type ReactNode
} from "react";
import { cn } from "@/lib/utils";

export type TabItem = { value: string; label: string };

type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>");
  return ctx;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "children"> {
  items?: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode | ((ctx: { value: string }) => ReactNode);
}

export function Tabs({
  items,
  defaultValue,
  value: controlled,
  onValueChange,
  className,
  children,
  ...rest
}: TabsProps) {
  const [internal, setInternal] = useState<string>(
    () => controlled ?? defaultValue ?? items?.[0]?.value ?? ""
  );
  const value = controlled ?? internal;
  const setValue = (next: string) => {
    if (controlled === undefined) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("w-full", className)} {...rest}>
        {items && (
          <TabsList>
            {items.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        {typeof children === "function" ? (
          <div className="mt-3" role="tabpanel">
            {children({ value })}
          </div>
        ) : (
          children
        )}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex gap-1 rounded-sm border border-neutral-200 bg-white p-1 dark:border-coolgray-300 dark:bg-coolgray-100",
        className
      )}
      {...props}
    />
  );
}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, className, children, ...rest }: TabsTriggerProps) {
  const ctx = useTabs();
  const active = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-state={active ? "active" : "inactive"}
      onClick={() => ctx.setValue(value)}
      className={cn(
        "inline-flex h-8 cursor-pointer items-center justify-center rounded-sm px-2 text-sm font-medium text-neutral-600 outline-none transition-colors hover:bg-neutral-100 hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm dark:text-neutral-400 dark:hover:bg-coolgray-200 dark:hover:text-white dark:focus-visible:ring-warning dark:data-[state=active]:bg-coolgray-200 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-none",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className, children, ...rest }: TabsContentProps) {
  const ctx = useTabs();
  if (ctx.value !== value) return null;
  return (
    <div
      role="tabpanel"
      className={cn("mt-3 outline-none", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
