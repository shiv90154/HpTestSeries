// Tiny class helpers so links and buttons share one look without a component library.

type Variant = "primary" | "accent" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary-strong",
  accent: "bg-accent text-[#1f1300] shadow-sm hover:bg-accent-strong",
  outline: "border border-border bg-surface text-foreground hover:border-primary hover:text-primary",
  ghost: "text-foreground hover:bg-surface-muted",
  white: "bg-white text-primary-strong shadow-sm hover:bg-primary-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function btn(variant: Variant = "primary", size: Size = "md", extra = ""): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export const card = "rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,27,51,0.04)]";
