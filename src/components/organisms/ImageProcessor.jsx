import React, { useState, useCallback } from "react"
import { toast } from "react-toastify"
import FileDropZone from "@/components/molecules/FileDropZone"
import ImagePreview from "@/components/molecules/ImagePreview"
import ControlPanel from "@/components/molecules/ControlPanel"
import { processImage, downloadImage } from "@/services/api/imageService"

const ImageProcessor = () => {
  const [originalFile, setOriginalFile] = useState(null)
  const [originalImageUrl, setOriginalImageUrl] = useState(null)
  const [processedImageUrl, setProcessedImageUrl] = useState(null)
  const [intensity, setIntensity] = useState(50)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [showComparison, setShowComparison] = useState(false)

  const handleFileSelect = useCallback((file, error) => {
    if (error) {
      toast.error(error)
      return
    }

    if (file) {
      setOriginalFile(file)
      const url = URL.createObjectURL(file)
      setOriginalImageUrl(url)
      setProcessedImageUrl(null)
      setShowComparison(false)
      toast.success("Image uploaded successfully!")
    }
  }, [])

  const handleProcess = useCallback(async () => {
    if (!originalFile) return

    setIsProcessing(true)
    setProgress(0)
    setCurrentStep("Initializing...")
try {
      const steps = [
        "Analyzing image structure...",
        "Detecting blur patterns...",
        "Applying advanced deblur algorithms...",
        "Enhancing edge sharpness...",
        "Optimizing clarity restoration...",
        "Finalizing unblurred image..."
      ]

      const processedBlob = await processImage(originalFile, intensity, (progress, step) => {
        setProgress(progress)
        if (step < steps.length) {
          setCurrentStep(steps[step])
        }
      })

      const processedUrl = URL.createObjectURL(processedBlob)
      setProcessedImageUrl(processedUrl)
setShowComparison(true)
      
      toast.success("Image processed successfully!")
    } catch (error) {
      console.error("Processing error:", error)
      toast.error("Failed to process image. Please try again.")
    } finally {
      setIsProcessing(false)
      setProgress(0)
      setCurrentStep("")
    }
  }, [originalFile, intensity])

  const handleDownload = useCallback(() => {
if (!processedImageUrl || !originalFile) return

    const fileName = originalFile.name.replace(/\.[^/.]+$/, "_deblurred.png")
    downloadImage(processedImageUrl, fileName)
    toast.success("Image downloaded successfully!")
  }, [processedImageUrl, originalFile])

  const handleReset = useCallback(() => {
    // Cleanup URLs to prevent memory leaks
    if (originalImageUrl) URL.revokeObjectURL(originalImageUrl)
    if (processedImageUrl) URL.revokeObjectURL(processedImageUrl)

    setOriginalFile(null)
    setOriginalImageUrl(null)
    setProcessedImageUrl(null)
    setIntensity(50)
    setShowComparison(false)
    setIsProcessing(false)
    setProgress(0)
    setCurrentStep("")
    
    toast.info("Ready for a new image!")
  }, [originalImageUrl, processedImageUrl])

  const toggleComparison = useCallback(() => {
    if (processedImageUrl) {
      setShowComparison(!showComparison)
    }
  }, [processedImageUrl, showComparison])

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      {!originalImageUrl && (
        <FileDropZone onFileSelect={handleFileSelect} />
      )}

      {/* Image Preview */}
      {originalImageUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Image Preview</h2>
            {processedImageUrl && (
              <button
                onClick={toggleComparison}
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200"
              >
                {showComparison ? "Hide Comparison" : "Show Comparison"}
              </button>
            )}
          </div>
          
          <ImagePreview
            originalImage={originalImageUrl}
            processedImage={processedImageUrl}
            showComparison={showComparison}
          />
        </div>
      )}

      {/* Control Panel */}
      {originalImageUrl && (
        <ControlPanel
          intensity={intensity}
          onIntensityChange={setIntensity}
          onProcess={handleProcess}
          onDownload={handleDownload}
          onReset={handleReset}
          isProcessing={isProcessing}
          progress={progress}
          hasOriginalImage={!!originalImageUrl}
          hasProcessedImage={!!processedImageUrl}
          currentStep={currentStep}
        />
      )}
    </div>
  )
}

export default ImageProcessor