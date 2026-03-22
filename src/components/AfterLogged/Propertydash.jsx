import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiBox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../Card/PropertyCard";
import Button from "../Button/Button";

const Propertydash = ({ data = [] }) => {
  const navigate = useNavigate();

  // Animation variants for the grid
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-20 bg-transparent">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-2">
        <div className="max-w-xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4 bg-indigo-50 text-indigo-600 w-fit px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm"
          >
            <FiZap className="animate-pulse" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Recommendations</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-none">
            Featured <span className="text-indigo-600">Spaces</span>
          </h2>
          <p className="text-slate-500 font-medium mt-4 text-lg">
            Based on your profile, we thought you might love these hand-picked listings.
          </p>
        </div>

        <motion.button 
          whileHover={{ x: 5 }}
          onClick={() => navigate("/properties")}
          className="hidden md:flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs group"
        >
          Explore All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* --- PROPERTY GRID --- */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {data.length > 0 ? (
          data.slice(0, 3).map((item) => (
            <motion.div key={item.id} variants={itemAnim}>
              <PropertyCard item={item} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
              <FiBox size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No properties yet</h3>
            <p className="text-slate-400 mt-1">Check back later for fresh updates.</p>
          </div>
        )}
      </motion.div>

      {/* --- VIEW ALL (Mobile & Bottom Focus) --- */}
      <div className="mt-16 flex flex-col items-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-10" />
        
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <button 
            onClick={() => navigate("/properties")}
            className="relative bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all active:scale-95 shadow-2xl shadow-slate-200"
          >
            View Full Inventory
          </button>
        </div>
        
        <p className="mt-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Over 500+ properties added this week
        </p>
      </div>

    </section>
  );
};

export default Propertydash;