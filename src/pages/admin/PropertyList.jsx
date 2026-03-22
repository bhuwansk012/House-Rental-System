import React, { useEffect, useState } from "react";
import { getAdminProperties, updatePropertyStatus } from "../../service/adminService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiMaximize,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiHome,
  FiUser
} from "react-icons/fi";

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
        images:
          p.images && p.images.length > 0
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-900"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
            Inventory <span className="text-indigo-600">Management</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">
            Verify and manage platform property listings
          </p>
        </header>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
          <div className="overflow-x-auto">

            <table className="min-w-full border-separate border-spacing-0">

              {/* HEADER */}
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-b">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-b">
                    Specifications
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-b">
                    Location
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider border-b">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider border-b">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {properties.map((property, index) => (
                  <motion.tr
                    key={property.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* PROPERTY */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={property.images[0] || "https://via.placeholder.com/100"}
                          className="w-16 h-16 object-cover rounded-xl shadow-sm"
                          alt=""
                        />

                        <div>
                          <p className="font-semibold text-slate-800 text-base leading-snug">
                            {property.title}
                          </p>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                              {property.type}
                            </span>
                            <span className="text-sm font-bold text-emerald-600">
                              Rs. {property.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* SPECS */}
                    <td className="px-6 py-5">
                      <div className="space-y-2 text-sm text-slate-600 font-medium">

                        <div className="flex items-center gap-2">
                          <FiMaximize className="text-slate-400" />
                          {property.area} <span className="text-xs text-slate-400">SQFT</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FiHome className="text-slate-400" />
                          {property.bedrooms} <span className="text-xs text-slate-400">BED</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FiUser className="text-slate-400" />
                          <span className="truncate max-w-[140px]">
                            {property.owner?.fullName || "Admin"}
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* LOCATION */}
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-2 max-w-[220px]">
                        <FiMapPin className="text-rose-400 mt-1 shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">
                            {property.houseName || "Private Estate"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {property.municipality}, Ward {property.wardNo}, {property.district}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border tracking-wide ${getStatusBadge(property.status)}`}>
                        {property.status === "PENDING" && <FiClock className="mr-1" />}
                        {property.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5 text-right">
                      {property.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">

                          <button
                            disabled={loadingId === property.id}
                            onClick={() => handleStatusChange(property.id, "APPROVED")}
                            className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition active:scale-90"
                            title="Approve"
                          >
                            <FiCheckCircle size={18} />
                          </button>

                          <button
                            disabled={loadingId === property.id}
                            onClick={() => handleStatusChange(property.id, "REJECTED")}
                            className="p-2.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition active:scale-90"
                            title="Reject"
                          >
                            <FiXCircle size={18} />
                          </button>

                        </div>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400">
                          Reviewed on {new Date(property.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </td>

                  </motion.tr>
                ))}

              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {properties.length === 0 && (
            <div className="text-center py-20">
              <FiHome size={40} className="mx-auto text-slate-200 mb-3" />
              <p className="text-slate-400 font-medium">
                No properties found in the database.
              </p>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
};

export default PropertyList;