import React from 'react';

function Search({ setSearchText }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Admins"
        className="w-full p-2 rounded-md bg-gray-700 text-white"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default Search;