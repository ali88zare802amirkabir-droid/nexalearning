"use client";

import { cn } from "@/lib/utils";

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "rounded-lg border border-edge bg-surface px-3 py-2 text-[13px] text-ink placeholder:text-ink-3",
        "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "rounded-lg border border-edge bg-surface px-3 py-2 text-[13px] text-ink",
        "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "rounded-lg border border-edge bg-surface px-3 py-2 text-[13px] text-ink placeholder:text-ink-3",
        "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "resize-y min-h-[80px]",
        className
      )}
      {...props}
    />
  );
}