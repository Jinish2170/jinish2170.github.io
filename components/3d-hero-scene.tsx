"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
          transmission={1}
          thickness={0.5}
          ior={1.3}
          chromaticAberration={0.02}
        />
      </Sphere>
    </Float>
  )
}

function FloatingGeometry({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.z += delta * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function ThreeHeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#4f46e5" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={0.5} />
        
        <AnimatedSphere />
        
        <FloatingGeometry position={[-3, 2, -2]} color="#4f46e5" />
        <FloatingGeometry position={[3, -1, -1]} color="#06b6d4" />
        <FloatingGeometry position={[-2, -2, 1]} color="#8b5cf6" />
        <FloatingGeometry position={[2, 1, 2]} color="#10b981" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
