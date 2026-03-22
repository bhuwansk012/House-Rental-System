import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineMail, HiOutlineBadgeCheck, HiOutlineUser } from "react-icons/hi";

const AdminProfile = () => {
  const navigate = useNavigate();
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session data
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 font-medium">
        Please log in to access this page.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-slate-100 via-blue-50 to-slate-100 flex justify-center items-center p-6">
      <div className="bg-white/80 backdrop-blur-md border border-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] rounded-[2.5rem] p-8 md:p-12 w-full max-w-2xl transition-all hover:shadow-2xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white rounded-full p-2">
              <RxAvatar size={120} className="text-blue-500" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-800 tracking-tight">{name}</h2>
          <span className="mt-2 px-4 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full uppercase tracking-wider">
            {role}
          </span>
        </div>

        {/* Info Grid */}
        <div className="space-y-4">
          <InfoCard icon={<HiOutlineUser />} label="Full Name" value={name} />
          <InfoCard icon={<HiOutlineMail />} label="Email Address" value={email} />
          <InfoCard icon={<HiOutlineBadgeCheck />} label="Account Type" value={role} />
        </div>

        {/* Action Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLogout}
            className="group relative w-full md:w-auto px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl overflow-hidden transition-all hover:bg-red-600 active:scale-95"
          >
            <span className="relative z-10">Logout Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-component for clean code
const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
    <div className="p-3 bg-white shadow-sm rounded-xl text-blue-500 mr-4">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-gray-700 font-medium">{value || "Not Provided"}</p>
    </div>
  </div>
);

export default AdminProfile;
