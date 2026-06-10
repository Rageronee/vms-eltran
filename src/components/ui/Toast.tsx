"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-999 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map((t) => {
          const Icon = {
            success: CheckCircle,
            error: AlertCircle,
            warning: AlertTriangle,
            info: Info,
          }[t.type];

          const typeStyles = {
            success: "bg-emerald-50 border-emerald-200 text-emerald-800",
            error: "bg-red-50 border-red-200 text-red-800",
            warning: "bg-amber-50 border-amber-200 text-amber-800",
            info: "bg-[#E6EFFF] border-blue-100 text-primary",
          }[t.type];

          const iconStyles = {
            success: "text-emerald-600 bg-white",
            error: "text-red-600 bg-white",
            warning: "text-amber-600 bg-white",
            info: "text-primary bg-white",
          }[t.type];

          return (
            <div
              key={t.id}
              className={cn(
                "flex items-start gap-3.5 p-4 rounded-xl border shadow-elegant pointer-events-auto",
                "animate-in slide-in-from-bottom-5 fade-in duration-300 transition-all",
                typeStyles
              )}
            >
              <div className={cn("p-1.5 rounded-lg shadow-sm shrink-0", iconStyles)}>
                <Icon className="size-4" />
              </div>
              <div className="flex-1 text-xs font-semibold leading-relaxed pt-0.5">
                {t.message}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
