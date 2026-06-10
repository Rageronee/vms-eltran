import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-semibold text-foreground">
            {label} {required && <span className="text-secondary">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            type="date"
            className={cn(
              "flex h-10 w-full rounded-md border-transparent bg-input px-3 py-2 pr-10 text-sm text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 shadow-sm cursor-pointer",
              className
            )}
            ref={ref}
            required={required}
            {...props}
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <CalendarIcon className="size-4 text-slate-400" />
          </div>
        </div>
      </div>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
