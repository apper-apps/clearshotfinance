import React from "react"
import { cn } from "@/utils/cn"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Slider from "@/components/atoms/Slider"
import ProgressBar from "@/components/atoms/ProgressBar"
import ApperIcon from "@/components/ApperIcon"

const ControlPanel = ({
  intensity = 50,
  onIntensityChange,
  onProcess,
  onDownload,
  onReset,
  isProcessing = false,
  progress = 0,
  hasOriginalImage = false,
  hasProcessedImage = false,
  currentStep = "",
  className
}) => {
  return (
    <Card variant="glass" className={cn("p-6", className)}>
      <div className="space-y-6">
        {/* Intensity Control */}
<div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white">Deblur Intensity</label>
            <span className="text-sm text-gray-400">{intensity}%</span>
          </div>
          <Slider
            min={0}
            max={100}
            step={1}
            value={intensity}
            onChange={(e) => onIntensityChange(parseInt(e.target.value))}
            disabled={!hasOriginalImage || isProcessing}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Gentle</span>
            <span>Moderate</span>
            <span>Aggressive</span>
          </div>
        </div>

        {/* Processing Progress */}
        {isProcessing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Processing...</span>
              <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
            </div>
            <ProgressBar 
              value={progress} 
              variant="processing" 
              showValue={false}
            />
            {currentStep && (
              <div className="text-xs text-gray-400 text-center">
                {currentStep}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={onProcess}
            disabled={!hasOriginalImage || isProcessing}
            loading={isProcessing}
className="flex-1"
          >
            <ApperIcon name="Sparkles" size={18} className="mr-2" />
            {isProcessing ? "Deblurring..." : "Deblur Image"}
          </Button>
          
          {hasProcessedImage && (
            <Button
              variant="accent"
              size="md"
              onClick={onDownload}
              disabled={isProcessing}
              className="flex-1"
            >
              <ApperIcon name="Download" size={18} className="mr-2" />
              Download
            </Button>
          )}
        </div>

        {/* Secondary Actions */}
        {(hasOriginalImage || hasProcessedImage) && (
          <div className="flex justify-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              disabled={isProcessing}
            >
              <ApperIcon name="RotateCcw" size={16} className="mr-2" />
              Start Over
            </Button>
          </div>
        )}

        {/* Tips */}
        {!isProcessing && (
          <div className="bg-surface-900/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium text-white flex items-center">
              <ApperIcon name="Lightbulb" size={16} className="mr-2 text-yellow-400" />
              Tips for better results
</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Use high-resolution images for best quality</li>
              <li>• Start with moderate intensity (40-60%)</li>
              <li>• Motion blur works better than focus blur</li>
              <li>• Original colors are preserved during deblurring</li>
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ControlPanel