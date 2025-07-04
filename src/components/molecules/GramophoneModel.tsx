// src/components/molecules/GramophoneModel.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Cone, Torus } from '@react-three/drei';
import type { Group } from 'three';

const audioUrl = 'https://cdn.pixabay.com/audio/2022/09/25/audio_291e5a86cb.mp3';
const audio = new Audio(audioUrl);

export const GramophoneModel = () => {
  const groupRef = useRef<Group>(null!);

  // CORREÇÃO: Renomeamos 'state' para '_state' para indicar que não o estamos a usar
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const playSound = () => {
    console.log('Tocando música...');
    audio.currentTime = 0;
    audio.play();
  };

  return (
    // CORREÇÃO: Removemos a propriedade 'title' que não existe aqui
    <group ref={groupRef} scale={0.4} onClick={playSound}>
      {/* Base */}
      <Cylinder args={[0.3, 0.4, 0.2, 32]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>
      {/* Disco */}
      <Cylinder args={[0.25, 0.25, 0.05, 64]} position={[0, 0.22, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>
      {/* Corneta */}
      <Cone args={[0.3, 0.6, 32, 1]} position={[0, 0.6, 0]} rotation={[0, 0, -0.7]}>
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} />
      </Cone>
      {/* Braço */}
      <Torus args={[0.15, 0.02, 16, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.1, 0.25, 0]}>
        <meshStandardMaterial color="#B87333" />
      </Torus>
    </group>
  );
};