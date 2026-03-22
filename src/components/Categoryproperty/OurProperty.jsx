import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import Heading from '../Heading/Heading';
import PropertyCard from '../Card/PropertyCard';

const OurProperty = ({ data = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 bg-[#f8fafc] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[11px]">
              Handpicked for you
            </span>

            <div className="mt-3">
              <Heading heading="Explore our" highlighted="Latest Properties" />
            </div>
          </motion.div>

          {/* Right Button */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/properties')}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-800 px-6 py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group"
          >
            See all listings
            <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* --- GRID --- */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.length > 0 ? (
            data.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                className="hover:-translate-y-2 transition-transform duration-300"
              >
                <PropertyCard item={item} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-200 shadow-sm">

              <div className="p-4 bg-slate-100 rounded-xl mb-5">
                <FiSearch size={22} className="text-slate-400" />
              </div>

              <p className="text-slate-500 font-medium">
                Fresh listings are coming soon 
              </p>
            </div>
          )}
        </div>

        {/* --- CTA --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-900 rounded-4xl px-6 py-4 shadow-2xl">

            {/* Avatars */}
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Text */}
            <p className="text-white/70 text-sm text-center md:text-left">
              Join <span className="text-white font-bold">2,400+</span> users finding homes this month
            </p>

            {/* Button */}
            <button
              onClick={() => navigate('/properties')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-500 transition-all"
            >
              View All
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default OurProperty;