import React from "react";
import { cn } from "@/lib/utils";

// 1. Wadah Halaman Utama
export function DashboardPageWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500", className)}>
      {children}
    </div>
  );
}

// 2. Wadah Header Halaman
interface DashboardHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function DashboardHeader({ icon, title, description, children }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}

// 3. Wadah Kartu (Card) Umum
export function DashboardCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("bg-white rounded-3xl p-6 sm:p-8 border border-border/50 shadow-sm flex flex-col relative overflow-hidden", className)}>
      {children}
    </div>
  );
}

// 4. Wadah Header Kartu (Card Header)
interface DashboardCardHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DashboardCardHeader({ title, subtitle, children, className }: DashboardCardHeaderProps) {
  return (
    <div className={cn("relative z-10 w-full text-left mb-6 flex justify-between items-start gap-4", className)}>
      <div>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {children && (
        <div className="shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
