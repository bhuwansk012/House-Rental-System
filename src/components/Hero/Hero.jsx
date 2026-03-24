import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiHome, FiShield } from "react-icons/fi";
import hero from "../../assets/images/hiro1.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-10 md:pt-0">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT CONTENT --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left space-y-8"
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl shadow-sm">
            <FiShield className="text-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Verified Properties Only
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1]">
            Find Your <br />
            <span className="text-indigo-600">Dream Home</span> <br />
            In Minutes.
          </h1>

          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Skip the stress of house hunting. Access thousands of verified 
            listings, connect with trusted owners, and book your home with 100% security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-95 group"
            >
              Get Started <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/properties"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-800 px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all active:scale-95"
            >
              Explore Listings
            </Link>
          </div>

          {/* Mini Stats Grid */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-50">
            <div>
              
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Listings</p>
            </div>
            <div>
              
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Happy Tenants</p>
            </div>
            <div>
              
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Security</p>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT IMAGE SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group"
        >
          {/* Main Image with decorative frame */}
          <div className="relative z-10 rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl">
            <img
              src={hero}
              alt="Luxury Living Space"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-[2s]"
            />
          </div>

          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 z-20 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                <FiHome size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800">New Apartment</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Just Listed</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <FiCheckCircle size={20} />
              </div>
              <p className="text-xs font-black text-slate-800 uppercase tracking-widest">Owner Verified</p>
            </div>
          </motion.div>

          {/* Background Shape */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 bg-indigo-600 rounded-[3rem] -z-10 opacity-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;