import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_ADMINS = gql`
  query GetAdmins {
    admins {
      id
      name
      image
    }
  }
`;

function AdminList({ setActiveChat }) {
  const { loading, error, data } = useQuery(GET_ADMINS);

  if (loading) return <p className="text-white text-center py-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-4">Error: {error.message}</p>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Available Admins</h2>
      <div className="grid grid-cols-3 gap-4">
        {data.admins.map((admin) => (
          <div
            key={admin.id}
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