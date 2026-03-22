import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiBox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../Card/PropertyCard";

const Propertydash = ({ data = [] }) => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-[#f8fafc]">

      {/* --- WRAPPER (Fix alignment) --- */}
      <div className="max-w-7xl mx-auto px-6">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">

          {/* Left */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-5 bg-indigo-50 text-indigo-600 w-fit px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm"
            >
              <FiZap className="animate-pulse" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]">
                New Recommendations
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Featured <span className="text-indigo-600">Spaces</span>
            </h2>

            <p className="text-slate-500 mt-4 text-lg leading-relaxed">
              Hand-picked properties curated based on your activity and preferences.
            </p>
          </div>

          {/* Right */}
          <motion.button
            whileHover={{ x: 6 }}
            onClick={() => navigate("/properties")}
            className="hidden md:flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs group"
          >
            Explore All
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* --- GRID --- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {data.length > 0 ? (
            data.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                variants={itemAnim}
                className="hover:-translate-y-2 transition-transform duration-300"
              >
                <PropertyCard item={item} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 bg-white rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">

              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-5">
                <FiBox size={28} />
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                No properties available
              </h3>

              <p className="text-slate-400 mt-2 max-w-sm">
                We're updating listings. Please check again shortly.
              </p>
            </div>
          )}
        </motion.div>

        {/* --- CTA --- */}
        <div className="mt-20 flex flex-col items-center">

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-10" />

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>

            <button
              onClick={() => navigate("/properties")}
              className="relative bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all active:scale-95 shadow-xl"
            >
              View Full Inventory
            </button>
          </div>

          <p className="mt-6 text-slate-400 text-[10px] font-bold uppercase tracking-[0.35em]">
            500+ new listings this week
          </p>
        </div>

      </div>
    </section>
  );
};

export default Propertydash;