import * as React from 'react';
import { useState } from 'react';

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [cloudType, setCloudType] = useState('AWS');
  const [region, setRegion] = useState('eu-west-1');
  const [minRam, setMinRam] = useState(0);
  const [maxRam, setMaxRam] = useState(64);
  const [minCpu, setMinCpu] = useState(0);
  const [maxCpu, setMaxCpu] = useState(16);

  const handleFilterChange = () => {
    onFilterChange({ cloudType, region, minRam, maxRam, minCpu, maxCpu });
  };

  return (
    <div>
      <h2>Filter Instances</h2>
      <div>
        <label>
          Cloud Type:
          <input type="text" value={cloudType} onChange={(e) => setCloudType(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Region:
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Min RAM:
          <input type="number" value={minRam} onChange={(e) => setMinRam(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Max RAM:
          <input type="number" value={maxRam} onChange={(e) => setMaxRam(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Min CPU:
          <input type="number" value={minCpu} onChange={(e) => setMinCpu(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Max CPU:
          <input type="number" value={maxCpu} onChange={(e) => setMaxCpu(Number(e.target.value))} />
        </label>
      </div>
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default FilterPanel;