import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { NavLink, Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

const UserNavbar = () => {

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition-all duration-300 text-gray-700 hover:text-orange-500 
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] 
     after:bg-orange-500 after:transition-all after:duration-300 ${isActive ? "text-orange-500 after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm max-w-380 mx-auto">
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-orange-500">
          House<span className="text-gray-800">Rent</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 font-medium">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/properties" className={navLinkClass}>Properties</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
        </ul>

        {/* Auth Button */}
        {isAuthenticated && user?.role === "TENANT" ?
          <div  className="hidden md:block">
          <Link to="/profile"
            className="flex items-center gap-2 px-5 py-2 rounded-full 
               bg-white border border-gray-300 
               text-blue-900 font-medium
               shadow-sm hover:shadow-md
               hover:bg-blue-900 hover:text-white
               transition-all duration-300"
          >
            {isAuthenticated?<RxAvatar size={22} />: <img src={user?.image} className="rounded-full w-12 h-12 items-center"/> }
            <span>{user?.name}</span>
            </Link>
          </div> : 
          <div className="hidden md:block">
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl font-medium border border-gray-300 text-blue-900 hover:bg-gray-500 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          </div>
        }
    </nav>
    </header >
  );
};

export default UserNavbar;
