import React, { useState } from 'react';

const AddDemo = ({ handleClose }) => {
  const [populationSize, setPopulationSize] = useState('');
  const [ageDistribution, setAgeDistribution] = useState('');
  const [genderRatios, setGenderRatios] = useState('');
  const [populationGrowthRate, setPopulationGrowthRate] = useState('');

  const handleAddData = () => {
    // Handle the data submission logic here
    console.log({
      populationSize,
      ageDistribution,
      genderRatios,
      populationGrowthRate,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Demographic Data for Jabalia</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Population Size:</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            value={populationSize}
            onChange={(e) => setPopulationSize(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Age Distribution (e.g., 0-14: 30%, 15-64: 60%, 65+: 10%):</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            value={ageDistribution}
            onChange={(e) => setAgeDistribution(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender Ratios (e.g., Male: 51%, Female: 49%):</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            value={genderRatios}
            onChange={(e) => setGenderRatios(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Population Growth Rate:</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            value={populationGrowthRate}
            onChange={(e) => setPopulationGrowthRate(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold mb-2"
          onClick={handleAddData}
        >
          Add Demographic Data
        </button>
        <button
          className="w-full py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-semibold"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddDemo;
