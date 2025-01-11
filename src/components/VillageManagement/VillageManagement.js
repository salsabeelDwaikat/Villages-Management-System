import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import AddVillage from '../AddVillage/AddVillage';
import UpdateVillage from '../UpdateVillage/UpdateVillage';
import AddDemo from '../AddDemo/AddDemo';

const VillageManagement = () => {
  const [villages, setVillages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [modalState, setModalState] = useState({
    addVillage: false,
    view: false,
    update: false,
    addDemo: false,
  });
  const [currentVillage, setCurrentVillage] = useState(null);

  // جلب القرى من Backend
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await axios.post('http://localhost:5000/graphql', {
          query: `
            query {
              villages {
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

        setVillages(response.data.data.villages);
      } catch (error) {
        console.error('Error fetching villages:', error);
      }
    };

    fetchVillages();
  }, []);

  // دالة حذف القرية
  const handleDeleteVillage = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this village?');
    if (!confirmDelete) return;

    try {
      const response = await axios.post('http://localhost:5000/graphql', {
        query: `
          mutation {
            deleteVillage(id: "${id}") {
              id
              name
            }
          }
        `,
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      // تحديث القائمة بعد الحذف
      const updatedVillages = villages.filter((v) => v.id !== id);
      setVillages(updatedVillages);
    } catch (error) {
      console.error('Error deleting village:', error);
    }
  };

  // دالة تحديث القرية
  const handleUpdateVillage = (updatedVillage) => {
    const updatedVillages = villages.map((v) =>
      v.id === updatedVillage.id ? updatedVillage : v
    );
    setVillages(updatedVillages);
    setModalState({ ...modalState, update: false });
  };

  // عرض القرى
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

    return filteredVillages.map((village) => (
      <div
        key={village.id}
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
            onClick={() => handleDeleteVillage(village.id)}
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

  // دالة إضافة قرية جديدة
  const handleAddVillage = (village) => {
    setVillages([...villages, village]);
    setModalState({ ...modalState, addVillage: false });
  };

  return (
    <div className="flex min-h-screen bg-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
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
              <p className="text-white mb-4"><strong>Latitude:</strong> {currentVillage.coordinates.lat}</p>
              <p className="text-white mb-4"><strong>Longitude:</strong> {currentVillage.coordinates.lng}</p>
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
    <UpdateVillage
      handleClose={() => setModalState({ ...modalState, update: false })}
      village={currentVillage}
      onUpdate={handleUpdateVillage}
    />
  </div>
)}


{modalState.addDemo && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <AddDemo
      handleClose={() => setModalState({ ...modalState, addDemo: false })}
      villageId={currentVillage.id} // تمرير معرف القرية
    />
  </div>
)}
      </div>
    </div>
  );
};

export default VillageManagement;