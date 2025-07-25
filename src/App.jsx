import React from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import ImageEnhancer from "@/components/pages/ImageEnhancer"

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Routes>
        <Route path="/" element={<ImageEnhancer />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App