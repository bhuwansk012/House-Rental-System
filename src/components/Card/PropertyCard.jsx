import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiMaximize2, FiArrowRight } from "react-icons/fi";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

const PropertyCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* --- IMAGE SECTION --- */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Status Badge (Top Right) */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
            item.bookingStatus === "AVAILABLE" 
              ? "bg-emerald-500/90 text-white" 
              : "bg-rose-500/90 text-white"
          }`}>
            {item.bookingStatus}
          </span>
        </div>

        {/* Property Type (Top Left) */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
            {item.type}
          </span>
        </div>

        {/* Hover Overlay Icon */}
        <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
             <div className="bg-white p-3 rounded-full text-indigo-600 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <FiMaximize2 size={20} />
             </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-black text-slate-800 tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {item.title}
            </h2>
        </div>

        <p className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
          <FiMapPin className="text-indigo-500" />
          {item.tole}, {item.municipality}
        </p>

        {/* Features Row */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-50 my-2">
          <div className="flex flex-col items-center gap-1">
            <FaBed className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] font-black text-slate-500">{item.bedrooms} Bed</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-slate-50">
            <FaBath className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] font-black text-slate-500">{item.bathrooms} Bath</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaRulerCombined className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] font-black text-slate-500">{item.area} ft²</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-6 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Monthly Rent</p>
            <p className="text-2xl font-black text-slate-800 tracking-tighter">
              <span className="text-indigo-600">Rs.</span> {item.price}
            </p>
          </div>

          <button 
            onClick={() => navigate(`/property-details/${item.id}`)}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 active:scale-90"
          >
            <FiArrowRight size={20} />
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default PropertyCard;