import React, { useEffect, useState } from "react";
import {
  getAllOwnerBookings,
  updateBookingAccept,
  updateBookingReject,
} from "../../service/bookService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiMapPin,
  FiBox,
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiClock,
  FiActivity,
  FiArrowRight,
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
    } catch {
      toast.error("Failed to accept");
    }
  };

  const handleReject = async (id) => {
    try {
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
        <h3 className="text-xl font-bold text-slate-800">
          No Booking Requests
        </h3>
        <p className="text-slate-500">
          New requests will appear here as they come in.
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 font-sans">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Booking <span className="text-indigo-600">Management</span>
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Review and manage tenant requests
        </p>
      </div>

      <div className="grid gap-8">
        <AnimatePresence>
          {bookings.map((booking, index) => {
            const propertyImages = booking.property.images?.length
              ? [...booking.property.images].reverse()
              : booking.property.imageUrl
              ? [
                  `http://localhost:8080/uploads/properties/${booking.property.imageUrl}`,
                ]
              : [];

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row">

                  {/* IMAGE */}
                  <div className="lg:w-80 relative">
                    <img
                      src={propertyImages[0]}
                      alt={booking.property.title}
                      className="w-full h-72 object-cover"
                    />

                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusStyles(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 p-6 flex flex-col justify-between">

                    {/* TOP */}
                    <div>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-2 text-indigo-500 text-xs font-bold uppercase mb-1">
                            <FiActivity /> Ref #{booking.id}
                          </div>

                          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                            {booking.property.title}
                          </h2>

                          <p className="flex items-center gap-2 text-slate-500 mt-1 text-sm">
                            <FiMapPin />
                            {booking.property.municipality},{" "}
                            {booking.property.district}
                          </p>
                        </div>

                        <div className="bg-slate-900 text-white px-5 py-2 rounded-xl font-bold">
                          Rs. {booking.property.price.toLocaleString()}
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">

                        {/* PROPERTY */}
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">
                            Property Details
                          </p>

                          <div className="flex gap-3 mb-3">
                            <span className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-sm font-semibold text-slate-600">
                              <FiBox /> {booking.property.bedrooms} Beds
                            </span>

                            <span className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-sm font-semibold text-slate-600">
                              <FiActivity /> {booking.property.bathrooms} Baths
                            </span>
                          </div>

                          <p className="text-sm text-slate-500 italic line-clamp-2">
                            {booking.property.description}
                          </p>
                        </div>

                        {/* TENANT */}
                        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                          <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold mb-3">
                            Tenant
                          </p>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold">
                              {booking.tenant.fullName.charAt(0)}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {booking.tenant.fullName}
                              </p>
                              <p className="text-xs text-slate-500">
                                {booking.tenant.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="border-t border-slate-100 pt-5">
                      {booking.status === "PENDING" ? (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAccept(booking.id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition active:scale-95"
                          >
                            <FiCheckCircle /> Approve
                          </button>

                          <button
                            onClick={() => handleReject(booking.id)}
                            className="flex-1 flex items-center justify-center gap-2 border border-rose-200 text-rose-500 hover:bg-rose-50 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition active:scale-95"
                          >
                            <FiXCircle /> Reject
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-semibold flex items-center gap-2 uppercase">
                            Processed <FiArrowRight />
                          </span>

                          {booking.status === "REJECTED" && (
                            <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-rose-500 font-bold uppercase transition">
                              <FiTrash2 /> Remove
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