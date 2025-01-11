import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Sidebar from '../components/Sidebar/Sidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Overview = () => {
  const [populationData, setPopulationData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [mapData, setMapData] = useState([]);

  // Fetch data from the backend using GraphQL
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in a single GraphQL query
        const response = await axios.post('http://localhost:5000/graphql', {
          query: `
            query {
              populationData {
                name
                population
              }
              ageDistribution {
                ageGroup
                total
              }
              genderRatio {
                gender
                total
              }
              mapData {
                name
                coordinates {
                  lat
                  lng
                }
              }
            }
          `,
        });

        // Check for errors in the GraphQL response
        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        // Extract data from the response
        const { populationData, ageDistribution, genderRatio, mapData } = response.data.data;

        // Set state with the fetched data
        setPopulationData(populationData);
        setAgeData(ageDistribution);
        setGenderData(genderRatio);
        setMapData(mapData);
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
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar with fixed position */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 shadow-lg">
        <Sidebar />
      </div>

      {/* Main content with padding to account for the sidebar */}
      <div className="flex-1 p-4 sm:p-6 ml-64">
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

      </div>
    </div>
  );
};

export default Overview;