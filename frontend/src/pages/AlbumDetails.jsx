import React, { useEffect, useState } from 'react';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { Link, useParams } from "react-router-dom";
import api from "../routes/api";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import history from "../history/Index.js";


const Player = ({ src, track }) => {
    const [currentTime, setCurrentTime] = useState(0);

    return (
        <AudioPlayer
            autoPlay={false}
            src={src}
            onPlay={e => {
                const currentAudio = e.target;
                if (window.previousAudio && window.previousAudio !== currentAudio) {
                    window.previousAudio.pause();
                }
                currentAudio.play();
                currentAudio.currentTime = currentTime;
                window.previousAudio = currentAudio;
                const currentTrack = {
                    ...track,
                    url: window.location.href,
                }
                history.addHistory(currentTrack);
                history.save();
            }}
            onPause={e => {
                setCurrentTime(e.target.currentTime);
            }}
        />
    );
};

export default function AlbumDetails() {
    const [album, setAlbum] = React.useState({});
    const [artist, setArtist] = React.useState({});
    const { id } = useParams();

    const queryClient = new QueryClient();

    const fetchAlbum = async () => {
        const data = await api.getOneAlbumById(id);
        setAlbum(data);
        return data;
    };

    const { status, data, error } = useQuery({
        queryKey: ['album', id],
        queryFn: fetchAlbum,
    }, queryClient);

    const getArtistData = async () => {
        const datum = await api.getOneArtistById(album?.album?.artist_id);
        setArtist(datum);
        return datum;
    }

    const { status: artistStatus } = useQuery({
        queryKey: ['artist', album?.album?.artist_id],
        queryFn: getArtistData,
    }, queryClient);

    React.useEffect(() => {
        (async () => {
            if (data?.album?.artist_id) {
                await getArtistData();
                console.log(artist);
            };
        })();
    }, [data?.album?.artist_id !== null]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'error') return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto px-4">
            <h1 className='font-bold text-4xl my-5 text-center text-[#ffffff]'>Album Details</h1>
            <div className="flex flex-col items-center">
                <h2 className='font-bold text-3xl mt-3 text-[#ffffff]'>{data?.album.name}</h2>
                <img src={data?.album.cover} className={"rounded-full h-64 w-64 object-cover my-5"} alt={data?.album.name} />
                <p className={'mt-2 text-lg text-[#ffffff]'}>{data?.album.description}</p>
                <p className={'mt-2 text-lg text-[#ffffff]'}>{data?.album.releaseDate}</p>
            </div>
            {artist ? <Link to={`/get-one/artist/${artist?.id}`} className="mt-10 flex flex-col items-center text-blue-500 hover:underline">
                <h2 className='font-bold text-3xl mt-3 text-[#ffffff]'>Artist Name: {artist?.name}</h2>
                <img src={artist?.photo} className={"rounded-full h-48 w-48 object-cover my-5"} alt={artist?.name} />
            </Link> : null}
            <div>
                <h1 className='font-bold text-3xl my-5 text-center text-[#ffffff]'>Tracks List</h1>
                <div>
                    {data?.tracks.map(track => {
                        return <div className={'my-3'} key={track.id}>
                            <h2 className='font-bold text-2xl mt-3 text-[#ffffff]'>{track.name}</h2>
                            <Player src={track.mp3} track={track} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}