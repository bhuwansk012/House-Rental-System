import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaAddressBook, FaUsers, FaUser } from "react-icons/fa";
import { BsHousesFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { IoLogOut, IoShieldCheckmark } from "react-icons/io5";
import { logout } from '../../service/authService';
import { toast } from 'react-toastify';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully!");
        navigate("/");
    };

    // Refined Link Styling
    const linkclass = ({ isActive }) =>
        `group relative flex items-center gap-3 px-6 py-3.5 transition-all duration-300 font-bold text-sm tracking-tight ${
            isActive
                ? 'text-white bg-indigo-600/10 border-r-4 border-indigo-500 rounded-l-xl'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-l-xl'
        }`;

    return (
        <aside className="w-64 bg-slate-950 border-r border-slate-900 h-screen flex flex-col pt-8 transition-all">
            
            {/* --- ADMIN BRANDING --- */}
            <div className="px-8 mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
                        <IoShieldCheckmark className="text-white text-xl" />
                    </div>
                    <h2 className="text-lg font-black text-white tracking-tighter">
                        Admin<span className="text-indigo-500">Core</span>
                    </h2>
                </div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] pl-1">
                    Management Suite
                </p>
            </div>

            {/* --- NAVIGATION --- */}
            <nav className="flex-grow pl-4 space-y-1">
                <p className="px-6 pb-2 text-[9px] font-black text-slate-600 uppercase tracking-widest">General</p>
                
                <NavLink to="/admin/dashboard" className={linkclass}>
                    <MdOutlineSpaceDashboard size={20} className="shrink-0" />
                    Dashboard
                </NavLink>

                <NavLink to="/admin/properties" className={linkclass}>
                    <BsHousesFill size={20} className="shrink-0" />
                    Properties
                </NavLink>

                <NavLink to="/admin/bookings" className={linkclass}>
                    <FaAddressBook size={20} className="shrink-0" />
                    Bookings
                </NavLink>

                <div className="pt-6 pb-2">
                    <p className="px-6 text-[9px] font-black text-slate-600 uppercase tracking-widest">Access Control</p>
                </div>

                <NavLink to="/admin/owners" className={linkclass}>
                    <GrUserAdmin size={20} className="shrink-0" />
                    Owners
                </NavLink>
                
                <NavLink to="/admin/users" className={linkclass}>
                    <FaUsers size={20} className="shrink-0" />
                    Users
                </NavLink>

                <NavLink to="/admin/profile" className={linkclass}>
                    <FaUser size={20} className="shrink-0" />
                    Admin Profile
                </NavLink>
            </nav>

            {/* --- BOTTOM SECTION --- */}
            <div className="p-6 border-t border-slate-900">
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-rose-400 bg-rose-400/5 hover:bg-rose-500 hover:text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 shadow-sm"
                    onClick={handleLogout}
                >
                    <IoLogOut size={18} />
                    Terminal Logout
                </motion.button>
            </div>
        </aside>
    );
}

export default AdminSidebar;