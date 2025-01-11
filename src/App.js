import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Search from './components/Chat/Search';
import AdminList from './components/Chat/AdminList';
import Chat from './components/Chat/Chat';
import Gallery from './components/Gallary/Gallary';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Overview from './pages/Overview';
import VillageManagement from './components/VillageManagement/VillageManagement';
import ProtectedRoute from './auth/ProtectedRoute'; 

function App() {
  const [activeAdmin, setActiveAdmin] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showGallery, setShowGallery] = useState(false);

  return (
    <Router>
      <Routes>
        {/* روتات عامة */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignUp />} />

        {/* روتات محمية */}
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/VillageManagement"
          element={
            <ProtectedRoute>
              <VillageManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-900 text-white">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-4">
                  <header className="p-3 text-left">
                    <h1 className="text-2xl font-bold">
                      {showGallery ? 'Image Gallery' : 'Chat with Admins'}
                    </h1>
                  </header>

                  {showGallery ? (
                    <Gallery />
                  ) : (
                    <>
                      <Search setSearchText={setSearchText} />
                      <AdminList setActiveChat={setActiveAdmin} />
                      {activeAdmin && <Chat admin={activeAdmin} />}
                    </>
                  )}
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
