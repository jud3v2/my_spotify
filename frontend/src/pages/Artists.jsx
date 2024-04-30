import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, QueryClient } from "@tanstack/react-query";
import api from "../routes/api";

export default function Artist() {
        const [results, setResults] = useState([]);
        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);

        const resultsPerPage = 32;
        const pageButtonsToShow = 5;

        const queryClient = new QueryClient();

        const fetchArtist = async (pageNumber) => {
                const response = await api.search('', 'artist', pageNumber);
                const allResults = response.data.artists;
                const start = (pageNumber - 1) * resultsPerPage;
                const end = start + resultsPerPage;
                const resultsForCurrentPage = allResults.slice(start, end);
                setResults(resultsForCurrentPage);
                setTotalPages(Math.ceil(allResults.length / resultsPerPage));
        };

        const handlePageChange = (pageNumber) => {
                setPage(pageNumber);
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
                fetchArtist(page);
        }, [page]);

        const startPage = Math.max(1, page - Math.floor(pageButtonsToShow / 2));
        const endPage = Math.min(totalPages, startPage + pageButtonsToShow - 1);
        const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);


        return (
                <div className=" text-white min-h-screen">
                <h2 className="text-2xl font-bold mt-5 text-center">List of all artists</h2>
                        <div className="grid grid-cols-2 gap-4 px-4 pb-4">
                                {results?.length > 0 && results?.map((result, index) => (
                                        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg m-4">
                                                <Link to={`/get-one/artist/${result.id}`}>
                                                        <img src={result.photo} alt={result.name} className="w-full h-64 object-cover" />
                                                        <div className="px-6 py-4">
                                                                <div className="font-bold text-xl mb-2">{result.name}</div>
                                                        </div>
                                                </Link>
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
