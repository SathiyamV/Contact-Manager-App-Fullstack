import React from 'react';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Type to search contacts..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
};

export default SearchBar;