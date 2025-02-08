import React from 'react';
import { Instance } from '../types';

interface InstanceListProps {
  instances: Instance[];
}

const InstanceList: React.FC<InstanceListProps> = ({ instances }) => {
  return (
    <div>
      <h2>Available Instances</h2>
      <ul>
        {instances.map((instance) => (
          <li key={instance.id}>
            <h3>{instance.name}</h3>
            <p>Type: {instance.type}</p>
            <p>Region: {instance.region}</p>
            <p>RAM: {instance.ram} GB</p>
            <p>CPU: {instance.cpu} vCPUs</p>
            <p>Price: ${instance.price} per hour</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstanceList;