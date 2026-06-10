"use client";

import React from "react";
import { X, AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Yakin",
  cancelText = "Batal",
  variant = "default",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 px-4">
      <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-300 flex flex-col border border-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        {/* Icon & Content */}
        <div className="flex flex-col items-center text-center mt-2">
          <div
            className={cn(
              "size-14 rounded-full flex items-center justify-center mb-5 shadow-sm",
              variant === "danger"
                ? "bg-red-50 text-red-600 border border-red-100"
                : "bg-blue-50 text-primary border border-blue-100"
            )}
          >
            {variant === "danger" ? (
              <AlertTriangle className="size-7" />
            ) : (
              <HelpCircle className="size-7" />
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-800 tracking-tight px-2">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 py-6 rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={variant === "danger" ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={cn(
              "flex-1 py-6 rounded-xl text-xs font-bold cursor-pointer text-white",
              variant === "danger"
                ? "bg-secondary hover:bg-secondary-hover"
                : "bg-primary hover:bg-primary-hover"
            )}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
