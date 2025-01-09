import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Overview = () => {
  const [populationData, setPopulationData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [mapData, setMapData] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch population data
        const populationResponse = await axios.get('http://localhost:5000/api/overview/population');
        console.log('Population Data:', populationResponse.data);
        setPopulationData(populationResponse.data);
    
        // Fetch age distribution data
        const ageResponse = await axios.get('http://localhost:5000/api/overview/age-distribution');
        console.log('Age Data:', ageResponse.data);
        setAgeData(ageResponse.data);
    
        // Fetch gender ratio data
        const genderResponse = await axios.get('http://localhost:5000/api/overview/gender-ratio');
        console.log('Gender Data:', genderResponse.data);
        setGenderData(genderResponse.data);
    
        // Fetch map data
        const mapResponse = await axios.get('http://localhost:5000/api/overview/map-data');
        console.log('Map Data:', mapResponse.data);
        setMapData(mapResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  // Format population data for the chart
  const populationChartData = {
    labels: populationData.map(village => village.name),
    datasets: [
      {
        label: 'Population',
        data: populationData.map(village => village.population),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Format age distribution data for the chart
  const ageChartData = {
    labels: ageData.map(group => group.ageGroup),
    datasets: [
      {
        label: 'Age Distribution',
        data: ageData.map(group => group.total),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };
  // Format gender ratio data for the chart
  const genderChartData = {
    labels: genderData.map(group => group.gender),
    datasets: [
      {
        label: 'Gender Ratio',
        data: genderData.map(group => group.total),
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };
  // Default map center (first village's coordinates)
  const mapCenter = mapData.length > 0 ? [mapData[0].coordinates.lat, mapData[0].coordinates.lng] : [32.2211, 35.2544];

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen text-white">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-300 mb-3 sm:mb-4">Overview</h1>
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <MapContainer center={mapCenter} zoom={10} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapData.map((village, index) => (
              <Marker key={index} position={[village.coordinates.lat, village.coordinates.lng]}>
                <Popup>{village.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-300">Total Number of Villages</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-500">{populationData.length}</p>
        </div>
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-300">Total Number of Urban Areas</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-500">3</p>
        </div>
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-300">Total Population Size</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-500">
            {populationData.reduce((total, village) => total + village.population, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-300">Average Land Area</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-500">11.88 sq km</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-300 mb-3 sm:mb-4">Age Distribution</h3>
          <Pie
            data={ageChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#fff',
                  },
                },
                title: {
                  display: true,
                  text: 'Age Distribution',
                  color: '#fff',
                },
              },
            }}
          />
        </div>

        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-300 mb-3 sm:mb-4">Gender Ratios</h3>
          <Pie
            data={genderChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#fff',
                  },
                },
                title: {
                  display: true,
                  text: 'Gender Ratio',
                  color: '#fff',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h3 className="text-sm sm:text-lg font-semibold text-gray-300 mb-3 sm:mb-4">Population Distribution</h3>
        <Bar
          data={populationChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#fff',
                },
              },
              title: {
                display: true,
                text: 'Population by Village',
                color: '#fff',
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#fff',
                },
                grid: {
                  color: '#4a5568',
                },
              },
              y: {
                ticks: {
                  color: '#fff',
                },
                grid: {
                  color: '#4a5568',
                },
              },
            },
          }}
        />
      </div>

      <div className="flex justify-between items-center bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
        <p className="text-sm sm:text-lg font-semibold text-gray-300">Admin Name</p>
        <button className="bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Overview;