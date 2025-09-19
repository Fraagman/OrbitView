import React from 'react';
import { ISSPosition } from '../../types';
import DataPanel from './DataPanel';
import CrewList from './CrewList';

interface DashboardProps {
  issPosition: ISSPosition | null;
}

const Dashboard: React.FC<DashboardProps> = ({ issPosition }) => {
  return (
    <div className="absolute top-4 left-4 z-10 space-y-4">
      <DataPanel position={issPosition} />
    </div>
  );
};

export default Dashboard;