"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { a } from "@react-spring/three"
import { gsap } from "gsap"
import * as THREE from "three"

export default function TimelineRing() {
  const groupRef = useRef<THREE.Group>(null!)
  const particlesRef = useRef<THREE.Group>(null!)

  useEffect(() => {
    if (groupRef.current) {
      // Initial scale animation
      gsap.fromTo(groupRef.current.scale, 
        { x: 0, y: 0, z: 0 },
        { 
          x: 1, 
          y: 1, 
          z: 1, 
          duration: 1.8, 
          delay: 1.2,
          ease: "elastic.out(1, 0.5)" 
        }
      )
    }
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      
      // Pulsing effect
      const pulse = 1 + Math.sin(clock.elapsedTime * 2) * 0.05
      groupRef.current.scale.setScalar(pulse)
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.003
    }
  })

  const segments = 120
  const radius = 2.8
  const notches = []
  const particles = []

  // Create main ring notches
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    
    const isHighlight = i % 10 === 0
    const height = isHighlight ? 0.3 : 0.2
    const width = isHighlight ? 0.03 : 0.02

    notches.push(
      <a.mesh
        key={i}
        position={[x, 0.05, z]}
        rotation={[0, angle, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial
          color={isHighlight ? "#f87171" : "#60a5fa"}
          metalness={0.8}
          roughness={0.2}
          emissive={isHighlight ? "#f87171" : "#60a5fa"}
          emissiveIntensity={isHighlight ? 0.3 : 0.1}
        />
      </a.mesh>
    )
  }

  // Create floating particles
  for (let i = 0; i < 30; i++) {
    const angle = (i / 30) * Math.PI * 2
    const r = radius + 0.5 + Math.random() * 0.5
    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r
    const y = (Math.random() - 0.5) * 0.5

    particles.push(
      <mesh
        key={i}
        position={[x, y, z]}
      >
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.6}
        />
      </mesh>
    )
  }

  return (
    <>
      <a.group ref={groupRef}>
        {notches}
        
        {/* Inner glow ring */}
        <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
          <meshBasicMaterial
            color="#3ac4ec"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </a.group>

      {/* Floating particles */}
      <group ref={particlesRef}>
        {particles}
      </group>
    </>
  )
}