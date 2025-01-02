import React from 'react';

function Search({ setSearchText }) {
  const handleSearchChange = (event) => {
    setSearchText(event.target.value); 
  };
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Admins"
        className="w-full p-2 rounded-md"
        onChange={handleSearchChange} 
      />
    </div>
  );
}

export default Search;