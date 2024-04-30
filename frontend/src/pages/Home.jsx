import React from 'react';
import api from "../routes/api";
import {useQuery, QueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";

export default function Home() {
    const [albums, setAlbums] = React.useState([]);
    const queryClient = new QueryClient();

    const fetchAlbums = async () => {
        const randomNumberOfPage = Math.floor(Math.random() * 10) + 1;
        const albums = await api.getAllAlbums(randomNumberOfPage, 12);
        setAlbums(albums);
        return albums;
    };

    const {status, isLoading} = useQuery({
        queryKey: ['albums'],
        queryFn: fetchAlbums,
    }, queryClient);

    if(isLoading) return (
        <div>
            <h1 className='font-bold'>Home</h1>
            <p>Loading...</p>
        </div>
    );

    if(status === 'success') {
        return (
            <div>
                <div className='container w-full mx-auto'>
                <div>
                    <h1 className="text-3xl font-bold mt-5 mb-5 text-center">Welcome to my spotify</h1>
                </div>
                <div className='container flex justify-center mx-auto w-full min-w-full max-w-full'>
                    <div className='grid grid-cols-4 gap-5 mx-auto w-full min-w-full max-w-full relative'>
                        {albums.map(album => {
                            return <Link to={`/get-one/album/${album.id}`} key={album.id}>
                                <div>
                                    <img src={album.cover} className='rounded' alt={album.name} />
                                </div>
                                <div>
                                    <h2 className='font-bold text-sm text-center my-2'>{album.name}</h2>
                                </div>
                            </Link>
                        })}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1 className='font-bold'>Home</h1>
                <p>Welcome to the Home page!</p>
            </div>
        );
    }
}