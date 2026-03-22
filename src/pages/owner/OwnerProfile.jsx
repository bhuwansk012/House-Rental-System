import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../service/authService";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiShield, FiLogOut, FiSettings, FiCamera } from "react-icons/fi";

const OwnerProfile = () => {
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

  // Guard Clause for Authentication
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center items-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white overflow-hidden"
      >
        {/* --- PROFILE HEADER (Banner Style) --- */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="relative group">
              <div className="w-32 h-32 bg-white rounded-3xl p-1 shadow-xl">
                <div className="w-full h-full bg-slate-100 rounded-[1.4rem] flex items-center justify-center text-blue-500">
                  <FiUser size={60} />
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                <FiCamera size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* --- PROFILE CONTENT --- */}
        <div className="pt-20 pb-10 px-8 md:px-12 text-center">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">{name}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
              Verified {role}
            </span>
          </div>

          <div className="mt-10 grid gap-4 text-left">
            {/* Info Card: Email */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-blue-600 transition-colors">
                <FiMail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</p>
                <p className="text-slate-700 font-bold">{email}</p>
              </div>
            </div>

            {/* Info Card: Role */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-indigo-600 transition-colors">
                <FiShield size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Account Type</p>
                <p className="text-slate-700 font-bold">{role}</p>
              </div>
            </div>
          </div>

          {/* --- ACTION BUTTONS --- */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/owner/dashboard")}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
            >
              <FiSettings /> Account Settings
            </button>
            
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-rose-500 border border-rose-100 py-4 rounded-2xl font-bold hover:bg-rose-50 transition-all active:scale-95"
            >
              <FiLogOut /> Logout
            </button>
          </div>

          <p className="mt-8 text-slate-400 text-xs font-medium italic">
            Joined as {role} • Member ID: {Math.floor(1000 + Math.random() * 9000)}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OwnerProfile;