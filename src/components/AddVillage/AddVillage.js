import React, { useState } from 'react';

const AddVillage = () => {
  const [village, setVillage] = useState({
    name: '',
    region: '',
    landArea: '',
    latitude: '',
    longitude: '',
    image: null,
    tags: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(village);
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-800 p-3 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-2">Add New Village</h2>
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
          <label className="block text-white mb-1" htmlFor="region">Region/District:</label>
          <input
            type="text"
            id="region"
            name="region"
            value={village.region}
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
