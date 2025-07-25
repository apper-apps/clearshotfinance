import { simulateDeblurProcessing } from "@/services/mockData/imageProcessing"

export const processImage = async (file, intensity, onProgress, blurType = 'gaussian') => {
  if (!file) {
    throw new Error("No file provided")
  }

  // Validate file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/bmp", "image/tiff"]
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a JPEG, PNG, WebP, BMP, or TIFF image.")
  }

  // Validate file size (max 15MB for better blur processing)
  const maxSize = 15 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error("File size too large. Please upload an image smaller than 15MB.")
  }

  // Validate intensity
  if (intensity < 0 || intensity > 100) {
    throw new Error("Intensity must be between 0 and 100.")
  }

  try {
// Simulate blur processing with progress updates
    const processedBlob = await simulateDeblurProcessing(file, intensity, onProgress, blurType)
    return processedBlob
  } catch (error) {
    console.error("Image processing error:", error)
    throw new Error("Failed to process image. Please try again.")
  }
}

export const downloadImage = (imageUrl, fileName = "blurred_image.png") => {
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
        aspectRatio: img.width / img.height,
        size: file.size,
        type: file.type
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
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/bmp", "image/tiff"]
  if (!validTypes.includes(file.type)) {
    errors.push("Invalid file type. Please upload a JPEG, PNG, WebP, BMP, or TIFF image.")
  }
  
  // Check file size (max 15MB)
  const maxSize = 15 * 1024 * 1024
  if (file.size > maxSize) {
    errors.push("File size too large. Please upload an image smaller than 15MB.")
  }
  
  // Check minimum size (avoid tiny images)
  const minSize = 1024 // 1KB minimum
  if (file.size < minSize) {
    errors.push("File too small. Please upload a valid image file.")
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

export const getSupportedFormats = () => {
  return [
    { type: 'image/jpeg', extension: '.jpg/.jpeg', description: 'JPEG Image' },
    { type: 'image/png', extension: '.png', description: 'PNG Image' },
    { type: 'image/webp', extension: '.webp', description: 'WebP Image' },
    { type: 'image/bmp', extension: '.bmp', description: 'BMP Image' },
    { type: 'image/tiff', extension: '.tiff', description: 'TIFF Image' }
  ]
}