import React, { useEffect } from 'react';
import SearchBar from '../components/partials/Header/Search';
import Header from '../components/partials/Header/Header';
import api from '../routes/api';
import { Link } from "react-router-dom";

export default function Search() {
    const [results, setResults] = React.useState([]);
    const [searchType, setSearchType] = React.useState('artist');
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const resultsPerPage = 14;
    const pageButtonsToShow = 5;

    const handleSearch = async (searchTerm) => {
        const response = await api.search(searchTerm, searchType, page);
        let allResults = [];
        if (searchType === 'artist' && response.data.artists.length > 0) {
            allResults = response.data.artists;
        } else if (searchType === 'genre' && response.data.genres.length > 0) {
            allResults = response.data.genres;
        } else if (searchType === 'album' && response.data.albums.length > 0) {
            allResults = response.data.albums;
        }
        const start = (page - 1) * resultsPerPage;
        const end = start + resultsPerPage;
        const resultsForCurrentPage = allResults.slice(start, end);
        setResults(resultsForCurrentPage);
        setTotalPages(Math.ceil(allResults.length / resultsPerPage));
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    useEffect(() => {
        handleSearch('');
    }, [searchType, page]);

    const startPage = Math.max(1, page - Math.floor(pageButtonsToShow / 2));
    const endPage = Math.min(totalPages, startPage + pageButtonsToShow - 1);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);


    return (
        <div className=" text-white min-h-screen">
            <div className="flex flex-col justify-center items-center my-4">
                <div>
                    <SearchBar onSearch={handleSearch} className="bg-gray-800 rounded-full px-4 py-2 w-full max-w-sm border-[#FF6A3D]" />
                </div>
                <div>
                    <select onChange={handleSearchTypeChange} className="bg-gray-800 text-white rounded-full px-4 py-2 w-30 appearance-none mt-2">
                        <option value="artist">Artist</option>
                        <option value="genre">Gender</option>
                        <option value="album">Album</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 px-4 pb-4">
                {results?.length > 0 && results?.map((result, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg m-4">
                        {searchType !== 'genre' && <img src={searchType === 'artist' ? result.photo : result.cover} alt={result.name} className="w-full h-64 object-cover" />}
                        {searchType === 'genre' ? (
                            <Link to={`/get-one/genre/${result.id}`} className="px-6 py-4">
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{result.name}</div>
                                </div>
                            </Link>
                        ) : searchType === "album" ? (
                            <Link to={`/get-one/album/${result.id}`}>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{result.name}</div>
                                </div>
                            </Link>
                        ) : (
                            <Link to={`/get-one/artist/${result.id}`}>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{result.name}</div>
                                </div>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handlePreviousPage}
                    className={`mt-5 px-8 py-3 m-2 rounded focus:outline-none focus:ring transition-colors duration-300 ease-in-out ${page === 1 ? 'text-[#FF6A3D]' : 'text-white'
                        } font-medium text-sm bg-[#1A2238] border border-current hover:text-orange-500`}
                    disabled={page === 1}
                >
                    Précédent
                </button>
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`mt-5 px-8 py-3 m-2 rounded focus:outline-none focus:ring transition-colors duration-300 ease-in-out ${page === pageNumber ? 'text-[#FF6A3D]' : 'text-white'
                            } font-medium text-sm bg-[#1A2238] border border-current hover:text-orange-500`}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    className={`mt-5 px-8 py-3 m-2 rounded focus:outline-none focus:ring transition-colors duration-300 ease-in-out ${page === totalPages ? 'text-[#FF6A3D]' : 'text-white'
                        } font-medium text-sm bg-[#1A2238] border border-current hover:text-orange-500`}
                    disabled={page === totalPages}
                >
                    Suivant
                </button>
            </div>

        </div>
    );
}