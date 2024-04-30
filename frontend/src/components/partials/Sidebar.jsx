import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
        return (
                <div className={"container"}>
                        <ul>
                                <li className={"bg-slate-300 text-center px-5 py-4 m-2 rounded"}>
                                        <Link to={'/'} className={"font-extrabold text-2xl"}>Home</Link>
                                </li>
                                <li className={"bg-slate-300 text-center px-5 py-4 m-2 rounded"}>
                                        <Link to={'/get-all/artists'} className={"font-extrabold text-2xl"}>All Artists</Link>
                                </li>
                                <li className={"bg-slate-300 text-center px-5 py-4 m-2 rounded"}>
                                        <Link to={'/get-all/albums'} className={"font-extrabold text-2xl"}>All Albums</Link>
                                </li>
                                <li className={"bg-slate-300 text-center px-5 py-4 m-2 rounded"}>
                                        <Link to={'/history'} className={"font-extrabold text-2xl"}>History</Link>
                                </li>
                                <li className={"bg-slate-300 text-center px-5 py-4 m-2 rounded"}>
                                        <Link to={'/search'} className={"font-extrabold text-2xl"}>Search</Link>
                                </li>
                        </ul>
                </div>
        );
}