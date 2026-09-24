import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "border border-border bg-card text-foreground hover:bg-accent",
    ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
    danger: "bg-severity-high text-severity-high-foreground hover:bg-severity-high/90",
  };
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm" };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}