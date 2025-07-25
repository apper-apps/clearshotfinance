import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const ProgressBar = forwardRef(({ 
  value = 0,
  min = 0,
  max = 100,
  variant = "primary",
  size = "md",
  showValue = false,
  className,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100)
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500",
    accent: "bg-gradient-to-r from-accent-500 to-accent-400",
    success: "bg-gradient-to-r from-green-500 to-green-400",
    processing: "bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 animate-gradient bg-[length:200%_200%]"
  }
  
  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  }
  
  return (
    <div className={cn("w-full", className)} ref={ref} {...props}>
      <div className={cn("w-full bg-surface-700 rounded-full overflow-hidden", sizes[size])}>
        <div 
          className={cn("h-full transition-all duration-300 ease-out rounded-full", variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="mt-2 text-sm text-gray-400 text-center">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
})

ProgressBar.displayName = "ProgressBar"

export default ProgressBar