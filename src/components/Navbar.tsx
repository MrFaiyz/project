"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X, Play, Sparkles } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" }
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2 
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-sm border-b border-white/30' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="relative">
            <Sparkles className="w-8 h-8 text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 w-8 h-8 bg-blue-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
          </div>
          <span className="text-2xl font-bold font-space-grotesk bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            zsideo
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + index * 0.1,
                ease: "easeOut" 
              }}
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <Link 
                href={item.href} 
                className={`transition-colors duration-300 font-medium ${
                  isScrolled ? 'text-slate-700 hover:text-slate-900' : 'text-white hover:text-blue-200'
                }`}
              >
                {item.name}
              </Link>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
          ))}

          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              type: "spring",
              stiffness: 200 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold overflow-hidden shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <Play className="w-4 h-4" />
                Get Started
              </div>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors ${
            isScrolled ? 'text-slate-700' : 'text-white'
          }`}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0, 
          height: isMobileMenuOpen ? "auto" : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white/80 backdrop-blur-sm border-t border-white/30 overflow-hidden"
      >
        <div className="px-6 py-4 space-y-4">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: isMobileMenuOpen ? 0 : -20, 
                opacity: isMobileMenuOpen ? 1 : 0 
              }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-slate-900 transition-colors py-2"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ 
              x: isMobileMenuOpen ? 0 : -20, 
              opacity: isMobileMenuOpen ? 1 : 0 
            }}
            transition={{ delay: 0.4 }}
            className="w-full mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  )
}