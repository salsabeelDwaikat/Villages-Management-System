import React, { useState } from 'react';
import axios from 'axios';

const AddVillage = () => {
  const [village, setVillage] = useState({
    name: '',
    population: '',
    landArea: '',
    latitude: '',
    longitude: '',
    urbanAreas: '',
    image: null,
    tags: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVillage({
      ...village,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setVillage({
      ...village,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const graphqlQuery = {
      query: `
        mutation AddVillage($name: String!, $population: Int!, $landArea: Float!, $urbanAreas: Int!, $coordinates: CoordinatesInput!) {
          addVillage(name: $name, population: $population, landArea: $landArea, urbanAreas: $urbanAreas, coordinates: $coordinates) {
            id
            name
          }
        }
      `,
      variables: {
        name: village.name,
        population: parseInt(village.population),
        landArea: parseFloat(village.landArea),
        urbanAreas: parseInt(village.urbanAreas),
        coordinates: {
          lat: parseFloat(village.latitude),
          lng: parseFloat(village.longitude)
        }
      }
    };
  
    try {
      const response = await axios.post('http://localhost:5000/graphql', graphqlQuery, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      setMessage('Village added successfully!');
      setVillage({
        name: '',
        population: '',
        landArea: '',
        latitude: '',
        longitude: '',
        urbanAreas: ''
      });
    } catch (error) {
      console.error('Error adding village:', error.response ? error.response.data : error.message);
      setMessage('Failed to add village. Please try again.');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-800 p-3 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-2">Add New Village</h2>
      {message && <p className="text-white mb-2">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className="block text-white mb-1" htmlFor="name">Village Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={village.name}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-1">
          <label className="block text-white mb-1" htmlFor="population">Population:</label>
          <input
            type="text"
            id="population"
            name="population"
            value={village.population}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-1">
          <label className="block text-white mb-1" htmlFor="landArea">Land Area (sq km):</label>
          <input
            type="text"
            id="landArea"
            name="landArea"
            value={village.landArea}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-1">
          <label className="block text-white mb-1" htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={village.latitude}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-1">
          <label className="block text-white mb-1" htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={village.longitude}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-1">
          <label className="block text-white mb-1" htmlFor="urbanAreas">Urban Areas:</label>
          <input
            type="text"
            id="urbanAreas"
            name="urbanAreas"
            value={village.urbanAreas}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-1">
          <label className="block text-white mb-1" htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-1">
          <label className="block text-white mb-1" htmlFor="tags">Categories/Tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={village.tags}
            onChange={handleChange}
            placeholder="e.g., rural, mountainous"
            className="w-full p-1 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
        >
          Add Village
        </button>
      </form>
    </div>
  );
};

export default AddVillage;