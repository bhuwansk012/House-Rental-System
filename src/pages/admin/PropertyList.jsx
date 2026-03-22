import React, { useEffect, useState } from "react";
import { getAdminProperties, updatePropertyStatus } from "../../service/adminService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiMaximize, FiCheckCircle, FiXCircle, FiClock, FiHome } from "react-icons/fi";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await getAdminProperties();
      const formatted = response.map((p) => ({
        ...p,
        images: p.images && p.images.length > 0
            ? p.images
            : p.imageUrl
            ? [`http://localhost:8080/uploads/properties/${p.imageUrl}`]
            : [],
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
        toast.success(`Property ${newStatus.toLowerCase()}!`);
        fetchProperties();
      }
    } catch (error) {
      toast.error("Status update failed");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      APPROVED: "bg-emerald-50 text-emerald-600 border-emerald-100",
      PENDING: "bg-amber-50 text-amber-600 border-amber-100",
      REJECTED: "bg-rose-50 text-rose-600 border-rose-100",
    };
    return styles[status] || "bg-slate-50 text-slate-500";
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="p-6 md:p-10 bg-[#f8fafc] min-h-screen font-sans"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Inventory <span className="text-indigo-600">Management</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Verify and manage platform property listings</p>
        </header>

        {/* --- TABLE CONTAINER --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400">
                  <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-widest border-b border-slate-100">Property</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest border-b border-slate-100">Specifications</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest border-b border-slate-100">Location</th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest border-b border-slate-100 text-center">Verification</th>
                  <th className="px-8 py-5 text-right text-xs font-bold uppercase tracking-widest border-b border-slate-100">Action</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-50">
                {properties.map((property, index) => (
                  <motion.tr 
                    key={property.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group hover:bg-slate-50/80 transition-all duration-300"
                  >
                    {/* Visual & Title */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative shrink-0">
                          <img
                            src={property.images[0] || "https://via.placeholder.com/100"}
                            className="w-20 h-20 object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-500"
                            alt=""
                          />
                          <span className="absolute -top-2 -left-2 bg-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm border border-slate-100 text-slate-400">
                            #{property.id}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-lg leading-tight mb-1">{property.title}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase">{property.type}</span>
                            <span className="text-emerald-600 font-black text-sm">Rs. {property.price}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Specs */}
                    <td className="px-6 py-6">
                      <div className="grid grid-cols-2 gap-y-2 text-slate-600">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <FiMaximize className="text-slate-400" /> {property.area} <span className="text-[10px] text-slate-400">SQFT</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <FiHome className="text-slate-400" /> {property.bedrooms} <span className="text-[10px] text-slate-400">BED</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <FiUser className="text-slate-400" size={14} /> 
                          <span className="truncate max-w-[80px]">{property.owner?.fullName || "Admin"}</span>
                        </div>
                      </div>
                    </td>

                    {/* Location Grouped */}
                    <td className="px-6 py-6">
                      <div className="flex items-start gap-2 max-w-[200px]">
                        <FiMapPin className="text-rose-400 mt-1 shrink-0" />
                        <div className="text-sm">
                          <p className="font-bold text-slate-700 leading-tight">{property.houseName || "Private Estate"}</p>
                          <p className="text-slate-400 text-xs font-medium truncate">
                            {property.municipality}, Ward {property.wardNo}, {property.district}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-6 text-center">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black border tracking-wider transition-all duration-300 ${getStatusBadge(property.status)}`}>
                        {property.status === "PENDING" && <FiClock className="mr-1.5 animate-spin-slow" />}
                        {property.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6 text-right">
                      {property.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            disabled={loadingId === property.id}
                            onClick={() => handleStatusChange(property.id, "APPROVED")}
                            className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-90"
                            title="Approve Listing"
                          >
                            <FiCheckCircle size={20} />
                          </button>
                          <button
                            disabled={loadingId === property.id}
                            onClick={() => handleStatusChange(property.id, "REJECTED")}
                            className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-90"
                            title="Reject Listing"
                          >
                            <FiXCircle size={20} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                          Reviewed {new Date(property.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {properties.length === 0 && (
            <div className="text-center py-20">
              <FiHome size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium">No properties found in the database.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyList;