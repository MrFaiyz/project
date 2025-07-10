"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  Video, 
  Scissors, 
  Palette, 
  Music, 
  Zap, 
  Globe,
  Smartphone,
  Monitor,
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(".services-header", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Service cards animation
      gsap.fromTo(".service-card", 
        { 
          y: 80, 
          opacity: 0,
          rotateX: 15
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Platform icons float animation
      gsap.to(".platform-icon", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const services = [
    {
      icon: Video,
      title: "AI Video Editing",
      description: "Intelligent scene detection, automatic cuts, and seamless transitions powered by advanced machine learning.",
      features: ["Smart scene detection", "Auto color correction", "Noise reduction", "Stabilization"],
      color: "#3ac4ec",
      popular: false
    },
    {
      icon: Scissors,
      title: "Short-Form Content",
      description: "Transform long-form videos into engaging shorts, reels, and TikToks optimized for each platform.",
      features: ["Platform optimization", "Viral hooks", "Trending formats", "Auto captions"],
      color: "#ef4444",
      popular: true
    },
    {
      icon: Palette,
      title: "Visual Enhancement",
      description: "Professional-grade color grading, effects, and visual polish to make your content stand out.",
      features: ["Color grading", "Visual effects", "Brand overlays", "Custom animations"],
      color: "#f59e0b",
      popular: false
    },
    {
      icon: Music,
      title: "Audio Mastery",
      description: "Perfect audio mixing, background music selection, and sound design for maximum impact.",
      features: ["Audio mixing", "Music library", "Sound effects", "Voice enhancement"],
      color: "#8b5cf6",
      popular: false
    },
    {
      icon: Zap,
      title: "Batch Processing",
      description: "Process multiple videos simultaneously with consistent quality and branding across all content.",
      features: ["Bulk editing", "Brand consistency", "Template application", "Queue management"],
      color: "#10b981",
      popular: false
    },
    {
      icon: Globe,
      title: "Multi-Platform Export",
      description: "Export optimized versions for every social platform with the perfect aspect ratios and specifications.",
      features: ["Platform specs", "Multiple formats", "Quality optimization", "Direct publishing"],
      color: "#f97316",
      popular: false
    }
  ]

  const platforms = [
    { name: "TikTok", icon: Smartphone, color: "#ff0050" },
    { name: "Instagram", icon: Monitor, color: "#e4405f" },
    { name: "YouTube", icon: Video, color: "#ff0000" },
    { name: "Twitter", icon: Globe, color: "#1da1f2" }
  ]

  return (
    <section 
      id="services"
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-2/3 left-1/2 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="services-header text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#3ac4ec]/30 mb-6"
          >
            <Star className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600 font-jetbrains-mono tracking-wider">
              PREMIUM SERVICES
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Create</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From raw footage to viral content - our talented team of editors, designers, and tools 
            handles every aspect of video production with professional quality.
          </p>
        </div>

        {/* Platform Support */}
        <div className="flex items-center justify-center gap-8 mb-16">
          <span className="text-slate-500 font-jetbrains-mono text-sm">OPTIMIZED FOR</span>
          {platforms.map((platform, platformIndex) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: platformIndex * 0.1 }}
              className="platform-icon flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40"
            >
              <platform.icon 
                className="w-5 h-5" 
                style={{ color: platform.color }}
              />
              <span className="text-sm font-medium text-slate-700">{platform.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -10, scale: 1.02 }}
              className="service-card relative bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/40 hover:border-blue-300/50 transition-all duration-500 group overflow-hidden shadow-lg"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#ef4444] to-[#f59e0b] text-white text-xs font-bold">
                  POPULAR
                </div>
              )}

              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"
                style={{ backgroundColor: service.color }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon 
                    className="w-8 h-8" 
                    style={{ color: service.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-800 mb-4 font-space-grotesk">
                  {service.title}
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-slate-700 font-semibold group-hover:text-blue-600 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4 font-space-grotesk">
            Ready to Transform Your Content?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using Zsideo to create viral content effortlessly.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#3ac4ec] to-[#ef4444] text-white font-bold text-lg glow-hover"
          >
            Book A Call
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}