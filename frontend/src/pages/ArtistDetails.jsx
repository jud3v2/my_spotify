// ArtistDetails.jsx
import React from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Link, useParams } from "react-router-dom";
import api from "../routes/api";
import 'react-h5-audio-player/lib/styles.css';

export default function ArtistDetails() {
    const [artist, setArtist] = React.useState({});
    const { id } = useParams();

    const queryClient = new QueryClient();

    const fetchArtist = async () => {
        const data = await api.getOneArtistById(id);
        setArtist(data);
        return data;
    };

    const fetchAlbums = async () => {
        return await api.getAlbumByArtistId(id);
    };

    const { status: artistStatus, data: artistData, error: artistError } = useQuery({
        queryKey: ['artist', id],
        queryFn: fetchArtist,
    }, queryClient);

    const { status: albumsStatus, data: albumsData, error: albumsError } = useQuery({
        queryKey: ['albums', id],
        queryFn: fetchAlbums,
    }, queryClient);

    if (artistStatus === 'loading' || albumsStatus === 'loading') return <p>Loading...</p>;
    if (artistStatus === 'error') return <p>Error: {artistError.message}</p>;
    if (albumsStatus === 'error') return <p>Error: {albumsError.message}</p>;

    return (
        <div className="container mx-auto px-4">
            <h1 className='font-bold text-4xl my-5 text-center text-[#ffffff]'>Artist Details</h1>
            <div className="flex flex-col items-center">
                <h2 className='font-bold text-3xl mt-3 text-[#ffffff]'>{artistData?.name}</h2>
                <img src={artistData?.photo} className={"rounded-full h-64 w-64 object-cover my-5"} alt={artistData?.name} />
                <p className={'mt-2 text-lg text-[#ffffff]'}>{artistData?.description}</p>
                <p className={'mt-2 text-lg text-[#ffffff]'}>{artistData?.bio}</p>

                <h2 className='font-bold text-3xl mt-10 text-[#ffffff]'>Albums</h2>
                {albumsData?.map(album => (
                    <div key={album.id} className="mt-10 flex flex-col items-center">
                        <Link to={`/get-one/album/${album.id}`} className="text-blue-500 hover:underline">
                            <h3 className='font-bold text-2xl mt-3 text-[#ffffff] group-hover:underline custom-underline'>{album.name}</h3>
                            <img src={album.cover} className={"rounded-full h-48 w-48 object-cover my-5 group-hover:underline custom-underline"} alt={album.name} />
                        </Link>
                        <p className={'mt-2 text-lg text-[#ffffff]'}>{album.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}