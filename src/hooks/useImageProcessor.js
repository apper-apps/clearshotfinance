import { useState, useCallback } from "react"
import { toast } from "react-toastify"
import { processImage, validateImageFile, getImageDimensions } from "@/services/api/imageService"

export const useImageProcessor = () => {
  const [originalFile, setOriginalFile] = useState(null)
  const [originalImageUrl, setOriginalImageUrl] = useState(null)
  const [processedImageUrl, setProcessedImageUrl] = useState(null)
  const [imageData, setImageData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [error, setError] = useState(null)

  const handleFileSelect = useCallback(async (file) => {
    if (!file) return

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      const errorMessage = validation.errors.join(" ")
      setError(errorMessage)
      toast.error(errorMessage)
      return
    }

    try {
      // Clear previous state
      setError(null)
      setProcessedImageUrl(null)
      
      // Set original file and create URL
      setOriginalFile(file)
      const url = URL.createObjectURL(file)
      setOriginalImageUrl(url)
      
      // Get image dimensions
      const dimensions = await getImageDimensions(file)
      setImageData({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        dimensions
      })
      
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("File handling error:", error)
      setError("Failed to load image. Please try again.")
      toast.error("Failed to load image. Please try again.")
    }
  }, [])

  const processImageWithIntensity = useCallback(async (intensity) => {
    if (!originalFile) return

    setIsProcessing(true)
    setProgress(0)
    setCurrentStep("")
    setError(null)

try {
      const processedBlob = await processImage(originalFile, intensity, (progress, step) => {
setProgress(progress)
        setCurrentStep(`Step ${step + 1}/6`)
      })

      const processedUrl = URL.createObjectURL(processedBlob)
setProcessedImageUrl(processedUrl)
      
      toast.success("Image processed successfully!")
    } catch (error) {
      console.error("Processing error:", error)
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsProcessing(false)
      setProgress(0)
      setCurrentStep("")
    }
  }, [originalFile])

  const reset = useCallback(() => {
    // Cleanup URLs to prevent memory leaks
    if (originalImageUrl) URL.revokeObjectURL(originalImageUrl)
    if (processedImageUrl) URL.revokeObjectURL(processedImageUrl)

    setOriginalFile(null)
    setOriginalImageUrl(null)
    setProcessedImageUrl(null)
    setImageData(null)
    setIsProcessing(false)
    setProgress(0)
    setCurrentStep("")
    setError(null)
    
    toast.info("Ready for a new image!")
  }, [originalImageUrl, processedImageUrl])

  const retry = useCallback(async (intensity = 50) => {
    if (originalFile) {
      await processImageWithIntensity(intensity)
    }
  }, [originalFile, processImageWithIntensity])

  return {
    // State
    originalFile,
    originalImageUrl,
    processedImageUrl,
    imageData,
    isProcessing,
    progress,
    currentStep,
    error,
    
    // Actions
    handleFileSelect,
    processImageWithIntensity,
    reset,
    retry
  }
}