import React, { useEffect, useState } from "react";
import { getAllBookings } from "../../service/bookService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiCalendar, FiClock, FiSearch } from "react-icons/fi";

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
      case "APPROVED":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "PENDING":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "REJECTED":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
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
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-900">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
              Booking <span className="text-indigo-600">Requests</span>
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Manage and review all property reservations
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter bookings..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
            />
          </div>

        </header>

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl shadow-sm border"
          >
            <FiCalendar size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg font-medium">
              No booking requests found.
            </p>
          </motion.div>
        ) : (

          /* TABLE */
          <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">

                {/* HEADER */}
                <thead>
                  <tr className="bg-slate-50 text-slate-500">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b">
                      Property
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b">
                      Parties
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest border-b">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest border-b">
                      Date
                    </th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody className="divide-y divide-slate-100">

                  <AnimatePresence>
                    {bookings.map((booking, index) => (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50 transition-all duration-200"
                      >

                        {/* PROPERTY */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <img
                              src={`http://localhost:8080/uploads/properties/${booking.property.imageUrl}`}
                              alt=""
                              className="w-14 h-14 object-cover rounded-xl shadow-sm"
                            />
                            <div>
                              <p className="font-bold text-slate-800 hover:text-indigo-600 transition">
                                {booking.property.title}
                              </p>
                              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                                {booking.property.type}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* DETAILS */}
                        <td className="px-6 py-5">
                          <p className="text-lg font-extrabold tabular-nums text-slate-800">
                            Rs. {booking.property.price}
                          </p>
                          <p className="text-xs text-slate-500 font-semibold mt-1">
                            {booking.property.bedrooms} Bed • {booking.property.bathrooms} Bath
                          </p>
                        </td>

                        {/* LOCATION */}
                        <td className="px-6 py-5 max-w-[200px]">
                          <div className="flex items-start gap-2 text-slate-600">
                            <FiMapPin className="mt-1 text-indigo-400 shrink-0" />
                            <span className="text-sm font-medium line-clamp-2">
                              {booking.property.district}, {booking.property.municipality}
                            </span>
                          </div>
                        </td>

                        {/* PARTIES */}
                        <td className="px-6 py-5">
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-[10px]">
                                O
                              </span>
                              <span className="font-semibold truncate max-w-[100px]">
                                {booking.property.owner.fullName}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-[10px]">
                                T
                              </span>
                              <span className="font-semibold truncate max-w-[100px]">
                                {booking.tenant.fullName}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5 text-center">
                          <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusStyles(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>

                        {/* DATE */}
                        <td className="px-6 py-5 text-right">
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                              <FiClock className="text-slate-400" />
                              {new Date(booking.property.createdAt).toLocaleDateString()}
                            </div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                              Request Date
                            </span>
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