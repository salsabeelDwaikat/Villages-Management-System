import React from 'react';

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 w-1/5 bg-gray-800 text-white flex flex-col justify-between p-5 h-screen">
      {/* Top Section */}
      <div>
        <h2 className="text-2xl mb-5">Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <a href="/html/overview.html" className="hover:text-purple-400">Overview</a>
          </li>
          <li>
            <a href="/html/dashboard.html" className="hover:text-purple-400">Village Management</a>
          </li>
          <li>
            <a href="/html/Chat.html" className="hover:text-purple-400">Chat</a>
          </li>
          <li>
            <a href="/html/Gallary.html" className="hover:text-purple-400">Gallery</a>
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center gap-3">
        <img
          src="https://via.placeholder.com/40"
          alt="Admin"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-lg">Admin Name</span>
        <a
          href="/html/login.html"
          className="text-purple-400 ml-auto hover:underline"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
