import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiMaximize2, FiArrowRight } from "react-icons/fi";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

const PropertyCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* --- IMAGE --- */}
      <div className="relative h-64 overflow-hidden">

        {/* Image */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-80" />

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow ${
              item.bookingStatus === "AVAILABLE"
                ? "bg-emerald-500/90 text-white"
                : "bg-rose-500/90 text-white"
            }`}
          >
            {item.bookingStatus}
          </span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {item.type}
          </span>
        </div>

        {/* Hover Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="bg-white p-3 rounded-full text-indigo-600 shadow-xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
            <FiMaximize2 size={20} />
          </div>
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="p-6 flex flex-col flex-grow">

        {/* Title */}
        <h2 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition">
          {item.title}
        </h2>

        {/* Location */}
        <p className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mt-2 mb-4">
          <FiMapPin className="text-indigo-500" />
          {item.tole}, {item.municipality} {item.district}
        </p>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100">
          <div className="flex flex-col items-center text-xs">
            <FaBed className="text-slate-300 group-hover:text-indigo-500 transition" />
            <span className="mt-1 font-semibold text-slate-500">
              {item.bedrooms} Bed
            </span>
          </div>

          <div className="flex flex-col items-center text-xs border-x border-slate-100">
            <FaBath className="text-slate-300 group-hover:text-indigo-500 transition" />
            <span className="mt-1 font-semibold text-slate-500">
              {item.bathrooms} Bath
            </span>
          </div>

          <div className="flex flex-col items-center text-xs">
            <FaRulerCombined className="text-slate-300 group-hover:text-indigo-500 transition" />
            <span className="mt-1 font-semibold text-slate-500">
              {item.area} ft²
            </span>
          </div>
        </div>

        {/* Price + Action */}
        <div className="mt-auto pt-5 flex justify-between items-center">

          {/* Price */}
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              Monthly Rent
            </p>
            <p className="text-xl font-extrabold text-slate-900">
              <span className="text-indigo-600">Rs.</span> {item.price}
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate(`/property-details/${item.id}`)}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition-all shadow-md active:scale-90"
          >
            <FiArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;