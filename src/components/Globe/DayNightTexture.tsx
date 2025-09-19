import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const DayNightTexture: React.FC = () => {
  const [dayMap, nightMap] = useTexture(['/earth_day_map.jpg', '/earth_night_map.jpg']);

  // This will apply the textures to the globe.
  return (
    <meshStandardMaterial
      map={dayMap}
      emissive={nightMap}
      emissiveIntensity={0.1}
      emissiveMap={nightMap}
      side={THREE.DoubleSide}
    />
  );
};

export default DayNightTexture;