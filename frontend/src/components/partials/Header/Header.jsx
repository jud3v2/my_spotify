import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-[#1f2937] h-20 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div className="w-full md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border-b border-current rounded-b-lg bg-[#1f2937] text-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-b-0 md:rounded-b-none">
            <li className="md:my-0">
              <Link to="/">
                <p className="block py-2 px-3 hover:text-orange-500 transition-colors duration-300 ease-in-out">Home</p>
              </Link>
            </li>
            <li className="md:my-0">
              <Link to="/get-all/artists">
                <p className="block py-2 px-3 hover:text-orange-500 transition-colors duration-300 ease-in-out">All Artists</p>
              </Link>
            </li>
            <li className="md:my-0">
              <Link to="/get-all/albums">
                <p className="block py-2 px-3 hover:text-orange-500 transition-colors duration-300 ease-in-out">All Albums</p>
              </Link>
            </li>
            <li className="md:my-0">
              <Link to="/history">
                <p className="block py-2 px-3 hover:text-orange-500 transition-colors duration-300 ease-in-out">History</p>
              </Link>
            </li>
            <li className="md:my-0">
              <Link to="/search">
                <p className="block py-2 px-3 hover:text-orange-500 transition-colors duration-300 ease-in-out">Search</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}