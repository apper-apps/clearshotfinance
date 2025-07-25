import React from "react"
import { cn } from "@/utils/cn"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  onReset,
  showRetry = true,
  showReset = false,
  variant = "default",
  className 
}) => {
  const variants = {
    default: "text-center p-8",
    compact: "text-center p-4",
    inline: "flex items-center space-x-3 p-4"
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center space-x-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4", className)}>
        <ApperIcon name="AlertCircle" size={20} className="text-red-400 flex-shrink-0" />
        <div className="flex-1 text-left">
          <p className="font-medium">{title}</p>
          {message && <p className="text-sm text-red-300 mt-1">{message}</p>}
        </div>
        {showRetry && onRetry && (
          <Button variant="ghost" size="sm" onClick={onRetry} className="text-red-400 hover:text-red-300">
            <ApperIcon name="RefreshCw" size={16} />
          </Button>
        )}
      </div>
    )
  }

  return (
    <Card variant="glass" className={cn(variants[variant], className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" size={32} className="text-red-400" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {message && (
            <p className="text-gray-400 max-w-md">{message}</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {showRetry && onRetry && (
            <Button variant="primary" onClick={onRetry}>
              <ApperIcon name="RefreshCw" size={18} className="mr-2" />
              Try Again
            </Button>
          )}
          
          {showReset && onReset && (
            <Button variant="secondary" onClick={onReset}>
              <ApperIcon name="RotateCcw" size={18} className="mr-2" />
              Start Over
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default Error