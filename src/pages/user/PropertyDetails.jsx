import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiMapPin, FiMaximize, FiNavigation, FiCalendar, 
  FiWind, FiTruck, FiCheckCircle, FiInfo 
} from "react-icons/fi";
import { 
  FaBed, FaBath, FaRulerCombined, FaCar, FaCouch 
} from "react-icons/fa";
import { getPropertyById } from "../../service/publicService";
import { toast } from "react-toastify";
import Modal from "../../modal/public/Modal";
import AddDetail from "../../modal/formmodal/AddDetail";

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const fetchProperty = async () => {
    try {
      const response = await getPropertyById(id);
      setProperty({
        ...response.data,
        imageUrl: `http://localhost:8080/uploads/properties/${response.data.imageUrl}`,
      });
    } catch (error) {
      toast.error("Failed to load property");
    }
  };

  useEffect(() => { fetchProperty(); }, [id]);

  const handleBooking = () => {
    if (role === "TENANT") setIsModalOpen(true);
    else {
      toast.info("Please login as a Tenant to book");
      navigate("/login");
    }
  };

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
      {/* --- HEADER NAVIGATION --- */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="text-slate-500 font-bold flex items-center gap-2 hover:text-indigo-600 transition-colors">
            <FiNavigation className="rotate-[270deg]" /> Back to Search
          </button>
          <div className="flex gap-4">
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                property.bookingStatus === "AVAILABLE" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
             }`}>
               {property.bookingStatus}
             </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* --- TITLE & LOCATION --- */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-4">{property.title}</h1>
          <div className="flex items-center gap-2 text-slate-500 font-medium text-lg">
            <FiMapPin className="text-indigo-600" />
            {property.tole}, {property.municipality}, {property.district}
          </div>
        </div>

        {/* --- HERO IMAGE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[300px] md:h-[500px]">
          <div className="md:col-span-3 rounded-[2.5rem] overflow-hidden shadow-2xl group relative">
            <img src={property.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <div className="flex-1 bg-indigo-100 rounded-[2rem] flex flex-col items-center justify-center text-indigo-600 p-4 text-center">
              <FiMaximize size={32} className="mb-2" />
              <p className="text-xs font-black uppercase tracking-widest leading-tight">Expanded View Coming Soon</p>
            </div>
            <div className="flex-1 bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-white p-4 text-center">
              <p className="text-2xl font-black">Rs. {property.price}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monthly Rent</p>
            </div>
          </div>
        </div>

        {/* --- CONTENT & SIDEBAR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* AMENITIES QUICK VIEW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: `${property.bedrooms} Beds`, icon: <FaBed /> },
                { label: `${property.bathrooms} Baths`, icon: <FaBath /> },
                { label: `${property.area} Sqft`, icon: <FaRulerCombined /> },
                { label: property.furnished ? "Furnished" : "Unfurnished", icon: <FaCouch /> }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
                  <div className="text-indigo-600 text-xl mb-2">{item.icon}</div>
                  <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">{item.label}</span>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <section>
              <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <FiInfo className="text-indigo-600" /> About this Property
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm">
                {property.description || "Indulge in a premium living experience at this meticulously maintained residence. Perfectly located to provide both tranquility and convenience."}
              </p>
            </section>

            {/* FEATURES LIST */}
            <section className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 mb-6">Key Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { text: "Parking Available", active: property.parkingAvailable, icon: <FaCar /> },
                  { text: "Security Deposit Required", active: true, icon: <FiCheckCircle /> },
                  { text: "Verified Property Data", active: true, icon: <FiCheckCircle /> },
                  { text: "Garden / Greenery", active: true, icon: <FiWind /> }
                ].map((f, i) => (
                  <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl ${f.active ? 'text-slate-700' : 'text-slate-300 line-through opacity-50'}`}>
                    <span className={f.active ? 'text-indigo-500' : ''}>{f.icon}</span>
                    <span className="font-bold text-sm">{f.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* LOCATION MAP */}
            <section>
              <h2 className="text-2xl font-black text-slate-800 mb-6">Neighborhood</h2>
              <div className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
                <iframe
                  title="map" width="100%" height="400" loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.municipality}, ${property.district}, Nepal`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR (Sticky) */}
          <div className="relative">
            <div className="sticky top-24 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-indigo-50"
              >
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Reserve Now</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-black text-slate-800">Rs. {property.price}</span>
                  <span className="text-slate-400 font-bold">/mo</span>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex justify-between text-sm font-bold text-slate-500 border-b border-slate-50 pb-2">
                      <span>Owner</span>
                      <span className="text-slate-800">{property.ownerName}</span>
                   </div>
                   <div className="flex justify-between text-sm font-bold text-slate-500 border-b border-slate-50 pb-2">
                      <span>Property ID</span>
                      <span className="text-slate-800">#RH-{property.id}</span>
                   </div>
                </div>

                {property.bookingStatus === "AVAILABLE" ? (
                  <button
                    onClick={handleBooking}
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-95"
                  >
                    Send Booking Request
                  </button>
                ) : (
                  <button disabled className="w-full bg-slate-100 text-slate-400 py-5 rounded-2xl font-black uppercase tracking-widest text-xs cursor-not-allowed">
                    Currently Booked
                  </button>
                )}
                
                <p className="text-center text-[10px] text-slate-400 mt-4 font-bold flex items-center justify-center gap-2">
                  <FiTruck /> Safe & Verified Payment Options
                </p>
              </motion.div>

              <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white">
                 <p className="font-black text-xl mb-2">Need Help?</p>
                 <p className="text-indigo-100 text-sm font-medium mb-6">Talk to our housing experts to get the best deal.</p>
                 <button className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-xl font-bold transition-all">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddDetail id={property.id} />
      </Modal>
    </main>
  );
};

export default PropertyDetails;