import React from "react";
import { RxAvatar, RxChevronRight } from "react-icons/rx";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const name = sessionStorage.getItem("name") || "Admin";
  const role = sessionStorage.getItem("role") || "Super Admin";

  return (
    <header className="sticky top-0 z-40 w-full h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60  flex items-center justify-between transition-all">
      
      {/* Left Side: Branding */}
      <div className="flex flex-col">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
          Admin <span className="text-blue-600">Central</span>
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
            System Operational
          </p>
        </div>
      </div>

      {/* Right Side: Profile Link */}
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right mr-2">
          <p className="text-sm font-bold text-slate-800 leading-none mb-1">{name}</p>
          <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">{role}</p>
        </div>

        <Link
          to="/admin/profile"
          className="group flex items-center gap-3 pl-2 pr-4 py-1.5 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 active:scale-95"
        >
          <div className="bg-white/10 p-1 rounded-xl group-hover:bg-white/20 transition-colors">
            <RxAvatar size={28} className="text-white" />
          </div>
          
          <span className="text-sm font-bold tracking-wide">View Profile</span>
          
          <RxChevronRight 
            size={18} 
            className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" 
          />
        </Link>
      </div>
    </header>
  );
};

export default AdminNavbar;
