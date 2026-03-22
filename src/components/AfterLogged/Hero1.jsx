import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import hero1 from '../../assets/images/heroupdate.png';

const Hero1 = ({ image }) => {
  const backgroundImage = image || hero1;
  const name = sessionStorage.getItem("name") || "User";

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">

      {/* Background */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/20 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center"
        >

          {/* Badge */}
          <span className="mb-6 inline-block bg-white/10 backdrop-blur-lg border border-white/20 text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.35em] uppercase shadow-lg">
            Member Portal Active
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Welcome Back,
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
              {name.split(" ")[0]} 👋
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover your next perfect home with personalized recommendations, 
            smart filters, and seamless browsing experience.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">

            {/* Primary Button */}
            <button
              onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
              className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold tracking-widest text-xs uppercase transition-all duration-300 hover:bg-orange-500 hover:text-white hover:scale-105 shadow-xl"
            >
              Start Searching
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>

            {/* Tip Box */}
            <div className="hidden md:flex items-center gap-3 text-white/90 text-sm bg-white/10 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/20 shadow-md">
              <FiSearch className="text-orange-300" />
              <span className="font-medium">
                Tip: Use filters to find better results faster
              </span>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-[#f8fafc] to-transparent" />

    </section>
  );
};

export default Hero1;