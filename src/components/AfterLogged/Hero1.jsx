import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import hero1 from '../../assets/images/heroupdate.png';

const Hero1 = ({ image }) => {
  const backgroundImage = image || hero1;
  const name = sessionStorage.getItem("name") || "User";

  return (
    <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background with Zoom Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Modern Gradient Overlay (Darker at bottom for readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-[#f8fafc]"></div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Welcome Tag */}
          <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Member Portal Active
          </span>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-6">
            Welcome Back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
              {name.split(" ")[0]}!
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-100 font-medium max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Your next home is waiting. Browse through your personalized 
            recommendations and find the perfect space today.
          </p>

          {/* Integrated Search Suggestion */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
               onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
               className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-orange-500 hover:text-white shadow-2xl shadow-black/20"
            >
              Start Searching <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="hidden md:flex items-center gap-2 text-white/80 font-bold text-sm bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
              <FiSearch /> 
              <span>Quick Tip: Use filters for better results</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Curve/Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8fafc] to-transparent"></div>
    </section>
  );
}

export default Hero1;