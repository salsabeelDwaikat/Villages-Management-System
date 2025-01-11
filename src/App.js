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

function App() {
  const [activeAdmin, setActiveAdmin] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showGallery, setShowGallery] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/VillageManagement" element={<VillageManagement />} />
        <Route path="/src/components/Gallary" element={<Gallery/>}/>
        <Route path="/src/components/Chat" element={<Chat/>}/>
        <Route path="/src/components/Chat" element={<AdminList/>}/>
        <Route path="/src/components/Chat" element={<Search/>}/>
        
        <Route
          path="/chat"
          element={
            <div className="flex min-h-screen bg-gray-900 text-white">
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <div className="flex-1 p-4">
                <header className="p-3 text-left">
                  <h1 className="text-2xl font-bold">
                    {showGallery ? 'Image Gallery' : 'Chat with Admins'}
                  </h1>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
                    onClick={() => setShowGallery(!showGallery)}
                  >
                    {showGallery ? 'Go to Chat' : 'Go to Gallery'}
                  </button>
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
          }
        />
      </Routes>
    </Router>
  );
}

export default App;