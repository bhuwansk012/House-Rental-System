import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../../components/Hero/Hero";
import OurProperty from "../../components/Categoryproperty/OurProperty";
import Aboutsection from "../../components/section/Aboutsection";
import { getAllProperties } from "../../service/publicService";
import Propertydash from "../../components/AfterLogged/Propertydash";
import Hero1 from "../../components/AfterLogged/Hero1";

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
        imageUrl: `http://localhost:8080/uploads/properties/${item.imageUrl}`,
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
    <div className="min-h-screen bg-[#fcfcfd] selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* --- DYNAMIC HERO SECTION --- */}
      <AnimatePresence mode="wait">
        <motion.section
          key={isTenant ? "tenant-hero" : "guest-hero"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isTenant ? <Hero1 /> : <Hero />}
        </motion.section>
      </AnimatePresence>

      {/* --- PROPERTY LISTINGS SECTION --- */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 pb-24">
        
        {/* Section Heading Decor */}
        <div className="flex items-center gap-4 mb-12 mt-20">
          <div className="h-[2px] w-12 bg-indigo-600 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            Featured Listings
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[400px] bg-slate-100 animate-pulse rounded-[2.5rem]" />
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Conditional Rendering of Property Components */}
              {isTenant ? (
                <Propertydash data={data} />
              ) : (
                <OurProperty data={data} />
              )}
              
              {/* Subtle Background Glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] -z-10 opacity-60" />
            </div>
          )}
        </motion.div>

        {/* --- ABOUT SECTION --- */}
        <motion.section 
          className="mt-32 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Decorative Divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-slate-200" />
          
          <div className="pt-24">
            <Aboutsection />
          </div>

          {/* Bottom Glow */}
          <div className="absolute -bottom-48 -left-24 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[150px] -z-10 opacity-40" />
        </motion.section>

      </main>

      {/* --- QUICK STATS FOOTER BAR (Optional Accent) --- */}
      {!isTenant && (
        <div className="bg-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 text-white/50 font-bold text-xs uppercase tracking-[0.2em]">
            <p className="hover:text-white transition-colors">Verified Owners</p>
            <p className="hover:text-white transition-colors">Secure Payments</p>
            <p className="hover:text-white transition-colors">24/7 Support</p>
            <p className="hover:text-white transition-colors">Instant Booking</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;