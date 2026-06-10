import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, required, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-semibold text-foreground">
            {label} {required && <span className="text-secondary">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border bg-surface-dim px-4 py-2 text-sm text-foreground transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm",
            error 
              ? "border-secondary focus-visible:ring-secondary focus-visible:bg-white" 
              : "border-border/50 focus-visible:ring-primary focus-visible:bg-white hover:border-primary/50",
            className
          )}
          ref={ref}
          required={required}
          {...props}
        />
        {error && (
          <span className="text-xs font-semibold text-secondary animate-in fade-in duration-200">
            {error}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
