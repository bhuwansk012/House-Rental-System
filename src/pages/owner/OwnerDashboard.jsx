import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiCheckCircle,
  FiPieChart,
  FiPlus,
  FiArrowRight,
  FiUsers,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";
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
      console.error(error);
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
      console.error(error);
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
      icon: <FiHome size={22} />,
      gradient: "from-blue-600 to-indigo-700",
    },
    {
      title: "Active Bookings",
      value: data?.totalBooking || 0,
      icon: <FiCheckCircle size={22} />,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Available Now",
      value: data?.totalAvailable || 0,
      icon: <FiPieChart size={22} />,
      gradient: "from-violet-500 to-purple-600",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "BOOKED" || status === "ACCEPTED") {
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    }
    if (status === "PENDING") {
      return "bg-amber-50 text-amber-600 border-amber-100";
    }
    return "bg-rose-50 text-rose-600 border-rose-100";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 font-sans">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Owner <span className="text-indigo-600">Console</span>
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Real-time overview of your portfolio
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold transition active:scale-95"
          >
            <FiPlus /> List Property
          </button>

          <button
            onClick={() => navigate("/owner/my-property")}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            Manage <FiArrowRight />
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {summary.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/70">
                  {item.title}
                </p>
                <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                {item.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">

        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiClock className="text-indigo-600" />
            <h2 className="font-bold text-slate-800">Recent Inquiries</h2>
          </div>

          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
            Top 5
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center text-slate-400 font-semibold animate-pulse">
            Loading...
          </div>
        ) : recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-slate-400 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Property</th>
                  <th className="px-6 py-4 text-left">Tenant</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {recentBookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={booking.imageUrl}
                        alt=""
                        className="w-12 h-10 object-cover rounded-lg border"
                      />
                      <span className="font-semibold text-slate-700">
                        {booking.property?.title}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
                          {booking.tenant?.fullName?.charAt(0)}
                        </div>
                        {booking.tenant?.fullName}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate("/owner/bookings")}
                        className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                      >
                        <FiExternalLink />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center text-slate-500">
            <FiUsers className="mx-auto mb-3 text-slate-300" size={40} />
            No recent activity
          </div>
        )}
      </div>

      {/* MODAL */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddProperty onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};

export default OwnerDashboard;