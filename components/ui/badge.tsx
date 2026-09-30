"use client";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "accent";
}) {
  const variants = {
    default: "bg-surface-2 text-ink-2",
    success: "bg-ok/10 text-ok",
    warning: "bg-warn/10 text-warn",
    danger: "bg-danger/10 text-danger",
    info: "bg-info/10 text-info",
    accent: "bg-accent/10 text-accent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}