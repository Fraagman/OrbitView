import { useState, useEffect } from 'react';
import { fetchISSPosition } from '../services/api';
import { OrbitPoint, ISSPosition } from '../types';

// We will use a history of past positions to draw the path
const positionHistory: ISSPosition[] = [];

export const useOrbitPrediction = () => {
  const [orbitPath, setOrbitPath] = useState<OrbitPoint[]>([]);

  useEffect(() => {
    const updateOrbit = async () => {
      try {
        const currentPosition = await fetchISSPosition();
        if (currentPosition) {
          // Add the latest position to the history
          positionHistory.push(currentPosition);
          // Keep only the last 100 positions to avoid a long path
          if (positionHistory.length > 100) {
            positionHistory.shift();
          }
          // Map the history to the path format
          setOrbitPath(positionHistory.map(p => ({
            lat: p.latitude,
            lon: p.longitude,
            alt: p.altitude,
            timestamp: p.timestamp,
          })));
        }
      } catch (error) {
        console.error('Error updating orbit:', error);
      }
    };
    updateOrbit();
    const interval = setInterval(updateOrbit, 3000); // Match the ISS position update interval
    return () => clearInterval(interval);
  }, []);

  return orbitPath;
};