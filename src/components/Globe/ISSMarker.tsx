import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ISSPosition } from '../../types';

interface ISSMarkerProps {
  position: ISSPosition;
}

const ISSMarker: React.FC<ISSMarkerProps> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/iss-model.glb');

  const cartesianPosition = useMemo(() => {
    const phi = (90 - position.latitude) * (Math.PI / 180);
    const theta = (position.longitude + 180) * (Math.PI / 180);
    const radius = 1 + position.altitude / 6371;

    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }, [position]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(new THREE.Vector3(0, 0, 0));
    }
  });

  return (
    <group ref={groupRef} position={cartesianPosition}>
      <primitive object={scene} scale={0.0100} />
    </group>
  );
};

export default ISSMarker;
