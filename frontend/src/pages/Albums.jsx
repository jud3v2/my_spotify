import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, QueryClient } from "@tanstack/react-query";
import api from "../routes/api";

export default function Albums() {
        const [albums, setAlbums] = useState([]);
        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);

        const resultsPerPage = 32;
        const pageButtonsToShow = 5;

        const maxAlbumsNumber = 1625;

        const queryClient = new QueryClient();

        const fetchAlbums = async () => {
                const data = await api.getAllAlbums(page, resultsPerPage);
                setAlbums(data);
                return data;
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
                fetchAlbums();
        }, [page]);

        useEffect(() => {
                const totalPages = Math.ceil(maxAlbumsNumber / resultsPerPage);
                setTotalPages(totalPages);
        }, []);

        const startPage = Math.max(1, page - Math.floor(pageButtonsToShow / 2));
        const endPage = Math.min(totalPages, startPage + pageButtonsToShow - 1);
        const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

        return (
                <div className="text-white min-h-screen">
                        <h2 className="text-2xl font-bold mt-5 text-center">List of all albums</h2>
                        <div className="grid grid-cols-4 gap-5 mx-auto mt-5 w-full min-w-full max-w-full relative">
                                {albums?.map(album => {
                                        return <Link to={`/get-one/album/${album.id}`} key={album.id}>
                                                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg m-4">
                                                        <img src={album.cover} className="w-full rounded-t" alt={album.name} />
                                                        <div className="p-4">
                                                                <h2 className="font-bold text-lg text-center">{album.name}</h2>
                                                        </div>
                                                </div>
                                        </Link>
                                })}
                                <div className="flex justify-center items-center w-full mx-auto mt-5">
                                        <div className="flex justify-between w-1/2">
                                                <button
                                                        className={`px-8 py-3 m-2 rounded focus:outline-none focus:ring transition-colors duration-300 ease-in-out ${page === 1 ? 'text-[#FF6A3D]' : 'text-white'
                                                                } font-medium text-sm bg-[#1A2238] border border-current hover:text-orange-500`}
                                                        onClick={() => handlePreviousPage()}
                                                        disabled={page === 1}
                                                >
                                                        Précédent
                                                </button>
                                                {pageNumbers.map((pageNumber) => (
                                                        <button
                                                                key={pageNumber}
                                                                onClick={() => handlePageChange(pageNumber)}
                                                                className={`px-8 py-3 m-2 rounded focus:outline-none focus:ring transition-colors duration-300 ease-in-out ${page === pageNumber ? 'text-[#FF6A3D]' : 'text-white'
                                                                        } font-medium text-sm bg-[#1A2238] border border-current hover:text-orange-500`}
                                                        >
                                                                {pageNumber}
                                                        </button>
                                                ))}
                                                <button
                                                        className={`px-8 py-3 m-2 rounded focus:outline-none focus:ring transition-colors duration-300 ease-in-out ${page === totalPages ? 'text-[#FF6A3D]' : 'text-white'
                                                                } font-medium text-sm bg-[#1A2238] border border-current hover:text-orange-500`}
                                                        onClick={() => handleNextPage()}
                                                        disabled={page === totalPages}
                                                >
                                                        Suivant
                                                </button>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
