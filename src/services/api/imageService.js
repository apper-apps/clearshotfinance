import { simulateDeblurProcessing } from "@/services/mockData/imageProcessing"

export const processImage = async (file, intensity, onProgress) => {
  if (!file) {
    throw new Error("No file provided")
  }

  // Validate file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a JPEG, PNG, or WebP image.")
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error("File size too large. Please upload an image smaller than 10MB.")
  }

  try {
    // Simulate processing with progress updates
    const processedBlob = await simulateDeblurProcessing(file, intensity, onProgress)
    return processedBlob
  } catch (error) {
    console.error("Image processing error:", error)
    throw new Error("Failed to process image. Please try again.")
  }
}

export const downloadImage = (imageUrl, fileName = "enhanced_image.png") => {
  try {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error("Download error:", error)
    throw new Error("Failed to download image. Please try again.")
  }
}

export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      })
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Failed to load image"))
    }
    
    img.src = url
  })
}

export const validateImageFile = (file) => {
  const errors = []
  
  // Check file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  if (!validTypes.includes(file.type)) {
    errors.push("Invalid file type. Please upload a JPEG, PNG, or WebP image.")
  }
  
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    errors.push("File size too large. Please upload an image smaller than 10MB.")
  }
  
  // Check if file exists
  if (!file || file.size === 0) {
    errors.push("Invalid file. Please select a valid image.")
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}