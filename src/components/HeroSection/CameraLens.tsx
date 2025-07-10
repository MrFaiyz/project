"use client"

import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import * as THREE from "three"

export default function CameraLens() {
  const group = useRef<THREE.Group>(null!)
  const { scene } = useGLTF("/models/uploads_files_5084032_Cam1.glb")

  useEffect(() => {
    if (group.current) {
      // Initial animation
      gsap.fromTo(group.current.scale, 
        { x: 0, y: 0, z: 0 },
        { 
          x: 8, 
          y: 8, 
          z: 8, 
          duration: 1.5, 
          delay: 1,
          ease: "back.out(1.7)" 
        }
      )

      gsap.fromTo(group.current.rotation, 
        { y: Math.PI * 2 },
        { 
          y: 0, 
          duration: 2, 
          delay: 1,
          ease: "power3.out" 
        }
      )
    }
  }, [])

  useFrame(({ mouse, clock }) => {
    if (group.current) {
      // Mouse interaction
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.x * Math.PI / 6,
        0.05
      )
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouse.y * Math.PI / 12,
        0.05
      )

      // Subtle floating animation
      group.current.position.y = -0.3 + Math.sin(clock.elapsedTime * 0.8) * 0.05
    }
  })

  return (
    <group ref={group} position={[0, -0.3, 0]} scale={8} castShadow receiveShadow>
      <primitive object={scene} />
      
      {/* Additional glow effect */}
      <mesh position={[0, 0, 0]} scale={1.2}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial 
          color="#60a5fa" 
          transparent 
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}