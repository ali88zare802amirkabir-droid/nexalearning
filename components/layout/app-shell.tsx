"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Toasts } from "@/components/layout/toasts";
import { CommandSearch } from "@/components/layout/command-search";
import { useApp } from "@/lib/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, sidebarCollapsed, mobileNavOpen } = useApp();

  return (
    <div className="relative min-h-screen bg-bg">
      <div className="app-bg" aria-hidden />
      <Sidebar collapsed={sidebarCollapsed} />
      <Topbar />
      <MobileNav open={mobileNavOpen} onClose={() => { const { setMobileNavOpen } = useApp(); setMobileNavOpen(false); }} />
      <main
        className={cn(
          "relative z-10 min-h-screen transition-all duration-200",
          sidebarOpen && !sidebarCollapsed ? "lg:pl-[240px]" : "lg:pl-[68px]",
          sidebarCollapsed ? "lg:pl-[68px]" : ""
        )}
      >
        <div className="p-4 sm:p-6 pt-20 lg:pt-24">{children}</div>
      </main>
      <Toasts />
      <CommandSearch />
    </div>
  );
}