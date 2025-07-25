import React from "react"
import { cn } from "@/utils/cn"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No data available",
  message = "There's nothing to show here yet.",
  actionText = "Get Started",
  onAction,
  icon = "FileImage",
  variant = "default",
  className 
}) => {
  const variants = {
    default: "text-center p-12",
    compact: "text-center p-6",
    minimal: "text-center p-4"
  }

  return (
    <Card variant="glass" className={cn(variants[variant], className)}>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-20 h-20 bg-surface-700/50 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} size={40} className="text-gray-400" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-400 max-w-md">{message}</p>
        </div>
        
        {onAction && (
          <Button variant="primary" onClick={onAction}>
            <ApperIcon name="Plus" size={18} className="mr-2" />
            {actionText}
          </Button>
        )}
      </div>
    </Card>
  )
}

export default Empty