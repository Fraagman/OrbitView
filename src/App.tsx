import React from 'react';
import Globe from './components/Globe/Globe';
import Dashboard from './components/Dashboard/Dashboard';
import { useISSPosition } from './hooks/useISSPosition';

function App() {
  const { position, loading, error } = useISSPosition();

  if (error) {
    return (
      <div className="w-screen h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-2">Error loading ISS data</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-950 relative overflow-hidden">
      <Globe issPosition={position} />
      <Dashboard issPosition={position} />

      <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
        <p>OrbitView - Real-time ISS Tracker</p>
      </div>
    </div>
  );
}

export default App;