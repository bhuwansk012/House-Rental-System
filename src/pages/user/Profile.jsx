import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiMapPin, FiLogOut, FiHeart, FiSettings } from "react-icons/fi";
import { logout } from "../../service/authService";

const Profile = () => {
  const navigate = useNavigate();

  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // Guard UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center p-8 sm:p-10 bg-white rounded-3xl shadow-xl border border-slate-100">
          <p className="text-slate-400 font-semibold mb-5">
            Your session has expired
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-8 py-3 rounded-2xl font-bold shadow-md"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden"
      >
        {/* BANNER */}
        <div className="h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
            <div className="w-32 h-32 bg-white rounded-[2.2rem] p-1.5 shadow-xl">
              <div className="w-full h-full bg-slate-50 rounded-[1.8rem] flex items-center justify-center text-indigo-400">
                <FiUser size={48} />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-20 pb-10 px-6 sm:px-10 md:px-12">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                {name}
              </h2>
              <p className="text-slate-400 font-semibold flex items-center justify-center md:justify-start gap-2 mt-1">
                <FiMapPin className="text-indigo-400" />
                Active Tenant
              </p>
            </div>

            {/* ACTION ICONS */}
            <div className="flex justify-center gap-3">
              <button className="p-3 sm:p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500 hover:bg-rose-50 transition border border-slate-100">
                <FiHeart size={18} />
              </button>
              <button className="p-3 sm:p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 hover:bg-indigo-50 transition border border-slate-100">
                <FiSettings size={18} />
              </button>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="p-5 sm:p-6 bg-slate-50/60 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-lg transition group">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">
                <FiMail size={18} />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">
                Email Address
              </p>
              <p className="text-slate-700 font-bold break-all">{email}</p>
            </div>

            <div className="p-5 sm:p-6 bg-slate-50/60 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-lg transition group">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-500 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
                <FiUser size={18} />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">
                Role Type
              </p>
              <p className="text-slate-700 font-bold capitalize">
                {role ? role.toLowerCase() : "user"}
              </p>
            </div>
          </div>

          {/* LOGOUT */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 bg-rose-50/60 rounded-3xl border border-rose-100">
            <div>
              <p className="text-rose-900 font-black text-sm">Sign Out</p>
              <p className="text-rose-600/70 text-xs font-medium">
                Ready to leave the portal?
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold transition shadow-md active:scale-95"
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