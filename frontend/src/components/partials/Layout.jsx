import React from 'react';
import Header from './Header/Header';
import Footer from '../partials/Footer';
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {
        return (
                <div className='bg-[#1a2238]'>
                        <Header />
                        <div className={"flex justify-center bg-[#1a2238] text-white"}>
                                <div className={"w-2/4"}>
                                        <div>
                                                {children}
                                        </div>
                                </div>
                        </div>
                        <Footer />
                </div>
        );
}