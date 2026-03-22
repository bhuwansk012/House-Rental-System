import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaAddressBook, FaUsers, FaUser } from "react-icons/fa";
import { BsHousesFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { IoLogOut, IoShieldCheckmark } from "react-icons/io5";
import { logout } from "../../service/authService";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const linkclass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200
    ${
      isActive
        ? "bg-indigo-600 text-white shadow-sm"
        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
    }`;

  return (
    <aside className="w-64 h-screen bg-slate-950 border-r border-slate-900 flex flex-col">

      {/* --- BRAND --- */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-md">
            <IoShieldCheckmark className="text-white text-lg" />
          </div>

          <h2 className="text-lg font-bold text-white tracking-tight">
            Admin<span className="text-indigo-500">Core</span>
          </h2>
        </div>

        <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-[0.25em]">
          Management Suite
        </p>
      </div>

      {/* --- NAV --- */}
      <nav className="flex-1 px-3 space-y-1">

        {/* General */}
        <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          General
        </p>

        <NavLink to="/admin/dashboard" className={linkclass}>
          <MdOutlineSpaceDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/properties" className={linkclass}>
          <BsHousesFill size={18} />
          Properties
        </NavLink>

        <NavLink to="/admin/bookings" className={linkclass}>
          <FaAddressBook size={18} />
          Bookings
        </NavLink>

        {/* Access Control */}
        <p className="px-3 pt-6 pb-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Access Control
        </p>

        <NavLink to="/admin/owners" className={linkclass}>
          <GrUserAdmin size={18} />
          Owners
        </NavLink>

        <NavLink to="/admin/users" className={linkclass}>
          <FaUsers size={18} />
          Users
        </NavLink>

        <NavLink to="/admin/profile" className={linkclass}>
          <FaUser size={18} />
          Admin Profile
        </NavLink>

      </nav>

      {/* --- LOGOUT --- */}
      <div className="p-5 border-t border-slate-900">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full py-3 rounded-lg text-rose-400 bg-rose-500/5 hover:bg-rose-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-all"
        >
          <IoLogOut size={18} />
          Logout
        </motion.button>
      </div>

    </aside>
  );
};

export default AdminSidebar;