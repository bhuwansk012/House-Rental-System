import React from 'react';
import { motion } from 'framer-motion';

const Heading = ({ heading, highlighted }) => {
  return (
    <div className="relative text-center mb-20 px-4">

      {/* --- BACKGROUND TEXT (Cleaner & Softer) --- */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none">
        <span className="text-6xl md:text-8xl font-extrabold text-slate-200/30 uppercase tracking-widest">
          {highlighted}
        </span>
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-3xl">
          {heading}{" "}
          <span className="relative inline-block">
            
            {/* Gradient Text */}
            <span className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {highlighted}
            </span>

            {/* Underline Highlight */}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute left-0 bottom-1 w-full h-3 bg-indigo-100 rounded-full origin-left -z-0"
            />
          </span>
        </h1>

        {/* Decorative Line */}
        <div className="flex items-center gap-2 mt-6">
          <div className="h-1 w-10 bg-indigo-600 rounded-full" />
          <div className="h-1 w-3 bg-indigo-300 rounded-full" />
          <div className="h-1 w-1 bg-indigo-200 rounded-full" />
        </div>

        {/* Subtext */}
        <p className="mt-4 text-slate-500 text-xs font-semibold uppercase tracking-[0.35em]">
          Handpicked Selection
        </p>
      </motion.div>
    </div>
  );
};

export default Heading;