import React, { useCallback, useState } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"

const FileDropZone = ({ onFileSelect, acceptedTypes = ["image/*"], maxSize = 10 * 1024 * 1024, className }) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [isDragReject, setIsDragReject] = useState(false)

  const validateFile = useCallback((file) => {
    if (!acceptedTypes.some(type => file.type.match(type.replace("*", ".*")))) {
      return "Invalid file type. Please upload an image file."
    }
    if (file.size > maxSize) {
      return `File too large. Maximum size is ${Math.round(maxSize / (1024 * 1024))}MB.`
    }
    return null
  }, [acceptedTypes, maxSize])

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const items = Array.from(e.dataTransfer.items)
    const hasValidFile = items.some(item => 
      item.kind === "file" && acceptedTypes.some(type => 
        item.type.match(type.replace("*", ".*"))
      )
    )
    
    setIsDragActive(true)
    setIsDragReject(!hasValidFile)
  }, [acceptedTypes])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragActive(false)
      setIsDragReject(false)
    }
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsDragActive(false)
    setIsDragReject(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      const error = validateFile(file)
      
      if (error) {
        onFileSelect(null, error)
      } else {
        onFileSelect(file, null)
      }
    }
  }, [validateFile, onFileSelect])

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const file = files[0]
      const error = validateFile(file)
      
      if (error) {
        onFileSelect(null, error)
      } else {
        onFileSelect(file, null)
      }
    }
    e.target.value = "" // Reset input
  }, [validateFile, onFileSelect])

  return (
    <Card
      variant="glass"
      className={cn(
        "border-2 border-dashed border-surface-600 hover:border-primary-500 transition-all duration-300 cursor-pointer group",
        isDragActive && !isDragReject && "border-primary-500 bg-primary-500/10 shadow-glow",
        isDragReject && "border-red-500 bg-red-500/10",
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="block p-12 text-center cursor-pointer">
        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            "w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110",
            isDragActive && "scale-110 animate-pulse-glow"
          )}>
            <ApperIcon 
              name={isDragActive ? "Upload" : "ImagePlus"} 
              size={32} 
              className="text-white" 
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">
              {isDragActive 
                ? (isDragReject ? "Invalid file type" : "Drop your image here") 
                : "Upload your blurry image"
              }
            </h3>
            <p className="text-gray-400">
              {isDragReject 
                ? "Please upload a valid image file" 
                : "Drag and drop or click to select • JPEG, PNG, WebP • Max 10MB"
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Image" size={16} />
              <span>High Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Zap" size={16} />
              <span>Fast Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Shield" size={16} />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </label>
    </Card>
  )
}

export default FileDropZone