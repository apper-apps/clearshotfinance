import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/utils/cn"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const ImagePreview = ({ 
  originalImage, 
  processedImage, 
  showComparison = false,
  className 
}) => {
  const containerRef = useRef(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (e) => {
    if (!showComparison || !processedImage) return
    setIsDragging(true)
    updateSliderPosition(e)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !showComparison || !processedImage) return
    updateSliderPosition(e)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (e) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging])

  if (!originalImage) {
    return (
      <Card variant="glass" className={cn("aspect-video flex items-center justify-center", className)}>
        <div className="text-center text-gray-400">
          <ApperIcon name="Image" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No image selected</p>
        </div>
      </Card>
    )
  }

  return (
    <Card variant="glass" className={cn("overflow-hidden", className)}>
      <div 
        ref={containerRef}
        className="relative aspect-video cursor-crosshair"
        onMouseDown={handleMouseDown}
        style={{ userSelect: "none" }}
      >
        {/* Original Image */}
        <img
          src={originalImage}
          alt="Original"
          className="absolute inset-0 w-full h-full object-contain bg-dark-800"
        />
        
        {/* Processed Image with Clip Path */}
        {processedImage && showComparison && (
          <img
            src={processedImage}
            alt="Enhanced"
            className="absolute inset-0 w-full h-full object-contain bg-dark-800"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
            }}
          />
        )}
        
        {/* Processed Image Full View */}
        {processedImage && !showComparison && (
          <img
            src={processedImage}
            alt="Enhanced"
            className="absolute inset-0 w-full h-full object-contain bg-dark-800"
          />
        )}
        
        {/* Comparison Slider */}
        {showComparison && processedImage && (
          <>
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 z-10 cursor-col-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize">
                <ApperIcon name="ArrowLeftRight" size={16} className="text-gray-800" />
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-4 left-4 bg-dark-900/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-white">
              Original
            </div>
            <div className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-white">
              Enhanced
            </div>
          </>
        )}
        
        {/* Single Image Label */}
        {!showComparison && (
          <div className="absolute top-4 left-4 bg-dark-900/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-white">
            {processedImage ? "Enhanced" : "Original"}
          </div>
        )}
      </div>
      
      {/* Image Info */}
      <div className="p-4 border-t border-surface-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Format: {originalImage?.type || "Unknown"}</span>
            <span>Size: {originalImage?.size ? `${(originalImage.size / (1024 * 1024)).toFixed(2)}MB` : "Unknown"}</span>
          </div>
          {showComparison && processedImage && (
            <div className="text-accent-400 font-medium">
              Drag to compare
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default ImagePreview