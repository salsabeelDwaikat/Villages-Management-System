import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import AddVillage from '../AddVillage/AddVillage';
import UpdateVillage from '../UpdateVillage/UpdateVillage';
import AddDemo from '../AddDemo/AddDemo';

const VillageManagement = () => {
  const [villages, setVillages] = useState([
    {
      name: 'Jabalia - Gaza Strip',
      region: 'Gaza Strip',
      landArea: 10,
      latitude: '31.9522',
      longitude: '35.2034',
      image: null,
      tags: 'Example Tag',
    },
    {
      name: 'Beit Lahia - Gaza Strip',
      region: 'Gaza Strip',
      landArea: 20,
      latitude: '31.5400',
      longitude: '34.5153',
      image: null,
      tags: 'Example Tag',
    },
    {
      name: 'Quds - West Bank',
      region: 'West Bank',
      landArea: 30,
      latitude: '31.7767',
      longitude: '35.2345',
      image: null,
      tags: 'Example Tag',
    },
    {
      name: 'Shejaiya - Gaza Strip',
      region: 'Gaza Strip',
      landArea: 25,
      latitude: '31.5123',
      longitude: '34.4556',
      image: null,
      tags: 'Example Tag',
    },
    {
      name: 'Hebron - West Bank',
      region: 'West Bank',
      landArea: 40,
      latitude: '31.5244',
      longitude: '35.1107',
      image: null,
      tags: 'Example Tag',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [modalState, setModalState] = useState({
    addVillage: false,
    view: false,
    update: false,
    addDemo: false,
  });
  const [currentVillage, setCurrentVillage] = useState(null);

  const renderVillages = () => {
    let filteredVillages = [...villages];

    if (searchQuery) {
      filteredVillages = filteredVillages.filter((village) =>
        village.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === 'alphabetical') {
      filteredVillages.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filteredVillages.map((village, index) => (
      <div
        key={index}
        className="flex justify-between items-center p-4 bg-gray-800 rounded-lg mb-2 shadow-md"
      >
        <span className="text-white font-medium">{village.name}</span>
        <div className="space-x-2">
          <button
            className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
            onClick={() => {
              setCurrentVillage(village);
              setModalState({ ...modalState, view: true });
            }}
          >
            View
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
            onClick={() => {
              setCurrentVillage(village);
              setModalState({ ...modalState, update: true });
            }}
          >
            Update Village
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
            onClick={() => {
              const updatedVillages = villages.filter((_, i) => i !== index);
              setVillages(updatedVillages);
            }}
          >
            Delete Village
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
            onClick={() => {
              setCurrentVillage(village);
              setModalState({ ...modalState, addDemo: true });
            }}
          >
            Update Demographic Data
          </button>
        </div>
      </div>
    ));
  };

  const handleAddVillage = (village) => {
    setVillages([...villages, village]);
    setModalState({ ...modalState, addVillage: false });
  };

  return (
    <>
      <Sidebar />
      <div className="p-8 bg-gray-800 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-white">Village Management</h1>
          <button
            className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
            onClick={() => setModalState({ ...modalState, addVillage: true })}
          >
            Add New Village
          </button>
        </header>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search villages..."
            className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-600 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-600 text-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by: Default</option>
            <option value="alphabetical">Sort by: Alphabetical</option>
          </select>
          <div>{renderVillages()}</div>
        </div>

        {/* Add Village Modal */}
        {modalState.addVillage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-700 p-4 rounded-lg shadow-lg w-96">
              <AddVillage handleAddVillage={handleAddVillage} />
              <button
                className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700 mt-2"
                onClick={() => setModalState({ ...modalState, addVillage: false })}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* View Modal */}
        {modalState.view && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-700 p-4 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold text-white mb-4">Village Details</h2>
              <p className="text-white mb-4"><strong>Village Name:</strong> {currentVillage.name}</p>
              <p className="text-white mb-4"><strong>Region/District:</strong> {currentVillage.region}</p>
              <p className="text-white mb-4"><strong>Land Area (sq km):</strong> {currentVillage.landArea}</p>
              <p className="text-white mb-4"><strong>Latitude:</strong> {currentVillage.latitude}</p>
              <p className="text-white mb-4"><strong>Longitude:</strong> {currentVillage.longitude}</p>
              <p className="text-white mb-4"><strong>Tags:</strong> {currentVillage.tags}</p>
              <div className="text-white mb-4"><strong>Village Image:</strong> <span className="italic">[Image Placeholder]</span></div>
              <button
                className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
                onClick={() => setModalState({ ...modalState, view: false })}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {modalState.update && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <UpdateVillage handleClose={() => setModalState({ ...modalState, update: false })} />
          </div>
        )}

        {/* Add Demo Modal */}
        {modalState.addDemo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <AddDemo handleClose={() => setModalState({ ...modalState, addDemo: false })} />
          </div>
        )}
      </div>
    </>
  );
};

export default VillageManagement;
