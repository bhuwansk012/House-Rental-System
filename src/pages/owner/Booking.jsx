import React, { useEffect, useState } from "react";
import {
  getAllOwnerBookings,
  updateBookingAccept,
  updateBookingReject,
} from "../../service/bookService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import {
  FiMapPin,
  FiBox,
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiClock,
  FiActivity,
  FiArrowRight,
  FiEye,
  FiLayers
} from "react-icons/fi";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllOwnerBookings();
      // Ensure we are working with an array
      const data = Array.isArray(response.data) ? response.data : [];
      setBookings([...data].reverse());
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
      setAccepting(true);
      await updateBookingAccept(id);
      toast.success("Booking approved");
      fetchBookings();
    } catch {
      toast.error("Failed to accept");
    }
  };

  const handleReject = async (id) => {
    try {
      setRejecting(true);
      await updateBookingReject(id);
      toast.success("Booking declined");
      fetchBookings();
    } catch {
      toast.error("Failed to reject");
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "REJECTED":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Loading Requests...
        </p>
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="text-center mt-32">
        <FiClock size={48} className="mx-auto text-slate-200 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">No Booking Requests</h3>
        <p className="text-slate-500">New requests will appear here as they come in.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 font-sans">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Booking <span className="text-indigo-600">Management</span>
        </h1>
        <p className="text-slate-500 mt-1 font-medium">Review and manage tenant requests</p>
      </div>

      <div className="grid gap-8">
        <AnimatePresence>
          {bookings.map((booking, index) => {
            // --- IMAGE ARRAY HANDLING ---
            const propertyImages = booking.property?.images?.length
              ? booking.property.images.map(img => `http://localhost:8080/uploads/properties/${img}`)
              : booking.property?.imageUrl
              ? [`http://localhost:8080/uploads/properties/${booking.property.imageUrl}`]
              : ["https://via.placeholder.com/400x300?text=No+Image"];

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* IMAGE SECTION */}
                  <div className="lg:w-80 relative group">
                    <img
                      src={propertyImages[0]}
                      alt={booking.property?.title}
                      className="w-full h-72 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${getStatusStyles(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    {/* Image Count Badge */}
                    {propertyImages.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-[10px] flex items-center gap-1 font-bold">
                        <FiLayers /> {propertyImages.length} Photos
                      </div>
                    )}
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-2 text-indigo-500 text-xs font-bold uppercase mb-1">
                            <FiActivity /> Ref #{booking.id.toString().slice(-6).toUpperCase()}
                          </div>
                          <h2 className="text-2xl font-black text-slate-800">{booking.property?.title}</h2>
                          <p className="flex items-center gap-2 text-slate-500 mt-1 text-sm font-medium">
                            <FiMapPin className="text-indigo-400" />
                            {booking.property?.municipality}, {booking.property?.district}
                          </p>
                        </div>
                        <div className="bg-slate-900 text-white px-6 py-2 rounded-2xl font-black shadow-lg shadow-slate-200">
                          Rs. {booking.property?.price?.toLocaleString()}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Property Specs */}
                        <div className="space-y-4">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Property Details</p>
                          <div className="flex gap-3">
                            <span className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-100">
                              <FiBox /> {booking.property?.bedrooms} Beds
                            </span>
                            <span className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-100">
                              <FiActivity /> {booking.property?.bathrooms} Baths
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                            {booking.property?.description}
                          </p>
                        </div>

                        {/* Tenant Info */}
                        <div className="bg-indigo-50/50 p-5 rounded-4xl border border-indigo-100/50">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-500 font-black mb-4">Requester Info</p>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shadow-indigo-200 shadow-lg">
                              {booking.tenant?.fullName?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{booking.tenant?.fullName}</p>
                              <p className="text-xs text-slate-500 font-medium">{booking.tenant?.email}</p>
                              <p className="text-[10px] text-indigo-600 font-bold mt-1 bg-indigo-100 w-fit px-2 py-0.5 rounded-md">
                                {booking.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="border-t border-slate-100 pt-6">
                      {booking.status === "PENDING" ? (
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleAccept(booking.id)}
                            className="flex-1 min-w-35 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-100"
                          >
                            <FiCheckCircle size={16} />{accepting ? "Approving..." : " Approve"}
                          </button>
                          <button
                            onClick={() => handleReject(booking.id)}
                            className="flex-1 min-w-35 flex items-center justify-center gap-2 border-2 border-rose-100 text-rose-500 hover:bg-rose-50 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95"
                          >
                            <FiXCircle size={16} />{rejecting ? "Rejecting..." : " Reject"}
                          </button>
                          <button 
                            onClick={() => navigate(`/owner/booking/details/${booking.id}`)}
                            className="flex-1 min-w-35 flex items-center justify-center gap-2 bg-slate-50 text-slate-600 hover:bg-slate-100 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                          >
                            <FiEye size={16} /> Details
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            Processed <FiArrowRight /> {booking.status}
                          </div>
                          <div className="flex gap-3">
                            <button 
                              onClick={() => navigate(`/owner/booking/details/${booking.id}`)}
                              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                            >
                              <FiEye /> View Details
                            </button>
                            {booking.status === "REJECTED" && (
                              <button className="p-3 text-slate-300 hover:text-rose-500 transition-colors">
                                <FiTrash2 size={20} />
                              </button>
                            )}
                          </div>
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