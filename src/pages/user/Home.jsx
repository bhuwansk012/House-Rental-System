import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../../components/Hero/Hero";
import OurProperty from "../../components/Categoryproperty/OurProperty";
import Aboutsection from "../../components/section/Aboutsection";
import { getAllProperties } from "../../service/publicService";
import Propertydash from "../../components/AfterLogged/Propertydash";
import Hero1 from "../../components/AfterLogged/Hero1";
import {Link} from 'react-router-dom'

const Home = () => {
  const role = sessionStorage.getItem("role");
  const isTenant = role === "TENANT";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await getAllProperties();

      const updated = response.data.map((item) => ({
        ...item,
        imageUrl: `http://localhost:8080/uploads/properties/${item.imageUrl[0]}`,
      }));

      setData(updated);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-800 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* HERO */}
      <AnimatePresence mode="wait">
        <motion.section
          key={isTenant ? "tenant-hero" : "guest-hero"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isTenant ? <Hero1 /> : <Hero />}
        </motion.section>
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* SECTION HEADER */}
        <div className="mt-20 mb-10 flex items-center gap-4">
          <div className="h-0.5 w-10 bg-indigo-600 rounded-full" />
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            Featured Listings
          </span>
        </div>

        {/* PROPERTY SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-95 bg-slate-100 animate-pulse rounded-2xl shadow-sm"
                />
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100">
                {isTenant ? (
                  <Propertydash data={data} />
                ) : (
                  <OurProperty data={data} />
                )}
              </div>

              {/* Background Glow */}
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-50 rounded-full blur-[140px] opacity-50 -z-10" />
            </div>
          )}
        </motion.div>

        {/* ABOUT SECTION */}
        <motion.section
          className="mt-28 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-linear-to-b from-transparent to-slate-200" />

          <div className="pt-20">
            <Aboutsection />
          </div>

          {/* Background Glow */}
          <div className="absolute -bottom-40 -left-32 w-112.5 h-112.5 bg-orange-50 rounded-full blur-[140px] opacity-40 -z-10" />
        </motion.section>

      </main>

      {/* FOOTER STATS BAR */}
      {!isTenant && (
        <div className="bg-slate-900 py-8 mt-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white/60 text-xs font-semibold uppercase tracking-[0.2em]">
            <p className="hover:text-white transition">Verified Owners</p>
            <p className="hover:text-white transition">Secure Payments</p>
            <p className="hover:text-white transition">24/7 Support</p>
            <p className="hover:text-white transition">Instant Booking</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;