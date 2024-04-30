import React from 'react';
import {QueryClient, useQuery} from '@tanstack/react-query';
import {useParams} from "react-router-dom";
import api from "../routes/api";

export default function AlbumsFromArtist() {
    const { id } = useParams();

    const queryClient = new QueryClient();

    const fetchAlbums = async () => {
        return await api.getAlbumByArtistId(id);
    };

    const {status, data, error} = useQuery({
        queryKey: ['albums', id],
        queryFn: fetchAlbums,
    }, queryClient);

    if(status === 'loading') return <p>Loading...</p>;
    if(status === 'error') return <p>Error: {error.message}</p>;

    return <div>
        <h1 className='font-bold'>Albums from Artist</h1>
        {data?.map(album => (
            <div key={album.id}>
                <h2 className='font-bold text-2xl mt-3'>{album.name}</h2>
                <img src={album.cover} className={"rounded"} alt={album.name} />
                <p className={'mt-2'}>{album.description}</p>
            </div>
        ))}
    </div>;
}