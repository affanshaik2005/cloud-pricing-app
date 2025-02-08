import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterPanel from './components/FilterPanel';
import InstanceList from './components/InstanceList';
import { Instance, FilterParams } from './types';

const App: React.FC = () => {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    cloudType: 'AWS',
    region: 'eu-west-1',
    minRam: 0,
    maxRam: undefined,
    minCpu: 0,
    maxCpu: undefined,
  });

  useEffect(() => {
    fetchInstances();
  }, [filters]);

  const fetchInstances = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/instances', {
        params: filters,
      });
      setInstances(response.data);
    } catch (error) {
      console.error('Error fetching instances:', error);
    }
  };

  const handleFilterChange = (newFilters: FilterParams) => {
    setFilters(newFilters);
  };

  return (
    <div className="App">
      <h1>Cloud Instance Pricing</h1>
      <FilterPanel onFilterChange={handleFilterChange} />
      <InstanceList instances={instances} />
    </div>
  );
};

export default App;