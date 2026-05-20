import { tv, type VariantProps } from "tailwind-variants";
import Button from "./button.svelte";

export const buttonVariants = tv({
  base: "inline-flex min-w-fit shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm border-2 border-transparent bg-clip-padding px-2 text-sm font-medium normal-case outline-none transition-colors select-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 disabled:border-border disabled:bg-muted disabled:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  variants: {
    variant: {
      default:
        "border-border bg-card text-card-foreground hover:bg-muted",
      highlighted:
        "border-coollabs bg-coollabs/10 text-coollabs hover:bg-coollabs hover:text-white dark:border-coollabs-100 dark:bg-coollabs/20 dark:text-white dark:hover:bg-coollabs-100",
      destructive:
        "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground",
      ghost:
        "border-transparent bg-transparent text-foreground hover:bg-muted",
      link:
        "border-transparent bg-transparent px-0 text-primary hover:underline"
    },
    size: {
      default: "h-8",
      sm: "h-8 px-2 text-sm",
      lg: "h-10 px-3",
      icon: "size-8",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export { Button };
