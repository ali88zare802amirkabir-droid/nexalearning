"use client";

import { cn } from "@/lib/utils";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-accent/90",
    secondary: "bg-surface-2 text-ink hover:bg-surface-3",
    outline: "border border-edge bg-transparent hover:bg-surface-2",
    ghost: "bg-transparent hover:bg-surface-2",
    danger: "bg-danger text-white hover:bg-danger/90",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-[12px] gap-1.5",
    md: "px-4 py-2 text-[13px] gap-2",
    lg: "px-6 py-3 text-[14px] gap-2",
  };

  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}