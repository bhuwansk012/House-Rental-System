import React, { useState, useEffect, useRef } from "react";
import { RxAvatar, RxChevronDown, RxExit, RxPerson } from "react-icons/rx";
import { HiMenuAlt2 } from "react-icons/hi";
import { toast } from "react-toastify";

const OwnerNavbar = ({ isOpen, toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const name = sessionStorage.getItem("name") || "Owner";
  const email = sessionStorage.getItem("email") || "admin@dashboard.com";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <nav
      className={`fixed top-0 right-0 h-20 flex items-center justify-between px-6 z-40 transition-all duration-300
      ${isOpen ? "left-64" : "left-20"} bg-white/80 backdrop-blur-xl border-b border-slate-200`}
    >
      {/* --- LEFT --- */}
      <div className="flex items-center gap-5">

        {/* Toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition active:scale-90"
        >
          <HiMenuAlt2 size={22} />
        </button>

        {/* Title */}
        <div className="hidden md:flex flex-col leading-tight">
          <h1 className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-[11px] text-slate-400">
            Welcome back, <span className="font-medium text-slate-600">{name.split(" ")[0]}</span>
          </p>
        </div>
      </div>

      {/* --- RIGHT --- */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-all
          ${
            showDropdown
              ? "bg-white border-blue-200 shadow-sm"
              : "bg-slate-100 border-transparent hover:bg-slate-200"
          }`}
        >
          {/* Avatar */}
          <div className="relative">
            <RxAvatar className="text-blue-600 bg-blue-50 rounded-full p-1" size={30} />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          {/* Info */}
          <div className="hidden sm:flex flex-col text-left leading-tight">
            <p className="text-sm font-medium text-slate-700">{name}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">
              Owner
            </p>
          </div>

          {/* Arrow */}
          <RxChevronDown
            size={16}
            className={`text-slate-400 transition-transform ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* --- DROPDOWN --- */}
        {showDropdown && (
          <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 shadow-xl rounded-xl p-2 animate-in fade-in zoom-in duration-200">

            {/* User Info */}
            <div className="px-4 py-3 rounded-lg bg-slate-50 mb-2">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                Signed in as
              </p>
              <p className="text-sm font-medium text-slate-700 truncate">
                {email}
              </p>
            </div>

            {/* Profile */}
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">
              <RxPerson size={18} />
              Profile
            </button>

            <div className="h-px bg-slate-100 my-2" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition group"
            >
              <RxExit size={18} className="group-hover:translate-x-1 transition" />
              <span className="font-medium">Logout</span>
            </button>

          </div>
        )}
      </div>
    </nav>
  );
};

export default OwnerNavbar;