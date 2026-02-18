import React, { useState } from "react";
import {useSelector} from 'react-redux'
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";

const UserNavbar = () => {
  const [open, setOpen] = useState(false);
  const user=useSelector((state)=>state.auth.user);
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);


  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition-all duration-300 text-gray-700 hover:text-orange-500 
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] 
     after:bg-orange-500 after:transition-all after:duration-300 ${
       isActive ? "text-orange-500 after:w-full" : "after:w-0 hover:after:w-full"
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
        {!isAuthenticated && user?.role !== "USER" ?<div className="hidden md:block">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl font-medium border border-gray-300 text-blue-900 hover:bg-gray-500 hover:text-white transition-all duration-300"
          >
            Login
          </Link>
        </div>:
        <div className="hidden md:block">
  <Link
    to="/profile"
    className="flex items-center gap-2 px-5 py-2 rounded-full 
               bg-white border border-gray-300 
               text-blue-900 font-medium
               shadow-sm hover:shadow-md
               hover:bg-blue-900 hover:text-white
               transition-all duration-300"
  >
    <RxAvatar size={22} />
    <span>{user?.name}</span>
  </Link>
</div>

        }

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg border-t transition-all duration-300 ${
          open ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0 py-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 px-6 font-medium">
          <NavLink onClick={() => setOpen(false)} to="/">Home</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/properties">Properties</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/about">About</NavLink>
          <button
            onClick={() => {
              dispatch(openLogin());
              setOpen(false);
            }}
            className="mt-3 text-center px-4 py-2 rounded-lg bg-orange-500 text-white"
          >
            Login
          </button>
        </ul>
      </div>
    </header>
  );
};

export default UserNavbar;
