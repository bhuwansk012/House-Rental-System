import React, { useState, useEffect } from "react";
import {
  getOwnerProperty,
  deleteOwnerProperty,
} from "../../service/ownerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiExternalLink,
  FiMapPin,
  FiBox,
} from "react-icons/fi";
import Modal from "../../modal/public/Modal";
import AddProperty from "../../modal/formmodal/AddProperty";

const MyProperty = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const unpaidCount = properties.filter((p) => !p.payment_status).length;
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getOwnerProperty();

        console.log("Fetched properties:", data);

        // FIXED: map images per property
        const formatted = data
          .slice()
          .reverse()
          .map((p) => ({
            ...p,
            images: Array.isArray(p.images)
              ? p.images.map(
                (img) =>
                  `http://localhost:8080/uploads/properties/${img}`
              )
              : [],
          }));

        setProperties(formatted);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    const prop = properties.find((p) => p.id === id);

    if (prop?.bookingStatus === "BOOKED") {
      return toast.error("Active bookings cannot be deleted");
    }

    if (!window.confirm("Delete this property listing?")) return;

    try {
      await deleteOwnerProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      toast.success("Listing removed");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/owner/property/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">

      {/* HERO */}
      <div className="relative h-95 bg-slate-900 overflow-hidden">
        {properties[0]?.images?.[0] && (
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            src={properties[0].images[0]}
            className="w-full h-full object-cover opacity-50"
          />
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-slate-300 mt-3 max-w-xl font-medium">
            Manage your property listings efficiently
          </p>
        </div>
        {unpaidCount > 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 top-2 w-[90%] right-0">
            <div className="text-white font-bold bg-yellow-500 bg-opacity-90 px-6 py-3 rounded-xl shadow-lg">
              <p>{unpaidCount} propert{unpaidCount > 1 ? "ies" : "y"} payment have not yet completed. please complete the payment to make them public and visible to tenants.</p>
              {properties.map((prop) => (
                <div key={prop.id}>
                 {prop.payment_status === false && <p >{prop.title},</p>}
                </div>
              ))}
            </div>


          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto -mt-16 px-6 relative z-10">

        {/* ACTION BAR */}
        <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Your Listings
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
              {properties.length} Properties
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition active:scale-95"
          >
            <FiPlus />
            Add Property
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 bg-slate-200 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {properties.map((prop, index) => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition overflow-hidden group"
                >

                  {/* IMAGE */}
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={
                        prop.images?.[0] ||
                        "https://via.placeholder.com/400x300"
                      }
                      alt={prop.title}
                      onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/400x300")
                      }
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* STATUS */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${prop.bookingStatus === "AVAILABLE"
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-500 text-white"
                          }`}
                      >
                        {prop.bookingStatus}
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="absolute bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-sm">
                      Rs. {prop.price}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-800">
                      {prop.title}
                    </h3>

                    <p className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                      <FiMapPin size={14} />
                      {prop.municipality}, {prop.district}
                    </p>

                    {/* FEATURES */}
                    <div className="flex justify-between text-center py-4 border-y border-slate-100 my-5">
                      <div>
                        <p className="text-indigo-600 font-bold">
                          {prop.bedrooms}
                        </p>
                        <p className="text-[10px] uppercase text-slate-400">
                          Beds
                        </p>
                      </div>

                      <div>
                        <p className="text-indigo-600 font-bold">
                          {prop.bathrooms}
                        </p>
                        <p className="text-[10px] uppercase text-slate-400">
                          Baths
                        </p>
                      </div>

                      <div>
                        <p className="text-indigo-600 font-bold">
                          {prop.area}
                        </p>
                        <p className="text-[10px] uppercase text-slate-400">
                          Sq Ft
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(prop.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 py-2.5 rounded-xl font-semibold text-xs transition"
                      >
                        <FiEdit3 size={14} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(prop.id)}
                        disabled={prop.bookingStatus === "BOOKED"}
                        className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition disabled:opacity-30"
                      >
                        <FiTrash2 />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/owner/property/details/${prop.id}`)
                        }
                        className="p-3 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition"
                      >
                        <FiExternalLink />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* EMPTY */}
        {!loading && properties.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <FiBox size={40} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">
              No properties yet
            </h3>
            <p className="text-slate-500 mt-2">
              Start by adding your first listing
            </p>
          </div>
        )}
      </div>

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProperty
          onClose={() => setIsModalOpen(false)}
          onRefresh={() => window.location.reload()}
        />
      </Modal>
    </div>
  );
};

export default MyProperty;