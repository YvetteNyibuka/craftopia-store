import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { ChevronDown } from "lucide-react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { }

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <select
                    className={cn(
                        "flex h-11 w-full appearance-none rounded-xl border border-stone-200 bg-white px-3 pr-9 py-2 text-sm shadow-sm transition-colors text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE614] focus-visible:border-[#5CE614] disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>
        )
    }
)
Select.displayName = "Select"

export { Select }
