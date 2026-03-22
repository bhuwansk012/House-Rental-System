import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRocket, FaEye, FaBullseye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-white overflow-hidden">

      {/* --- HERO --- */}
      <section className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs"
          >
            Our Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-800 tracking-tighter mt-4"
          >
            Redefining the{" "}
            <span className="text-orange-500">Rental Experience.</span>
          </motion.h1>
        </div>
      </section>

      {/* --- WHO WE ARE --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-50 rounded-full -z-10" />

          <h2 className="text-4xl font-black mb-8 text-slate-800 tracking-tight leading-tight">
            Connecting Owners & Tenants <br />
            with{" "}
            <span className="text-orange-500 underline decoration-4 underline-offset-8">
              Absolute Trust
            </span>
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            RentHouse is more than just a listing site. We are a modern rental
            platform engineered to eliminate the stress of finding a home.
          </p>

          <p className="text-slate-600 text-lg leading-relaxed">
            By digitizing the evaluation process and verifying every property,
            we ensure that what you see is exactly what you get. No surprises,
            just keys.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80"
            alt="Modern Architecture"
            className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
          />

          <div className="absolute -bottom-6 -right-6 hidden md:block bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50">
            <p className="text-4xl font-black text-orange-500">10k+</p>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              Happy Tenants
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- CORE PILLARS --- */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Mission */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <FaBullseye size={24} />
              </div>

              <h3 className="text-2xl font-bold">Our Mission</h3>

              <p className="text-slate-400 leading-relaxed">
                To make the rental process efficient, reliable, and accessible
                by leveraging modern technology and verified property data.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FaEye size={24} />
              </div>

              <h3 className="text-2xl font-bold">Our Vision</h3>

              <p className="text-slate-400 leading-relaxed">
                We envision a rental ecosystem where finding and managing a home
                is simple, data-driven, and completely stress-free.
              </p>
            </motion.div>

            {/* Strategy */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <FaRocket size={24} />
              </div>

              <h3 className="text-2xl font-bold">What We Do</h3>

              <p className="text-slate-400 leading-relaxed">
                We bridge the gap between property owners and seekers through a
                secure platform built on transparency and communication.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="text-3xl font-black text-center mb-16 text-slate-800 tracking-tight"
          >
            The RentHouse Advantage
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Discover verified rental properties with accurate details",
              "Compare properties by location, pricing, and amenities",
              "Communicate directly with property owners",
              "Make informed rental decisions with confidence",
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50 hover:bg-orange-50 transition-colors group"
              >
                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-orange-500 transition-all">
                  <FaCheckCircle className="text-orange-500 group-hover:text-white" />
                </div>

                <p className="text-slate-700 font-bold text-sm tracking-tight">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- CTA --- */}
      <section className="px-6 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-10 py-16 text-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-[3rem] shadow-2xl shadow-orange-200"
        >
          <h2 className="text-4xl font-black mb-4 text-white tracking-tighter">
            Start Your Journey with Confidence
          </h2>

          <p className="mb-10 text-orange-50 font-medium text-lg max-w-2xl mx-auto">
            Whether you're looking for a cozy studio or a luxury villa, your
            perfect match is just a click away.
          </p>

          <button
            onClick={() => navigate("/properties")}
            className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Explore Properties
          </button>
        </motion.div>
      </section>

    </main>
  );
};

export default About;