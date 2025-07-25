import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Slider = forwardRef(({ 
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
  ...props 
}, ref) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={cn("relative w-full", className)}>
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-surface-700 rounded-lg appearance-none cursor-pointer slider"
        {...props}
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border: 2px solid white;
        }
        
        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, 
            #4F46E5 0%, 
            #4F46E5 ${percentage}%, 
            #374151 ${percentage}%, 
            #374151 100%
          );
        }
        
        .slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, 
            #4F46E5 0%, 
            #4F46E5 ${percentage}%, 
            #374151 ${percentage}%, 
            #374151 100%
          );
        }
      `}</style>
    </div>
  )
})

Slider.displayName = "Slider"

export default Slider