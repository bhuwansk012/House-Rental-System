import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiCheckCircle, FiPieChart, FiPlus, FiArrowRight, FiUsers, FiClock } from "react-icons/fi";
import Modal from "../../modal/public/Modal";
import AddProperty from "../../modal/formmodal/AddProperty";
import { getDashboardStats } from "../../service/ownerService";
import { getAllOwnerBookings } from "../../service/bookService";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDashboardStatsData = async () => {
    try {
      const response = await getDashboardStats();
      setData(response);
    } catch (error) {
      console.error("Stats fetch error:", error);
    }
  };

  const getRecentBookingData = async () => {
    try {
      const response = await getAllOwnerBookings();
      const updated = response.data.map((booking) => ({
        ...booking,
        imageUrl: booking.property?.imageUrl
          ? `http://localhost:8080/uploads/properties/${booking.property.imageUrl}`
          : null,
      }));
      setRecentBookings(updated || []);
    } catch (error) {
      console.error("Booking fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardStatsData();
    getRecentBookingData();
  }, []);

  const summary = [
    {
      title: "Total Properties",
      value: data?.totalProperty || 0,
      icon: <FiHome size={24} />,
      gradient: "from-blue-600 to-indigo-700",
      shadow: "shadow-blue-200",
    },
    {
      title: "Active Bookings",
      value: data?.totalBooking || 0,
      icon: <FiCheckCircle size={24} />,
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-200",
    },
    {
      title: "Available Now",
      value: data?.totalAvailable || 0,
      icon: <FiPieChart size={24} />,
      gradient: "from-violet-500 to-purple-600",
      shadow: "shadow-purple-200",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 font-sans">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Owner <span className="text-indigo-600">Console</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Real-time overview of your property portfolio.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95"
          >
            <FiPlus /> List Property
          </button>
          <button
            onClick={() => navigate("/owner/my-property")}
            className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3.5 rounded-2xl font-bold hover:bg-slate-50 transition-all"
          >
            Manage <FiArrowRight />
          </button>
        </div>
      </div>

      {/* --- SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {summary.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className={`relative overflow-hidden p-8 rounded-[2.5rem] bg-gradient-to-br ${item.gradient} text-white shadow-2xl ${item.shadow}`}
          >
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-xs font-black uppercase tracking-[0.2em] mb-2">{item.title}</p>
                <h2 className="text-5xl font-black tracking-tighter">{item.value}</h2>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                {item.icon}
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </motion.div>
        ))}
      </div>

      {/* --- RECENT ACTIVITY TABLE --- */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <FiClock size={20} />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Recent Inquiries</h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
            Top 5 Logs
          </span>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 text-center text-slate-400 font-bold animate-pulse">Loading activity...</div>
          ) : recentBookings.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Property Listing</th>
                  <th className="px-8 py-5">Tenant Info</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentBookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                          {booking.imageUrl ? (
                            <img src={booking.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full"><FiHome size={14} /></div>
                          )}
                        </div>
                        <span className="font-bold text-slate-700 text-sm group-hover:text-indigo-600 transition-colors">
                          {booking.property?.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black">
                          {booking.tenant?.fullName?.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-600">{booking.tenant?.fullName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        booking.status === "BOOKED" || booking.status === "ACCEPTED" 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                          : booking.status === "PENDING"
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : "bg-rose-50 text-rose-600 border-rose-100"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <button 
                        onClick={() => navigate("/owner/bookings")}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <FiExternalLink size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-20 text-center">
              <FiUsers size={40} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-500 font-medium">No activity yet. Your property inquiries will appear here.</p>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddProperty onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};

// Internal utility for icon consistency
const FiExternalLink = ({ size }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export default OwnerDashboard;