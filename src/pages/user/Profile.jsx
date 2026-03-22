import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiMapPin, FiLogOut, FiHeart, FiSettings } from "react-icons/fi";
import { logout } from "../../service/authService";

const Profile = () => {
  const navigate = useNavigate();
  
  // Data from session
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
          <p className="text-slate-400 font-bold mb-4">Your session has expired</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center items-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.05)] border border-white overflow-hidden"
      >
        {/* --- PROFILE BANNER (User Style) --- */}
        <div className="h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
            <div className="w-32 h-32 bg-white rounded-[2.5rem] p-1.5 shadow-2xl">
              <div className="w-full h-full bg-slate-50 rounded-[2rem] flex items-center justify-center text-indigo-400">
                <FiUser size={50} />
              </div>
            </div>
          </div>
        </div>

        {/* --- PROFILE CONTENT --- */}
        <div className="pt-20 pb-12 px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">{name}</h2>
              <p className="text-slate-400 font-bold flex items-center justify-center md:justify-start gap-2 mt-1">
                <FiMapPin className="text-indigo-400" /> Active Tenant
              </p>
            </div>
            
            <div className="flex justify-center gap-3">
              <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500 hover:bg-rose-50 transition-all border border-slate-100">
                <FiHeart size={20} />
              </button>
              <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-100">
                <FiSettings size={20} />
              </button>
            </div>
          </div>

          {/* --- INFO GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <FiMail size={18} />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Email Address</p>
              <p className="text-slate-700 font-bold break-all">{email}</p>
            </div>

            <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-500 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <FiUser size={18} />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Role Type</p>
              <p className="text-slate-700 font-bold capitalize">{role.toLowerCase()}</p>
            </div>
          </div>

          {/* --- LOGOUT SECTION --- */}
          <div className="mt-12 flex items-center justify-between p-6 bg-rose-50/50 rounded-3xl border border-rose-100/50">
            <div>
              <p className="text-rose-900 font-black text-sm">Sign Out</p>
              <p className="text-rose-600/70 text-xs font-medium">Ready to leave the portal?</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-rose-200 active:scale-95"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;