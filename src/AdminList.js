import React from 'react';
function AdminList({ admins, setActiveChat }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Available Admins</h2>
      <div className="grid grid-cols-3 gap-4">
        {admins.map((admin) => (
          <div
            key={admin.name}
            className="text-center cursor-pointer"
            onClick={() => setActiveChat(admin)}
          >
            <img
              src={admin.image}
              alt={admin.name}
              className="w-16 h-16 rounded-full mx-auto"
            />
            <p className="mt-2 text-white">{admin.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminList;
