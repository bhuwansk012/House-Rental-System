import React from "react";
import { RxAvatar, RxChevronRight } from "react-icons/rx";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const name = sessionStorage.getItem("name") || "Admin";
  const role = sessionStorage.getItem("role") || "Super Admin";

  return (
    <header className="sticky top-0 z-40 w-full h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6">

      {/* --- LEFT --- */}
      <div className="flex flex-col justify-center">
        <h1 className="text-lg md:text-xl font-extrabold text-slate-900 leading-tight">
          Admin <span className="text-blue-600">Central</span>
        </h1>

        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.2em] mt-0.5">
          System Operational
        </p>
      </div>

      {/* --- RIGHT --- */}
      <div className="flex items-center gap-4">

        {/* User Info */}
        <div className="hidden md:flex flex-col items-end leading-tight">
          <p className="text-sm font-semibold text-slate-800">
            {name}
          </p>
          <p className="text-[11px] font-medium text-blue-600 uppercase tracking-wider">
            {role}
          </p>
        </div>

        {/* Profile Button */}
        <Link
          to="/admin/profile"
          className="group flex items-center gap-3 px-3 py-2 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
        >
          {/* Avatar */}
          <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition">
            <RxAvatar size={22} />
          </div>

          {/* Text */}
          <span className="hidden sm:block text-sm font-semibold">
            Profile
          </span>

          {/* Arrow */}
          <RxChevronRight
            size={16}
            className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition"
          />
        </Link>
      </div>

    </header>
  );
};

export default AdminNavbar;