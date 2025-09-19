import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { ISSPosition } from '../../types';
import ISSMarker from './ISSMarker';
import OrbitPath from './OrbitPath';
import DayNightTexture from './DayNightTexture'; // Make sure this line exists

interface GlobeProps {
  issPosition: ISSPosition | null;
}

const Globe: React.FC<GlobeProps> = ({ issPosition }) => {
  const globeRef = useRef<THREE.Mesh>(null);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Sphere ref={globeRef} args={[1, 64, 64]}>
          <DayNightTexture />
        </Sphere>

        {issPosition && (
          <>
            <ISSMarker position={issPosition} />
            <OrbitPath />
          </>
        )}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
          minDistance={1.5}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
};

export default Globe;