import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Loading = ({ variant = "default", size = "md", message = "Loading...", className }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  const variants = {
    default: (
      <div className={cn("flex flex-col items-center justify-center space-y-4 p-8", className)}>
        <div className={cn("animate-spin text-primary-500", sizes[size])}>
          <ApperIcon name="Loader2" size={size === "sm" ? 16 : size === "md" ? 32 : size === "lg" ? 48 : 64} />
        </div>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    ),
    skeleton: (
      <div className={cn("space-y-4 p-6", className)}>
        <div className="animate-pulse">
          <div className="h-4 bg-surface-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-surface-700 rounded w-1/2 mb-4"></div>
          <div className="h-32 bg-surface-700 rounded mb-4"></div>
          <div className="flex space-x-4">
            <div className="h-10 bg-surface-700 rounded flex-1"></div>
            <div className="h-10 bg-surface-700 rounded flex-1"></div>
          </div>
        </div>
      </div>
    ),
    spinner: (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="relative">
          <div className={cn("animate-spin rounded-full border-2 border-surface-600", sizes[size])}>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 animate-spin"></div>
          </div>
        </div>
      </div>
    ),
    dots: (
      <div className={cn("flex items-center justify-center space-x-2", className)}>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    )
  }

  return variants[variant]
}

export default Loading