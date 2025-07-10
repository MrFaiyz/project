"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

interface LoadingScreenProps {
  isLoading: boolean
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")
  const [isMounted, setIsMounted] = useState(false)
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number}>>([])

  const loadingSteps = [
    "Initializing...",
    "Loading assets...",
    "Preparing 3D models...",
    "Setting up animations...",
    "Almost ready...",
    "Welcome to Zsideo!"
  ]

  useEffect(() => {
    if (!isLoading) return

    let currentProgress = 0
    const interval = setInterval(() => {
      setProgress(prev => {
        currentProgress = prev + Math.random() * 12 + 3
        
        // Update loading text based on progress
        const stepIndex = Math.floor((currentProgress / 100) * loadingSteps.length)
        if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex])
        }

        return Math.min(currentProgress, 100)
      })
    }, 150) // Slightly slower for smoother progress

    return () => clearInterval(interval)
  }, [isLoading, loadingSteps])

  useEffect(() => {
    setIsMounted(true)
    // Generate particle positions only on client side
    setParticlePositions([...Array(6)].map(() => ({
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200
    })))
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl"
            />
          </div>

          <div className="relative z-10 text-center max-w-md mx-auto px-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1, 
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.2 
              }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="relative"
              >
                <Sparkles className="w-12 h-12 text-blue-600" />
                <div className="absolute inset-0 w-12 h-12 bg-blue-600 rounded-full blur-lg opacity-30"></div>
              </motion.div>
              <span className="text-4xl font-bold font-space-grotesk bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                zsideo
              </span>
            </motion.div>

            {/* Loading Text */}
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-slate-600 mb-8 font-inter"
            >
              {loadingText}
            </motion.p>

            {/* Progress Bar Container */}
            <div className="relative w-full h-2 bg-white/40 rounded-full overflow-hidden backdrop-blur-sm border border-white/30 mb-4">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full"></div>
              
              {/* Progress Bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              >
                {/* Shimmer Effect */}
                <motion.div
                  animate={{ x: [-100, 200] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-slate-500 font-jetbrains-mono"
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Floating Particles */}
            {isMounted && particlePositions.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {particlePositions.map((position, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0,
                      scale: 0,
                      x: position.x,
                      y: position.y
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -100]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: i * 0.5,
                      ease: "easeOut"
                    }}
                    className="absolute w-2 h-2 bg-blue-500 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}