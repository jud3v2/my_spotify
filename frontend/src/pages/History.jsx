import React, { useEffect, useState } from 'react';
import history from '../history/Index';
import AudioPlayer from 'react-h5-audio-player';
import { Link } from 'react-router-dom';
import api from '../routes/api';

export default function History() {

    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const clearHistoryAndReload = () => {
        history.clearHistory();
        window.location.reload();
    };

    const [historyData, setHistoryData] = useState([]);

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

    useEffect(() => {
        const fetchAlbumCovers = async () => {
            const historyWithCovers = await Promise.all(history.getHistory().map(async item => {
                const album = await api.getOneAlbumById(item.album_id);
                return { ...item, coverImage: album.album.cover };
            }));
            setHistoryData(historyWithCovers);
        };

        fetchAlbumCovers();
    }, []);

    return (
        <div className="flex flex-col min-h-screen mt-20">
            {historyData.length > 0 ? (
                <div className="space-y-4">
                    <div className="flex justify-center items-center">
                        <h1 className="text-3xl font-bold">History</h1>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={clearHistoryAndReload} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Clear History
                        </button>
                    </div>
                    {historyData.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow-lg flex" style={{ borderColor: '#ff6a3d' }}>
                            <Link to={`/get-one/album/${item.album_id}`}>
                                <img src={item.coverImage} alt={item.name} className="w-64 h-64 object-cover mr-4 cursor-pointer" />
                            </Link>
                            <div className="flex flex-col flex-grow justify-between items-center">
                                <div className="flex flex-col items-center my-auto">
                                    <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                                    <div className="flex space-x-4">
                                        <p className="mb-1">Track No: {item.track_no} in album</p>
                                        <p className="mb-1">Duration: {formatDuration(item.duration)} (without ad)</p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Player src={item.mp3} track={item}>Your browser does not support the audio element.</Player>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col min-h-screen justify-center">
                    <div className="flex justify-center items-center">
                        <h1 className="text-3xl font-bold">History</h1>
                    </div>
                    <div className="flex flex-grow justify-center items-center transform -translate-y-20">
                        <h2 className="text-xl">History is empty</h2>
                    </div>
                </div>
            )}
        </div>
    );
}