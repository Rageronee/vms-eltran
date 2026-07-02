import { cn } from "@/lib/utils";

interface StepperProps {
  current: number;
  onJump?: (step: number) => void;
  steps: string[];
}

export function Stepper({ current, onJump, steps }: StepperProps) {
  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol role="list" className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:justify-items-center pt-2 pb-4 px-4 -mx-4 sm:mx-0 sm:px-2 sm:pt-2 sm:pb-4 snap-x hide-scrollbar">
          {steps.map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === current;
            const isCompleted = stepNum < current;
            
            return (
              <li key={label} className="w-[160px] sm:w-full sm:max-w-[200px] shrink-0 snap-center">
                <button
                  type="button"
                  onClick={() => onJump && onJump(stepNum)}
                  disabled={!onJump}
                  className={cn(
                    "group flex items-center gap-2 rounded-full px-3 py-2 w-full transition-all duration-300 cursor-pointer shadow-sm border text-left",
                    isActive 
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                      : isCompleted 
                      ? "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" 
                      : "bg-surface-muted text-muted-foreground hover:bg-surface-muted/80 border-border/40",
                    !onJump && "pointer-events-none"
                  )}
                >
                  <span className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition-colors",
                    isActive 
                      ? "bg-white text-primary" 
                      : isCompleted 
                      ? "bg-primary text-white" 
                      : "bg-white text-muted-foreground shadow-sm"
                  )}>
                    {isCompleted ? "✓" : stepNum}
                  </span>
                  <span className="text-[9px] font-bold tracking-wider uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
