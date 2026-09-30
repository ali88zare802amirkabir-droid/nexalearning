"use client";

import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  padding = "md",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  padding?: "none" | "sm" | "md" | "lg";
}) {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div
      className={cn(
        "card rounded-2xl border border-edge bg-surface shadow-card",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}