import React from 'react';
import { useOrbitPrediction } from '../../hooks/useOrbitPrediction';
import { toCartesian } from '../../services/calculations';
import * as THREE from 'three';

const OrbitPath: React.FC = () => {
  const orbit = useOrbitPrediction();

  if (orbit.length === 0) {
    return null; // Return nothing if the data hasn't loaded yet
  }

  const points = orbit.map((point) => toCartesian(point.lat, point.lon, 1 + point.alt / 6371));

  return (
    <line>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
          count={points.length}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color="#ffff00" />
    </line>
  );
};

export default OrbitPath;