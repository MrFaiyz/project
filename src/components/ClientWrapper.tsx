"use client"

import LoadingScreen from "./LoadingScreen"
import { useState, useEffect } from "react"

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for assets and 3D models
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Increased to 3 seconds for better content loading

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && children}
    </>
  )
}