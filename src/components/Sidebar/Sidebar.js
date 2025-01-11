import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
   
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser); 
      setUserName(user.username || 'Admin'); 
    }
  }, []);

  return (
    <div className="w-1/5 bg-gray-800 text-white flex flex-col justify-between p-5 h-screen">
      {/* Top Section */}
      <div>
        <h2 className="text-2xl mb-5">Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => navigate('/overview')}
              className="hover:text-purple-400"
            >
              Overview
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/VillageManagement')}
              className="hover:text-purple-400"
            >
              Village Management
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/Chat')}
              className="hover:text-purple-400"
            >
              Chat
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/Gallery')}
              className="hover:text-purple-400"
            >
              Gallery
            </button>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <img
          src="https://via.placeholder.com/40"
          alt="Admin"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-lg">{userName}</span>
        <button
          onClick={() => {
            localStorage.removeItem('token'); 
            localStorage.removeItem('user');
            navigate('/login');
          }}
          className="text-purple-400 ml-auto hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
