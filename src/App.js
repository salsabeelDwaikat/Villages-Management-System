import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import AdminList from './components/AdminList';
import Chat from './components/Chat';
import Gallery from './components/Gallery';

function App() {
  const [activeAdmin, setActiveAdmin] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showGallery, setShowGallery] = useState(false);

  return (
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
  );
}

export default App;