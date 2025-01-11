import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateVillage = ({ handleClose, village, onUpdate }) => {
  const [villageName, setVillageName] = useState(village ? village.name : '');
  const [region, setRegion] = useState(village ? village.region : '');
  const [landArea, setLandArea] = useState(village ? village.landArea : '');
  const [latitude, setLatitude] = useState(village ? village.coordinates.lat : '');
  const [longitude, setLongitude] = useState(village ? village.coordinates.lng : '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (village) {
      setVillageName(village.name);
      setRegion(village.region || '');
      setLandArea(village.landArea || '');
      setLatitude(village.coordinates.lat || '');
      setLongitude(village.coordinates.lng || '');
    }
  }, [village]);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/graphql', {
        query: `
          mutation {
            updateVillage(id: "${village.id}", updates: {
              name: "${villageName}",
              population: ${village.population || 0},
              landArea: ${landArea || 0},
              urbanAreas: ${village.urbanAreas || 0},
              coordinates: {
                lat: ${latitude || 0},
                lng: ${longitude || 0}
              }
            }) {
              id
              name
              population
              landArea
              urbanAreas
              coordinates {
                lat
                lng
              }
            }
          }
        `,
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      // تحديث القائمة في الواجهة الأمامية
      onUpdate(response.data.data.updateVillage);
      handleClose(); // إغلاق النافذة بعد التحديث
    } catch (error) {
      console.error('Error updating village:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
          onClick={handleClose}
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">Update Village</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Village Name:</label>
            <input
              type="text"
              value={villageName}
              onChange={(e) => setVillageName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Region/District:</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Land Area (sq km):</label>
            <input
              type="text"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Latitude:</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Longitude:</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Upload Image:</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded bg-blue-600 text-white font-bold"
          >
            Update Village
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVillage;