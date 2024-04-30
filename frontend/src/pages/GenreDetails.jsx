import React, {useState} from 'react';
import api from '../routes/api';
import {Link, useParams} from 'react-router-dom';
import {useQuery, QueryClient} from '@tanstack/react-query';

export default function GenreDetails() {
    const {id} = useParams();
    const [genre, setGenre] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [isAlbumLoading, setIsAlbumLoading] = useState(false);

    const getDetailsOfGenre = async () => {
        const data = await api.getOneGenreById(id);
        setGenre(data);

        setIsAlbumLoading(true);
        const albums = await Promise.all(data.albums.map(album => getOneAlbum(album)));
        setAlbums(albums);
        setIsAlbumLoading(false);
        return data;
    }

    const getOneAlbum = async (id) => {
        const data = await api.getOneAlbumById(id);
        setAlbums({
            ...albums,
            data
        });
        return data;
    }

    const {error, isLoading} = useQuery({
        queryKey: ['genre', id],
        queryFn: getDetailsOfGenre,
    });

    if (isLoading) {
        return "Loading...";
    }

    if (error) {
        return "An error has occurred: " + error.message;
    }

    return (
        <div>
            <h1 className={'text-2xl font-bold mt-5'}>Genre: {genre?.genre.name}</h1>
            <h2 className={'text-xl font-bold mt-5'}>Albums:</h2>
            <div className='grid grid-cols-4 gap-5 mx-auto w-full min-w-full max-w-full relative'>
                {isAlbumLoading === false && albums?.length > 0 ? albums?.map(({album}) => {
                    return <Link to={`/get-one/album/${album?.id}`} key={album?.id}>
                        <div>
                            <img src={album?.cover} className='rounded' alt={album?.name}/>
                        </div>
                        <div>
                            <h2 className='font-bold text-sm text-center my-2'>{album?.name}</h2>
                        </div>
                    </Link>
                }) : "Loading..."}
            </div>
        </div>
    );
}