"use client";

import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-4", className)}>
      {icon && (
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-surface-2 text-ink-3">
          {icon}
        </div>
      )}
      <h3 className="mb-1 text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mb-4 text-[13px] text-ink-3 max-w-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}