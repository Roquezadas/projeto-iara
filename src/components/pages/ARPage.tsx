// src/components/pages/ARPage.tsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { ARButton, XR, useHitTest, Interactive } from '@react-three/xr';
import { ArrowLeft } from 'lucide-react';
import type { Group, Matrix4 } from 'three';

function HitModel() {
  const groupRef = useRef<Group>(null!);

  useHitTest((hitMatrix: Matrix4) => {
    if (groupRef.current) {
      groupRef.current.matrix.fromArray(hitMatrix.elements);
    }
  });

  // A CORREÇÃO ESTÁ AQUI: removemos o parâmetro 'event' que não estava sendo usado.
  const onSelect = () => {
    if (groupRef.current) {
      // Faz o modelo "pular" ao ser tocado
      groupRef.current.position.y += 0.05;
      setTimeout(() => {
        if(groupRef.current) groupRef.current.position.y -= 0.05;
      }, 100);
    }
  };

  return (
    <group ref={groupRef}>
      <Interactive onSelect={onSelect}>
        <Box args={[0.1, 0.1, 0.1]}>
          <meshStandardMaterial color="orange" />
        </Box>
      </Interactive>
    </group>
  );
}

export const ARPage = () => {
  return (
    <>
      <ARButton
        sessionInit={{
          requiredFeatures: ['hit-test'],
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 p-3 bg-blue-600 text-white rounded-lg font-bold"
      />

      <Link to="/" className="absolute top-4 left-4 z-20 p-3 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors">
        <ArrowLeft />
      </Link>

      <Canvas>
        <XR>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <HitModel />
        </XR>
      </Canvas>
    </>
  );
};