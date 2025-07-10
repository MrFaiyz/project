"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Users,
  TrendingUp,
  Award
} from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      company: "@sarahcreates",
      followers: "2.3M",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "Zsideo completely transformed my content creation process. What used to take me 6 hours now takes 30 minutes, and the quality is incredible. My engagement rates have increased by 300%!",
      rating: 5,
      platform: "TikTok",
      metrics: { views: "50M+", engagement: "+300%" }
    },
    {
      name: "Marcus Rodriguez",
      role: "Digital Marketer",
      company: "GrowthLab Agency",
      followers: "850K",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "As an agency, we needed a solution that could scale. Zsideo delivers consistent, high-quality results for all our clients. The AI understands trends better than most humans!",
      rating: 5,
      platform: "Instagram",
      metrics: { clients: "50+", satisfaction: "98%" }
    },
    {
      name: "Emma Thompson",
      role: "YouTuber",
      company: "@emmatech",
      followers: "1.8M",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "The batch processing feature is a game-changer. I can upload 20 videos and get perfectly edited shorts for every platform. My channel growth has been exponential since using Zsideo.",
      rating: 5,
      platform: "YouTube",
      metrics: { growth: "+500%", time_saved: "40hrs/week" }
    },
    {
      name: "David Kim",
      role: "Brand Manager",
      company: "TechFlow Inc",
      followers: "500K",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "Zsideo helped us maintain brand consistency across all our social platforms while creating engaging content that actually converts. ROI has been phenomenal.",
      rating: 5,
      platform: "LinkedIn",
      metrics: { roi: "+250%", leads: "10x more" }
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(".testimonials-header", 
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

      // Stats animation
      gsap.fromTo(".testimonial-stat", 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".testimonials-stats",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const stats = [
    { icon: Users, value: "500K+", label: "Happy Creators" },
    { icon: Play, value: "50M+", label: "Videos Created" },
    { icon: TrendingUp, value: "300%", label: "Avg. Growth" },
    { icon: Award, value: "4.9/5", label: "User Rating" }
  ]

  return (
    <section 
      id="testimonials"
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#3ac4ec]/30 mb-6"
          >
            <Quote className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600 font-jetbrains-mono tracking-wider">
              SUCCESS STORIES
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Creators</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of content creators, marketers, and brands who have transformed 
            their video content with Zsideo&apos;s platform.
          </p>
        </div>

        {/* Stats */}
        <div className="testimonials-stats grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="testimonial-stat text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#3ac4ec] to-[#ef4444] flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-space-grotesk mb-2">
                {stat.value}
              </div>
              <p className="text-slate-500 font-jetbrains-mono text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/40 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Avatar & Info */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#3ac4ec] to-[#ef4444] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {testimonials[currentTestimonial].platform[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Quote */}
                  <Quote className="w-8 h-8 text-blue-600 mb-4" />
                  
                  <blockquote className="text-xl md:text-2xl text-slate-800 leading-relaxed mb-6 font-inter">
                    &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                  </blockquote>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#f59e0b] fill-current" />
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 font-space-grotesk">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-slate-600">
                        {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].company}
                      </p>
                      <p className="text-blue-600 text-sm font-jetbrains-mono">
                        {testimonials[currentTestimonial].followers} followers
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="hidden md:flex items-center gap-4">
                      {Object.entries(testimonials[currentTestimonial].metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-blue-600 font-space-grotesk">
                            {value}
                          </div>
                          <div className="text-xs text-slate-500 font-jetbrains-mono">
                            {key.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white/40 flex items-center justify-center text-slate-700 hover:border-blue-400/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-slate-400 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white/40 flex items-center justify-center text-slate-700 hover:border-blue-400/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4 font-space-grotesk">
            Ready to Join Them?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Start creating viral content today and see why creators love Zsideo.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#3ac4ec] to-[#ef4444] text-white font-bold text-lg glow-hover"
          >
            Contact us to get started
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}