"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Environment, ContactShadows } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"
import CameraLens from "./CameraLens"
import TimelineRing from "./TimelineRing"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Scene3D() {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null!)
  const cameraRef = useRef(camera)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Add a small delay to ensure everything is mounted
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100)

    cameraRef.current = camera

    // Delayed initial camera animation to prevent stutter
    const cameraTimeline = gsap.timeline({ delay: 1 })
    
    cameraTimeline
      .fromTo(camera.position, 
        { x: 10, y: 5, z: 10 },
        { 
          x: 0, 
          y: 1.5, 
          z: 5, 
          duration: 2, 
          ease: "power3.out" 
        }
      )
      .fromTo(camera.rotation, 
        { x: -0.5, y: 0.8, z: 0.3 },
        { 
          x: 0, 
          y: 0, 
          z: 0, 
          duration: 2, 
          ease: "power3.out" 
        }, "-=2"
      )

    // Scroll-triggered camera animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "center center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Camera zoom out and slight movement
          camera.position.x = THREE.MathUtils.lerp(0, -1, progress)
          camera.position.y = THREE.MathUtils.lerp(1.5, 2.5, progress)
          camera.position.z = THREE.MathUtils.lerp(5, 12, progress)
          
          // Subtle camera rotation
          camera.rotation.x = THREE.MathUtils.lerp(0, -0.05, progress)
          camera.rotation.y = THREE.MathUtils.lerp(0, 0.1, progress)
          
          camera.updateProjectionMatrix()
        }
      }
    })

    return () => {
      tl.kill()
      clearTimeout(timer)
    }
  }, [camera])

  useFrame((state) => {
    if (!isReady) return
    
    // Subtle camera sway
    if (cameraRef.current) {
      cameraRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.5) * 0.002
      cameraRef.current.position.y += Math.cos(state.clock.elapsedTime * 0.3) * 0.001
    }
  })

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        position={[5, 5, 5]}
        intensity={1.2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#3ac4ec" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#3b82f6" />

      {/* Environment */}
      <Environment preset="city" background={false} />
      
      {/* Ground shadows */}
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.6}
        scale={15}
        blur={2.5}
        far={5}
        color="#000000"
      />

      {/* Main 3D Objects */}
      {isReady && (
        <>
          <CameraLens />
          <TimelineRing />
        </>
      )}
    </group>
  )
}