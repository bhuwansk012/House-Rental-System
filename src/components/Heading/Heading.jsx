import React from 'react';
import { motion } from 'framer-motion';

const Heading = ({ heading, highlighted }) => {
  return (
    <div className="relative text-center mb-16 px-4">
      {/* --- BACKGROUND DECOR (Optional "Ghost" Text) --- */}
      <div className="absolute inset-0 flex items-center justify-center -top-8 -z-10 select-none pointer-events-none">
        <span className="text-7xl md:text-9xl font-black text-slate-50/80 uppercase tracking-widest opacity-50">
          {highlighted}
        </span>
      </div>

      {/* --- MAIN HEADING --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter leading-tight">
          {heading}{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {highlighted}
            </span>
            {/* Subtle highlight stroke under the word */}
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-2 left-0 h-3 bg-indigo-100/60 -z-0 rounded-full"
            />
          </span>
        </h1>

        {/* --- DECORATIVE UNDERLINE --- */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-1.5 w-12 bg-indigo-600 rounded-full" />
          <div className="h-1.5 w-3 bg-indigo-200 rounded-full" />
          <div className="h-1.5 w-1.5 bg-indigo-100 rounded-full" />
        </div>
        
        <p className="mt-4 text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]">
          Handpicked Selection
        </p>
      </motion.div>
    </div>
  );
};

export default Heading;