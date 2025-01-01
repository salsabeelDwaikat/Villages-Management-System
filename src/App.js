import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Search from './Search';
import AdminList from './AdminList';
import Chat from './Chat';


function App() {
  const [activeAdmin, setActiveAdmin] = useState(null);
  const [searchText, setSearchText] = useState(''); 

  const admins = [
    { name: 'Salsabeel', image: '/images/admin1.jpg' },
    { name: 'Najwa', image: '/images/admin2.jpg' },
    { name: 'Alaa', image: '/images/admin3.jpg' }
  ];

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#1b1b2b] p-4">
        <header className="p-3 text-left">
          <h1 className="text-white text-2xl">Chat with Admins</h1>
        </header>

        {}
        <Search setSearchText={setSearchText} />

        {}
        <AdminList admins={filteredAdmins} setActiveChat={setActiveAdmin} />

        {}
        {activeAdmin && <Chat admin={activeAdmin} />}
      </div>
    </div>
  );
}

export default App;
