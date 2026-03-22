import React, { useState, useEffect } from "react";
import { getOwnerProperty, deleteOwnerProperty } from "../../service/ownerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit3, FiTrash2, FiExternalLink, FiMapPin, FiMaximize, FiBox, FiActivity } from "react-icons/fi";
import Modal from "../../modal/public/Modal"; 
import AddProperty from "../../modal/formmodal/AddProperty";

const MyProperty = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getOwnerProperty();
        const formatted = [...data].reverse().map((p) => ({
          ...p,
          images: p.imageUrl
            ? [...p.imageUrl.split(",")].reverse().map(
                (img) => `http://localhost:8080/uploads/properties/${img}`
              )
            : [],
        }));
        setProperties(formatted);
      } catch (error) {
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
      setProperties(properties.filter((p) => p.id !== id));
      toast.success("Listing removed");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      
      {/* --- PREMIUM HERO BANNER --- */}
      <div className="relative h-[400px] w-full overflow-hidden bg-slate-900">
        {properties[0]?.images[0] ? (
          <motion.img 
            initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}
            src={properties[0].images[0]} 
            className="w-full h-full object-cover opacity-60" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-violet-700 opacity-20" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4 inline-block shadow-xl">
              Owner Dashboard
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Portfolio <span className="text-indigo-400">Overview</span>
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto font-medium text-lg">
              Manage your listings, track availability, and maximize your property earnings.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto -mt-16 relative z-10 px-6">
        
        {/* Action Bar */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Listings</h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{properties.length} Properties Found</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group bg-indigo-600 hover:bg-indigo-700 text-white pl-4 pr-6 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 font-bold active:scale-95"
          >
            <div className="bg-white/20 p-1.5 rounded-lg group-hover:rotate-90 transition-transform">
              <FiPlus size={18} />
            </div>
            List New Property
          </button>
        </div>

        {/* --- GRID --- */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-96 bg-slate-200 rounded-[2rem]" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {properties.map((prop, index) => (
                <motion.div
                  layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  key={prop.id}
                  className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Thumbnail Area */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={prop.images[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg border ${
                        prop.bookingStatus === "AVAILABLE" 
                        ? "bg-emerald-500/80 text-white border-emerald-400" 
                        : "bg-amber-500/80 text-white border-amber-400"
                      }`}>
                        {prop.bookingStatus}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-slate-900/90 text-white px-4 py-2 rounded-xl font-black text-sm backdrop-blur-sm">
                      Rs. {prop.price}
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight mb-1">{prop.title}</h3>
                        <p className="flex items-center gap-1 text-slate-400 text-sm font-semibold">
                          <FiMapPin size={14} className="text-indigo-400" /> {prop.municipality}, {prop.district}
                        </p>
                      </div>
                    </div>

                    {/* Features Row */}
                    <div className="flex items-center justify-between py-4 border-y border-slate-50 mb-6">
                      <div className="text-center">
                        <p className="text-indigo-500 font-black text-sm">{prop.bedrooms}</p>
                        <p className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">Beds</p>
                      </div>
                      <div className="w-[1px] h-6 bg-slate-100" />
                      <div className="text-center">
                        <p className="text-indigo-500 font-black text-sm">{prop.bathrooms}</p>
                        <p className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">Baths</p>
                      </div>
                      <div className="w-[1px] h-6 bg-slate-100" />
                      <div className="text-center">
                        <p className="text-indigo-500 font-black text-sm">{prop.area}</p>
                        <p className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">Sq. Ft</p>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleEdit(prop.id)}
                        className="flex-1 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-bold text-xs"
                      >
                        <FiEdit3 size={14} /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(prop.id)}
                        disabled={prop.bookingStatus === "BOOKED"}
                        className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all disabled:opacity-30"
                      >
                        <FiTrash2 size={18} />
                      </button>
                      <button 
                        onClick={() => navigate(`/property/details/${prop.id}`)}
                        className="bg-slate-900 hover:bg-indigo-600 text-white p-3 rounded-xl transition-all shadow-lg shadow-slate-200 active:scale-90"
                      >
                        <FiExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <FiBox size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">No properties listed yet</h3>
            <p className="text-slate-400 mt-2">Start by clicking the "List New Property" button above.</p>
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProperty onClose={() => setIsModalOpen(false)} onRefresh={() => window.location.reload()} />
      </Modal>
    </div>
  );
};

export default MyProperty;