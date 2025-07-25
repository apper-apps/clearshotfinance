import React from "react"
import { motion } from "framer-motion"
import ImageProcessor from "@/components/organisms/ImageProcessor"
import ApperIcon from "@/components/ApperIcon"

const ImageEnhancer = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="border-b border-surface-700 bg-surface-800/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Focus" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  ClearShot
                </h1>
                <p className="text-xs text-gray-400 -mt-1">AI Image Enhancement</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.nav 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">
                Features
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">
                About
              </a>
              <a href="#support" className="text-gray-300 hover:text-white transition-colors duration-200">
                Support
              </a>
            </motion.nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-white p-2">
                <ApperIcon name="Menu" size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transform Blurry Images to{" "}
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Crystal Clear
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional-grade AI deblurring technology that restores sharpness and detail to your photos instantly. 
            No signup required, completely free to use.
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <motion.div 
              className="flex items-center justify-center space-x-3 bg-surface-800/50 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ApperIcon name="Zap" size={24} className="text-primary-400" />
              <span className="text-white font-medium">Lightning Fast</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center space-x-3 bg-surface-800/50 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ApperIcon name="Shield" size={24} className="text-secondary-400" />
              <span className="text-white font-medium">Secure & Private</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center space-x-3 bg-surface-800/50 backdrop-blur-sm rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ApperIcon name="Sparkles" size={24} className="text-accent-400" />
              <span className="text-white font-medium">AI-Powered</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Processor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ImageProcessor />
        </motion.div>

        {/* How It Works */}
        <motion.section 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto">
                <ApperIcon name="Upload" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white">1. Upload</h4>
              <p className="text-gray-400">
                Drag and drop your blurry image or click to select from your device. 
                Supports JPEG, PNG, and WebP formats.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto">
                <ApperIcon name="Settings" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white">2. Adjust</h4>
              <p className="text-gray-400">
                Fine-tune the enhancement intensity with our intuitive slider. 
                Preview changes in real-time before processing.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto">
                <ApperIcon name="Download" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white">3. Download</h4>
              <p className="text-gray-400">
                Get your crystal-clear enhanced image instantly. 
                Compare before and after results with our built-in slider.
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-700 bg-surface-800/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Focus" size={20} className="text-white" />
              </div>
              <span className="text-white font-semibold">ClearShot</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© 2024 ClearShot. All rights reserved.</span>
              <a href="#privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ImageEnhancer