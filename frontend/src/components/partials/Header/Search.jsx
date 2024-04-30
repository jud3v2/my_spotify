import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('artist'); // Par défaut, on recherche un artiste

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = event => {
        setSearchType(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSearch(searchTerm, searchType);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
            <div className="relative rounded-full bg-[#1A2238] border-[#FF6A3D] border px-4 py-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:text-white focus:bg-transparent bg-transparent text-white"
                />
            </div>
        </form>
    );
}