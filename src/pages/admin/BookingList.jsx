import React, { useEffect, useState } from "react";
import { getAllBookings } from "../../service/bookService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiUser, FiMapPin, FiCalendar, FiClock, FiSearch } from "react-icons/fi";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      if (response.status === 200 && response.data) {
        setBookings([...response.data].reverse());
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      toast.error("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case "APPROVED": return "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50";
      case "PENDING": return "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-50";
      case "REJECTED": return "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-50";
      default: return "bg-slate-50 text-slate-600 border-slate-100 shadow-slate-50";
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-800">
              Booking <span className="text-indigo-600">Requests</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Manage and review all property reservations</p>
          </div>
          
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter bookings..." 
              className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-80 shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </header>

        {bookings.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
            <FiCalendar size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg font-medium">No booking requests found today.</p>
          </motion.div>
        ) : (
          <div className="overflow-hidden bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white">
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500">
                    <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest border-b border-slate-100">Property</th>
                    <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest border-b border-slate-100">Details</th>
                    <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest border-b border-slate-100">Location</th>
                    <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest border-b border-slate-100">Parties</th>
                    <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest border-b border-slate-100 text-center">Status</th>
                    <th className="px-8 py-5 text-right text-xs font-bold uppercase tracking-widest border-b border-slate-100">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {bookings.map((booking, index) => (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-slate-50/80 transition-all duration-300"
                      >
                        {/* Property Image & Title */}
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="relative shrink-0">
                              <img
                                src={`http://localhost:8080/uploads/properties/${booking.property.imageUrl}`}
                                alt=""
                                className="w-16 h-16 object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                                {booking.property.title}
                              </p>
                              <span className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
                                {booking.property.type}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Details */}
                        <td className="px-6 py-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-lg font-black text-slate-700">Rs. {booking.property.price}</span>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                              <span>{booking.property.bedrooms} Bed</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span>{booking.property.bathrooms} Bath</span>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-6 max-w-[200px]">
                          <div className="flex items-start gap-2 text-slate-600">
                            <FiMapPin className="mt-1 shrink-0 text-indigo-400" />
                            <span className="text-sm font-medium line-clamp-2">
                              {booking.property.district}, {booking.property.municipality}
                            </span>
                          </div>
                        </td>

                        {/* Owner & Tenant */}
                        <td className="px-6 py-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] text-indigo-600 font-bold">O</div>
                              <span className="text-xs font-bold text-slate-700 truncate max-w-[100px]">{booking.property.owner.fullName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] text-emerald-600 font-bold">T</div>
                              <span className="text-xs font-bold text-slate-700 truncate max-w-[100px]">{booking.tenant.fullName}</span>
                            </div>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-6 text-center">
                          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black tracking-wide border transition-all duration-300 shadow-sm ${getStatusStyles(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-8 py-6 text-right">
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm italic">
                              <FiClock className="text-slate-400" />
                              {new Date(booking.property.createdAt).toLocaleDateString()}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Request Date</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;