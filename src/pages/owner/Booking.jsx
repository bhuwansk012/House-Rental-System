import React, { useEffect, useState } from "react";
import { getAllOwnerBookings, updateBookingAccept, updateBookingReject } from "../../service/bookService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { 
  FiHome, FiUser, FiMapPin, FiBox, FiCheckCircle, 
  FiXCircle, FiTrash2, FiClock, FiActivity, FiArrowRight 
} from "react-icons/fi";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllOwnerBookings();
      setBookings([...response.data].reverse());
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAccept = async (id) => {
    try {
      await updateBookingAccept(id);
      toast.success("Booking approved");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to accept");
    }
  };

  const handleReject = async (id) => {
    try {
      await updateBookingReject(id);
      toast.success("Booking declined");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to reject");
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "PENDING": return "bg-amber-50 text-amber-600 border-amber-100";
      case "ACCEPTED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "REJECTED": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Requests...</p>
    </div>
  );

  if (bookings.length === 0) return (
    <div className="text-center mt-32">
      <FiClock size={48} className="mx-auto text-slate-200 mb-4" />
      <h3 className="text-xl font-bold text-slate-800">No Booking Requests</h3>
      <p className="text-slate-500">New requests will appear here as they come in.</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 font-sans">
      
      {/* HEADER SECTION */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">
          Management <span className="text-indigo-600">Hub</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg mt-1">Review and process your property inquiries</p>
      </div>

      <div className="grid gap-8">
        <AnimatePresence>
          {bookings.map((booking, index) => {
            const propertyImages = booking.property.images?.length
              ? [...booking.property.images].reverse()
              : booking.property.imageUrl
              ? [`http://localhost:8080/uploads/properties/${booking.property.imageUrl}`]
              : [];

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={booking.id}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row">
                  
                  {/* LEFT: IMAGE SECTION */}
                  <div className="lg:w-80 relative overflow-hidden">
                    <img
                      src={propertyImages[0]}
                      alt={booking.property.title}
                      className="w-full h-full min-h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(booking.status)} shadow-lg backdrop-blur-md`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT: DETAILS SECTION */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      {/* Property Title & Info */}
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase tracking-tighter mb-1">
                            <FiActivity /> Reference #{booking.id}
                          </div>
                          <h2 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                            {booking.property.title}
                          </h2>
                          <p className="flex items-center gap-1.5 text-slate-500 font-medium mt-1">
                            <FiMapPin className="text-slate-400" />
                            {booking.property.municipality}, {booking.property.district}
                          </p>
                        </div>
                        <div className="bg-slate-900 text-white px-6 py-2 rounded-2xl text-lg font-black italic shadow-xl shadow-slate-200">
                          Rs. {booking.property.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Split Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Property Specs */}
                        <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Space Specifications</p>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-600 font-bold text-sm">
                              <FiBox className="text-indigo-400" /> {booking.property.bedrooms} Beds
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-600 font-bold text-sm">
                              <FiActivity className="text-indigo-400" /> {booking.property.bathrooms} Baths
                            </div>
                          </div>
                          <p className="text-slate-500 text-sm leading-relaxed italic line-clamp-2">
                            "{booking.property.description}"
                          </p>
                        </div>

                        {/* Tenant Profile */}
                        <div className="bg-indigo-50/50 p-5 rounded-3xl border border-indigo-100/50">
                          <p className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] mb-3">Prospective Tenant</p>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">
                              {booking.tenant.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{booking.tenant.fullName}</p>
                              <p className="text-xs text-slate-500 font-medium">{booking.tenant.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS SECTION */}
                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
                      {booking.status === "PENDING" ? (
                        <div className="flex gap-3 w-full">
                          <button
                            onClick={() => handleAccept(booking.id)}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            <FiCheckCircle size={16} /> Approve Request
                          </button>
                          <button
                            onClick={() => handleReject(booking.id)}
                            className="flex-1 bg-white hover:bg-rose-50 text-rose-500 border border-rose-100 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            <FiXCircle size={16} /> Decline
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase italic">
                            Processed {booking.status.toLowerCase()} <FiArrowRight />
                          </div>
                          {booking.status === "REJECTED" && (
                            <button className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-bold text-xs uppercase tracking-widest">
                              <FiTrash2 /> Remove Entry
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Booking;