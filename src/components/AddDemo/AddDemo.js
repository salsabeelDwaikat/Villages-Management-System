import React, { useState } from 'react';
import axios from 'axios';

const AddDemo = ({ handleClose, villageId }) => {
  const [ageGroup, setAgeGroup] = useState('');
  const [gender, setGender] = useState('');
  const [count, setCount] = useState('');

  const handleAddData = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/graphql',
        {
          query: `
            mutation {
              addPopulationData(
                villageId: "${villageId}",
                ageGroup: "${ageGroup}",
                gender: "${gender}",
                count: ${parseInt(count)}
              ) {
                id
                villageId
                ageGroup
                gender
                count
              }
            }
          `,
        },
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      console.log('Data added successfully:', response.data.data.addPopulationData);
      handleClose(); // إغلاق النافذة بعد الإضافة
    } catch (error) {
      console.error('Error adding demographic data:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Demographic Data for Jabalia</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Age Group (e.g., 0-18):</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender (e.g., Male, Female):</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Count:</label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            value={count}
            onChange={(e) => setCount(e.target.value)}
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