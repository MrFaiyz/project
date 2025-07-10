"use client"

import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Scene3D from "./Scene3D"
import { Play, ArrowRight, Zap, Video } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animations
      gsap.fromTo(".hero-badge", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
      )

      gsap.fromTo(".hero-title", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 1, ease: "power3.out" }
      )

      gsap.fromTo(".hero-subtitle", 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: "power3.out" }
      )

      gsap.fromTo(".hero-buttons", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.4, ease: "power3.out" }
      )

      gsap.fromTo(".hero-stats", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.6, ease: "power3.out" }
      )

      // Floating animation for stats
      gsap.to(".stat-item", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* 3D Canvas */}
      <div ref={canvasRef} className="absolute inset-0">
        <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 45 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
         

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight font-space-grotesk"
          >
            Create{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-red-400 via-blue to-red-800 bg-clip-text text-transparent">Viral Videos</span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-300 rounded-lg blur opacity-30"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </span>
            <br />
            <span className="text-slate-700">Effortlessly</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="hero-subtitle text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed font-inter"
          >
            Transform your raw footage into{" "}
            <span className="text-blue-600 font-semibold">high-impact content</span>{" "}
            with our AI-driven editing suite. Create stunning reels, shorts, and viral videos in minutes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold text-lg overflow-hidden shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Play className="w-5 h-5" />
                Start Creating Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-full bg-white/60 backdrop-blur-md border border-white/40 text-slate-700 font-semibold text-lg hover:border-blue-400/70 hover:bg-white/80 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5" />
                Watch Demo
              </div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="hero-stats flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500"
          >
            <div className="stat-item flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500 backdrop-blur-sm" />
              <span className="font-jetbrains-mono stat-item flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-lg text-black">10x Faster Editing</span>
            </div>
            <div className="stat-item flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse backdrop-blur-sm"></div>
              <span className="font-jetbrains-mono stat-item flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-lg text-black">50M+ Videos Created</span>
            </div>
            <div className="stat-item flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse backdrop-blur-sm"></div>
              <span className="font-jetbrains-mono stat-item flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-lg text-black">99.9% Uptime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-jetbrains-mono tracking-wider text-black">SCROLL TO EXPLORE</span>
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-blue-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}