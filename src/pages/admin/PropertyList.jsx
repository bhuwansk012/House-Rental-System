import React, { useEffect, useState } from "react";
import { getAdminProperties, updatePropertyStatus } from "../../service/adminService";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import {
  FiMapPin,
  FiMaximize,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiHome,
  FiUser,
  FiEye,
  FiSearch,
  FiFilter
} from "react-icons/fi";

// Loading Spinner Component
const ButtonLoader = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
  />
);

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await getAdminProperties();
      // Logic to handle different image path structures
      console.log("Fetched properties:", response);
      const formatted = response.map((p) => ({
        ...p,
        displayImage: p.images && p.images.length > 0
          ?  `http://localhost:8080/uploads/properties/${p.images[0]}`
            : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=300&auto=format&fit=crop",
      }));
      setProperties(formatted);
    } catch (error) {
      toast.error("Failed to load properties");
    }
  };

  const handleStatusChange = async (propertyId, newStatus) => {
    try {
      setLoadingId(propertyId);
      const response = await updatePropertyStatus(propertyId, newStatus);
      if (response.status === 200) {
        toast.success(`Property ${newStatus.toLowerCase()} successfully!`);
        fetchProperties(); // Refresh list
      }
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      APPROVED: "bg-emerald-50 text-emerald-600 border-emerald-200",
      PENDING: "bg-amber-50 text-amber-600 border-amber-200",
      REJECTED: "bg-rose-50 text-rose-600 border-rose-200",
    };
    return styles[status] || "bg-slate-50 text-slate-500 border-slate-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f1f5f9] p-4 md:p-10 font-sans text-slate-900"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800">
              Property <span className="text-indigo-600">Approval</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Review, approve, or reject new property listings.
            </p>
          </div>
        </header>

        {/* MAIN TABLE CARD */}
        <div className="bg-white rounded-4xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400">
                  <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest">Property Details</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest">Specifications</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest">Location</th>
                  <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-right text-xs font-bold uppercase tracking-widest">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {properties
                    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((property, index) => (
                    <motion.tr
                      key={property.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* PROPERTY COLUMN */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="relative shrink-0">
                            <img
                              src={property.displayImage}
                              className="w-20 h-20 object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-300"
                              alt="property"
                            />
                            <div className="absolute -top-2 -left-2 bg-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-100 text-[10px] font-bold text-indigo-600 uppercase">
                              {property.type}
                            </div>
                          </div>

                          <div>
                            <p className="font-bold text-slate-800 text-lg leading-tight mb-1">
                              {property.title}
                            </p>
                            <p className="text-xl font-black text-emerald-600">
                              Rs. {property.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SPECS COLUMN */}
                      <td className="px-6 py-6 text-sm text-slate-600 font-medium">
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center gap-2">
                            <FiMaximize className="text-indigo-400" />
                            <span>{property.area} <span className="text-slate-400 font-normal">Sqft</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiHome className="text-indigo-400" />
                            <span>{property.bedrooms} <span className="text-slate-400 font-normal">Beds</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiUser className="text-indigo-400" />
                            <span className="truncate max-w-30 text-slate-500 italic">
                                {property.ownerName || "Private Seller"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* LOCATION COLUMN */}
                      <td className="px-6 py-6">
                        <div className="flex items-start gap-2 max-w-50">
                          <FiMapPin className="text-rose-500 mt-1 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-700 text-sm leading-tight">
                              {property.municipality}
                            </p>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              Ward {property.wardNo}, {property.district}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* STATUS COLUMN */}
                      <td className="px-6 py-6 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black border tracking-wider transition-all duration-300 ${getStatusBadge(property.status)}`}>
                          {property.status === "PENDING" && <FiClock className="animate-pulse" />}
                          {property.status}
                        </span>
                      </td>

                      {/* ACTIONS COLUMN */}
                      <td className="px-8 py-6">
                        <div className="flex justify-end items-center gap-2">
                          {/* VIEW ICON */}
                          <button 
                            onClick={() => navigate(`/admin/property/details/${property.id}`)}
                            className="p-2.5 text-purple-900 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all mr-2"
                            title="Quick View"
                          >
                            <FiEye size={20} />
                          </button>

                          {property.status === "PENDING" ? (
                            <>
                              <button
                                disabled={loadingId === property.id}
                                onClick={() => handleStatusChange(property.id, "APPROVED")}
                                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50"
                              >
                                {loadingId === property.id ? <ButtonLoader /> : <FiCheckCircle size={16} />}
                                <span>Approve</span>
                              </button>

                              <button
                                disabled={loadingId === property.id}
                                onClick={() => handleStatusChange(property.id, "REJECTED")}
                                className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-200 transition-all active:scale-95 disabled:opacity-50"
                              >
                                {loadingId === property.id ? <ButtonLoader /> : <FiXCircle size={16} />}
                                <span>Reject</span>
                              </button>
                            </>
                          ) : (
                            <div className="text-right">
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Processed</p>
                              <p className="text-[11px] font-bold text-slate-400 italic">
                                {new Date(property.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {properties.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4 border border-slate-100">
                <FiHome size={32} className="text-slate-200" />
              </div>
              <p className="text-slate-400 font-bold text-lg">No pending properties found</p>
              <p className="text-slate-300 text-sm italic">Sit back and relax!</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyList;