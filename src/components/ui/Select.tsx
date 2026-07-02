"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export function Select({
  value,
  onChange,
  options,
  label,
  placeholder = "Pilih opsi...",
  required = false,
  error,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full" ref={containerRef}>
      {label && (
        <label className="text-sm font-semibold text-foreground">
          {label} {required && <span className="text-secondary">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-xl border bg-surface-dim px-4 py-2 text-sm text-foreground transition-all focus-visible:outline-none focus-visible:ring-1 shadow-sm cursor-pointer",
            error
              ? "border-secondary focus-visible:ring-secondary focus-visible:bg-white"
              : "border-border/50 focus-visible:ring-primary focus-visible:bg-white hover:border-primary/50",
            className
          )}
        >
          <span className={cn(!selectedOption && "text-muted-foreground font-normal")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-slate-500 transition-transform duration-200",
              isOpen && "transform rotate-180 text-primary"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-full min-w-[160px] overflow-hidden rounded-xl border border-border bg-white shadow-elegant animate-in fade-in duration-200">
            <ul className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-xs font-semibold transition-colors cursor-pointer",
                        isSelected
                          ? "bg-primary text-white"
                          : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="size-3.5 text-white shrink-0" />}
                    </button>
                  </li>
                );
              })}
              {options.length === 0 && (
                <li className="px-3.5 py-2.5 text-xs text-muted-foreground text-center">
                  Tidak ada opsi
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs font-semibold text-secondary animate-in fade-in duration-200">
          {error}
        </span>
      )}
    </div>
  );
}
