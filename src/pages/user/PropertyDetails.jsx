import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import LeafLetMap from "../../components/map/LeafLetMap";
import {
  FiMapPin,
  FiNavigation,
  FiInfo,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";
import { FaBed, FaBath, FaRulerCombined, FaCouch, FaCar } from "react-icons/fa";
import { getPropertyById } from "../../service/publicService";
import { toast } from "react-toastify";
import Modal from "../../modal/public/Modal";
import AddDetail from "../../modal/formmodal/AddDetail";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const role = sessionStorage.getItem("role");

  const fetchProperty = async () => {
    try {
      const response = await getPropertyById(id);
      const rawImages = Array.isArray(response.data.imageUrl) ? response.data.imageUrl : [];

      const images = rawImages.map(
        (img) => `http://localhost:8080/uploads/properties/${img}`
      );

      setProperty({
        ...response.data,
        images:
          images.length > 0
            ? images
            : ["https://via.placeholder.com/800x500?text=No+Image"],
      });
    } catch (error) {
      toast.error("Failed to load property");
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleBooking = () => {
    if (role === "TENANT") {
      setIsModalOpen(true);
    } else {
      toast.info("Please login as a Tenant to book");
      navigate("/login");
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900">
      {/* GLASSMORPHIC HEADER */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-indigo-600 transition-all shadow-sm active:scale-95"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">Back to Search</span>
          </button>

          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm ${
              property.bookingStatus === "AVAILABLE"
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                : "bg-rose-100 text-rose-700 border border-rose-200"
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${property.bookingStatus === "AVAILABLE" ? "bg-emerald-500" : "bg-rose-500"}`} />
              {property.bookingStatus}
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* TITLE & LOCATION */}
        <header className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight"
          >
            {property.title}
          </motion.h1>
          <div className="flex items-center gap-3 text-slate-500 bg-white w-fit px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-indigo-50 p-2 rounded-lg">
              <FiMapPin className="text-indigo-600" />
            </div>
            <span className="text-base font-medium">
              {property.tole}, {property.municipality}, {property.district}
            </span>
          </div>
        </header>

        {/* MODERN GALLERY GRID */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 h-[400px] md:h-[550px]">
          <div className="md:col-span-2 relative overflow-hidden rounded-[2rem] shadow-2xl group">
            <Zoom>
              <img
                src={property.images[0]}
                alt="Primary"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Zoom>
          </div>
          <div className="md:col-span-1 grid grid-rows-2 gap-4">
            {property.images.slice(1, 3).map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-[1.5rem] shadow-lg group">
                <Zoom>
                  <img
                    src={img}
                    alt="Interior"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Zoom>
              </div>
            ))}
          </div>
          {/* Third column for a 4th image or a "See all" card if you have more */}
          <div className="hidden md:block md:col-span-1 relative overflow-hidden rounded-[1.5rem] shadow-lg group bg-indigo-900">
             <img
                src={property.images[3] || property.images[0]}
                alt="Interior"
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-white font-bold text-lg">+{property.images.length} Photos</span>
              </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* STAT CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Bedrooms", val: property.bedrooms, icon: <FaBed /> },
                { label: "Bathrooms", val: property.bathrooms, icon: <FaBath /> },
                { label: "Sqft Area", val: property.area, icon: <FaRulerCombined /> },
                { label: "Style", val: property.furnished ? "Furnished" : "Minimal", icon: <FaCouch /> },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 text-xl">
                    {item.icon}
                  </div>
                  <div className="text-lg font-bold text-slate-900">{item.val}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>

            {/* ABOUT PROPERTY */}
            <section className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-600 rounded-full" />
                Property Overview
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </section>

            {/* LOCATION SECTION */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Location & Neighborhood</h2>
                  <p className="text-slate-500">Explore what's around this property</p>
                </div>
                <button
                  onClick={() => window.open(`/map-route/${property.id}`, "_blank")}
                  className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors shadow-lg active:scale-95"
                >
                  <FiNavigation /> Get Directions
                </button>
              </div>

              <div className="h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <LeafLetMap property={property} />
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR - STICKY PRICING */}
          <aside className="relative">
            <div className="sticky top-32">
              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50" />
                
                <div className="relative">
                  <div className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">Monthly Rent</div>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-black text-indigo-600">Rs. {property.price}</span>
                    <span className="text-slate-400 font-medium">/mo</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <FiCheckCircle className="text-emerald-500" /> Security Deposit Included
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <FiCheckCircle className="text-emerald-500" /> Instant Confirmation
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[1.5rem] font-bold text-lg transition-all shadow-xl shadow-indigo-200 active:scale-[0.98]"
                  >
                    Request Booking
                  </button>
                  
                  <p className="text-center text-slate-400 text-xs mt-6 px-4">
                    By clicking "Request Booking" you agree to our standard rental terms and conditions.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-2">
           <AddDetail id={property.id} />
        </div>
      </Modal>
    </main>
  );
};

export default PropertyDetails;