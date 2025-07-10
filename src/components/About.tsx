"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  Zap, 
  Brain, 
  Sparkles, 
  Target, 
  Users, 
  TrendingUp,
  Play,
  Award,
  Clock,
  Shield
} from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation on scroll
      gsap.fromTo(".about-content", 
        { 
          x: 100, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Stats animation
      gsap.fromTo(".stat-number", 
        { 
          textContent: 0,
          opacity: 0 
        },
        {
          textContent: (i, target) => target.getAttribute('data-value'),
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          stagger: 0.2
        }
      )

      // Feature cards stagger animation
      gsap.fromTo(".feature-card", 
        { 
          y: 60, 
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Editing",
      description: "Advanced machine learning algorithms automatically detect the best moments and create engaging cuts.",
      color: "#3ac4ec"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process hours of footage in minutes. Our optimized pipeline delivers results 10x faster than traditional editing.",
      color: "#ef4444"
    },
    {
      icon: Target,
      title: "Viral Optimization",
      description: "Built-in analytics and trending patterns ensure your content is optimized for maximum engagement.",
      color: "#f59e0b"
    },
    {
      icon: Sparkles,
      title: "Smart Templates",
      description: "Choose from hundreds of professionally designed templates that adapt to your content automatically.",
      color: "#8b5cf6"
    }
  ]

  const stats = [
    { number: "50", suffix: "M+", label: "Videos Created", icon: Play },
    { number: "99.9", suffix: "%", label: "Uptime", icon: Shield },
    { number: "10", suffix: "x", label: "Faster Editing", icon: Clock },
    { number: "500", suffix: "K+", label: "Happy Creators", icon: Users }
  ]

  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-8 py-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side - 3D space for camera */}
        <div className="relative h-96 lg:h-full">
          {/* This space is reserved for the 3D camera view */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-32 h-32 rounded-full bg-gradient-to-r from-[#3ac4ec] to-[#ef4444] flex items-center justify-center"
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Right side - Content */}
        <div ref={contentRef} className="about-content space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#3ac4ec]/30">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600 font-jetbrains-mono tracking-wider">
                INDUSTRY LEADING
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold font-space-grotesk">
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Zsideo</span>
            </h2>

            <p className="text-xl text-slate-600 leading-relaxed font-inter">
             We’re revolutionizing content
              creation by turning your raw footage into
               scroll-stopping videos that get noticed.
                Our team crafts engaging, high-quality content
                 and shares fresh ideas to help you grow your audience — 
             so you can focus on what you love while we handle the rest.
            </p>

            <p className="text-lg text-slate-500 leading-relaxed">
              From TikTok shorts to Instagram reels, YouTube videos to brand content - 
              Zsideo adapts to every platform's unique requirements and audience preferences.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold font-space-grotesk">
                  <span 
                    className="stat-number bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    data-value={stat.number}
                  >
                    0
                  </span>
                  <span className="text-blue-600">{stat.suffix}</span>
                </div>
                <p className="text-sm text-slate-500 font-jetbrains-mono">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="features-grid grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -5, scale: 1.02 }}
                className="feature-card bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/40 hover:border-blue-300/50 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon 
                      className="w-6 h-6" 
                      style={{ color: feature.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2 font-space-grotesk">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#3ac4ec] to-[#ef4444] text-white font-bold text-lg glow-hover"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5" />
                Start Your Journey
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}