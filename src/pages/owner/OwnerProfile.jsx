import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../service/authService";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiShield,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";

const OwnerProfile = () => {
  const navigate = useNavigate();

  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow p-8 text-center"
      >
        <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
          <FiUser size={40} />
        </div>

        <h2 className="text-2xl font-bold mt-4">{name}</h2>

        <div className="mt-6 space-y-4 text-left">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <FiMail />
            <span>{email}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <FiShield />
            <span>{role}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("/owner/dashboard")}
            className="flex-1 bg-slate-900 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <FiSettings /> Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 border border-red-200 text-red-500 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OwnerProfile;