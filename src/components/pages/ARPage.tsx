// src/components/pages/ARPage.tsx
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ARButton, XR, useHitTest, Interactive } from '@react-three/xr';
import { ArrowLeft } from 'lucide-react';
import { useRef } from 'react';
import type { Group, Matrix4 } from 'three';
import { GramophoneModel } from '../molecules/GramophoneModel'; // 1. Importe o nosso novo modelo

function HitPlacer() {
  const ref = useRef<Group>(null!);

  useHitTest((hitMatrix: Matrix4) => {
    if (ref.current) {
      ref.current.matrix.fromArray(hitMatrix.elements);
    }
  });

  return (
    <group ref={ref}>
      {/* 2. Renderiza o Gramofone em vez do cubo */}
      <GramophoneModel />
    </group>
  );
}

export const ARPage = () => {
  return (
    <>
      <ARButton
        sessionInit={{ requiredFeatures: ['hit-test'] }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 p-3 bg-blue-600 text-white rounded-lg font-bold"
      />
      <Link to="/" className="absolute top-4 left-4 z-20 p-3 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors">
        <ArrowLeft />
      </Link>
      <Canvas>
        <XR>
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} />
          {/* O HitPlacer agora vai posicionar o nosso gramofone */}
          <HitPlacer />
        </XR>
      </Canvas>
    </>
  );
};