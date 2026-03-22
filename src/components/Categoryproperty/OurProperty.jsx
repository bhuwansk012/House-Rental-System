import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import Heading from '../Heading/Heading';
import PropertyCard from '../Card/PropertyCard';

const OurProperty = ({ data = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px]">
              Handpicked for you
            </span>
            <Heading heading="Explore our" highlighted="Latest Properties" />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/properties')}
            className="flex items-center gap-3 bg-white border border-slate-200 text-slate-800 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group"
          >
            See all listings 
            <FiArrowUpRight className="group-hover:text-indigo-600 transition-colors" />
          </motion.button>
        </div>

        {/* --- PROPERTY GRID --- */}
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.length > 0 ? (
            data.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <PropertyCard item={item} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border border-slate-100 border-dashed">
              <div className="p-5 bg-white rounded-2xl shadow-sm mb-4">
                <FiSearch size={24} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold tracking-tight">
                Fresh listings are on their way!
              </p>
            </div>
          )}
        </div>

        {/* --- FOOTER CTA --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-6 p-2 pr-8 bg-slate-900 rounded-[2.5rem] shadow-2xl">
             <div className="flex -space-x-3 pl-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    </div>
                ))}
             </div>
             <p className="text-white/70 text-sm font-medium">
               Join <span className="text-white font-black">2,400+</span> others finding homes this month
             </p>
             <button 
                onClick={() => navigate('/properties')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-500 transition-all"
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