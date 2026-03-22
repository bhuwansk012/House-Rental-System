import React, { useState, useEffect, useRef } from "react";
import { RxAvatar, RxChevronDown, RxExit, RxPerson } from "react-icons/rx";
import { HiMenuAlt2 } from "react-icons/hi";
import { toast } from "react-toastify";

const OwnerNavbar = ({ isOpen, toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const name = sessionStorage.getItem("name") || "Owner";
  const email = sessionStorage.getItem("email") || "admin@dashboard.com";

  // Close dropdown when clicking outside
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
      className={`fixed top-0 right-0 h-20 flex items-center justify-between px-8 z-40 transition-all duration-300 ease-in-out
      ${isOpen ? "left-64" : "left-20"} bg-white/80 backdrop-blur-md border-b border-slate-200/60`}
    >
      {/* LEFT SIDE: Brand & Toggle */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90"
        >
          <HiMenuAlt2 size={24} />
        </button>

        <div className="hidden md:block">
          <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Welcome back, {name.split(" ")[0]}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-2xl border transition-all duration-200
          ${showDropdown ? "bg-white border-blue-200 shadow-sm" : "bg-slate-50 border-transparent hover:bg-slate-100"}`}
        >
          <div className="relative">
            <RxAvatar size={36} className="text-blue-600 bg-blue-50 rounded-full p-0.5" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          
          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-slate-700 leading-none">{name}</p>
            <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-tight">Administrator</p>
          </div>
          
          <RxChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`} />
        </button>

        {/* UPGRADED DROPDOWN */}
        {showDropdown && (
          <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-2xl p-2 animate-in fade-in zoom-in duration-200">
            <div className="px-4 py-3 mb-2 bg-slate-50/50 rounded-xl">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
              <p className="text-sm font-medium text-slate-700 truncate">{email}</p>
            </div>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
              <RxPerson size={18} />
              View Profile
            </button>

            <div className="h-px bg-slate-100 my-2 mx-2" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
            >
              <RxExit size={18} className="group-hover:translate-x-1 transition-transform" />
              <span className="font-semibold">Log out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default OwnerNavbar;
