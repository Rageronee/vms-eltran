import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, required, ...props }, ref) => {
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
            "flex h-10 w-full rounded-md border-transparent bg-input px-3 py-2 text-sm text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 shadow-sm",
            className
          )}
          ref={ref}
          required={required}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
