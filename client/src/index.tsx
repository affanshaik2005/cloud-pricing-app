import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
    interface Instance {
        id: string;
        cloud_type: string;
        region: string;
        instance_type: string;
        cpu: number;
        ram: number;
        price: number;
        unit: string;
    }

    const [instances, setInstances] = useState<Instance[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        minRam: '',
        maxRam: '',
        minCpu: '',
        maxCpu: '',
    });

    useEffect(() => {
        // Initial data load
        fetchInstances();
    }, []); // Empty dependency array for initial load

    const fetchInstances = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/instances', {
                params: {
                    minRam: filters.minRam || 0,
                    maxRam: filters.maxRam || Number.MAX_SAFE_INTEGER,
                    minCpu: filters.minCpu || 0,
                    maxCpu: filters.maxCpu || Number.MAX_SAFE_INTEGER,
                }
            });
            setInstances(response.data);
            console.log('Fetched instances:', response.data); // Debug log
        } catch (error) {
            console.error('Error fetching instances:', error);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApplyFilters = () => {
        fetchInstances();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cloud Pricing App</h1>
            
            <button 
                onClick={() => setShowFilters(!showFilters)}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {showFilters && (
                <div style={{ 
                    margin: '20px 0',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f8f9fa'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label>
                            Min RAM (GB):
                            <input 
                                type="number" 
                                name="minRam" 
                                value={filters.minRam}
                                onChange={handleFilterChange}
                                style={{ marginLeft: '10px', padding: '5px' }}
                            />
                        </label>
                        <label>
                            Max RAM (GB):
                            <input 
                                type="number" 
                                name="maxRam" 
                                value={filters.maxRam}
                                onChange={handleFilterChange}
                                style={{ marginLeft: '10px', padding: '5px' }}
                            />
                        </label>
                        <label>
                            Min CPU:
                            <input 
                                type="number" 
                                name="minCpu" 
                                value={filters.minCpu}
                                onChange={handleFilterChange}
                                style={{ marginLeft: '10px', padding: '5px' }}
                            />
                        </label>
                        <label>
                            Max CPU:
                            <input 
                                type="number" 
                                name="maxCpu" 
                                value={filters.maxCpu}
                                onChange={handleFilterChange}
                                style={{ marginLeft: '10px', padding: '5px' }}
                            />
                        </label>
                        <button 
                            onClick={handleApplyFilters}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '10px',
                                width: 'fit-content'
                            }}
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}

            {instances.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>Instance Type</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>RAM (GB)</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>CPU</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>Price ($/hour)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instances.map(instance => (
                            <tr key={instance.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{instance.instance_type}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{instance.ram}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{instance.cpu}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>${instance.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No instances found matching the criteria.</p>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
