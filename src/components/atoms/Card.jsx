import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  children, 
  variant = "default",
  className, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-surface-800 border border-surface-700",
    glass: "bg-surface-800/50 backdrop-blur-sm border border-surface-700/50",
    gradient: "bg-gradient-to-br from-surface-800 to-surface-900 border border-surface-700"
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg shadow-premium transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card