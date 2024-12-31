import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from 'chart.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OverviewPage = () => {
  const agePieChartRef = useRef(null);
  const genderPieChartRef = useRef(null);
  const histogramChartRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);  // Ref to store map instance

  useEffect(() => {
    // Initialize Chart.js
    Chart.register(
      CategoryScale,
      LinearScale,
      BarElement,
      BarController,
      Title,
      Tooltip,
      Legend,
      PieController,
      ArcElement
    );

    // Initialize Map using Leaflet (only once)
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView([31.963, 35.203], 8);  // Define map here

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      L.marker([31.7054, 35.2024])
        .addTo(mapInstance.current)
        .bindPopup('<b>Welcome to Bethlehem!</b><br>This is a popular city in Palestine.')
        .openPopup();

      mapInstance.current.invalidateSize();
    }

    // Age Distribution Pie Chart
    const agePieCtx = document.getElementById('agePieChart').getContext('2d');
    agePieChartRef.current = new Chart(agePieCtx, {
      type: 'pie',
      data: {
        labels: ['0-18 years', '19-35 years', '36-60 years', '60+ years'],
        datasets: [
          {
            label: 'Age Distribution',
            data: [30, 35, 25, 10],
            backgroundColor: ['#76c7c0', '#3498db', '#f39c12', '#e74c3c'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    // Gender Ratio Pie Chart
    const genderPieCtx = document.getElementById('genderPieChart').getContext('2d');
    genderPieChartRef.current = new Chart(genderPieCtx, {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label: 'Gender Ratio',
            data: [48, 52],
            backgroundColor: ['#3498db', '#e74c3c'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    // Population Histogram Chart
    const histogramCtx = document.getElementById('histogramChart').getContext('2d');
    histogramChartRef.current = new Chart(histogramCtx, {
      type: 'bar',
      data: {
        labels: ['Village A', 'Village B', 'Village C', 'Village D', 'Village E'],
        datasets: [
          {
            label: 'Population Size',
            data: [500, 1500, 1200, 800, 300],
            backgroundColor: '#3498db',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Villages',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Population Size',
            },
          },
        },
      },
    });
  }, []);  // Empty dependency array ensures this runs only once on mount

  return (
    <div style={{ padding: '20px', boxSizing: 'border-box' }}>
      {/* Header with Title */}
      <header
        style={{
          marginBottom: '30px',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#3498db',
          color: 'white',
          fontSize: '32px',
          fontWeight: 'bold',
          borderRadius: '8px',
        }}
      >
        Overview
      </header>

      {/* Map Section */}
      <div style={{ flexGrow: 1, marginBottom: '30px' }}>
        <div
          ref={mapRef}
          style={{
            height: '50vh',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        ></div>
      </div>

      {/* Horizontal Cards */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '30px',
          justifyContent: 'center',
        }}
      >
        {[
          { title: 'Total Villages', value: '150' },
          { title: 'Urban Areas', value: '35' },
          { title: 'Population Size', value: '1.2M' },
          { title: 'Avg. Land Area', value: '120 sq.km' },
        ].map((card, index) => (
          <div
            key={index}
            style={{
              flex: '1 1 20%',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#3498db',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <h3 style={{ fontSize: '18px', margin: '0 0 10px', fontWeight: 'bold' }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '16px', margin: '0' }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
          <canvas id="agePieChart"></canvas>
        </div>
        <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '300px' }}>
          <canvas id="genderPieChart"></canvas>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <canvas id="histogramChart"></canvas>
      </div>
    </div>
  );
};

export default OverviewPage;
