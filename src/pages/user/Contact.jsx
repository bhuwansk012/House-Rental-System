import React from "react";
import { motion } from "framer-motion";
import { 
  FaPhoneAlt, FaEnvelope, FaWhatsapp, 
  FaFacebook, FaMapMarkerAlt, FaTwitter 
} from "react-icons/fa";
import { FiSend, FiArrowUpRight } from "react-icons/fi";

const Contact = () => {
  const contactMethods = [
    { icon: <FaEnvelope />, label: "Email", value: "support@houserent.com", link: "mailto:support@houserent.com" },
    { icon: <FaPhoneAlt />, label: "Phone", value: "+977 1 4567890", link: "tel:+97714567890" },
    { icon: <FaWhatsapp />, label: "WhatsApp", value: "+977 98XXXXXXXX", link: "https://wa.me/97798XXXXXXXX" },
  ];

  return (
    <div className="h-screen w-full bg-slate-950 flex overflow-hidden relative">
      
      {/* --- BACKGROUND DESIGN ELEMENTS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row">
        
        {/* --- LEFT SECTION: BRAND & INFO (40%) --- */}
        <div className="lg:w-[40%] h-full p-12 lg:p-20 flex flex-col justify-between bg-slate-900/50 backdrop-blur-3xl border-r border-white/5">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black">H</div>
              <span className="text-white font-black tracking-tighter text-xl">HouseRent</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter"
            >
              Get in <span className="text-indigo-500">touch</span> with our experts.
            </motion.h1>

            <p className="text-slate-400 text-lg font-medium max-w-sm">
              Whether you're looking for a new home or listing your property, we're here to help you every step of the way.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Fast Connect</p>
            <div className="flex flex-col gap-4">
              {contactMethods.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  whileHover={{ x: 10 }}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                      <p className="text-white font-bold">{item.value}</p>
                    </div>
                  </div>
                  <FiArrowUpRight className="text-slate-600 group-hover:text-indigo-500 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
             <FaFacebook className="text-slate-500 hover:text-white cursor-pointer text-xl transition-colors" />
             <FaTwitter className="text-slate-500 hover:text-white cursor-pointer text-xl transition-colors" />
          </div>
        </div>

        {/* --- RIGHT SECTION: INTERACTIVE FORM (60%) --- */}
        <div className="lg:w-[60%] h-full flex items-center justify-center p-8 lg:p-20 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl p-10 lg:p-16 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden group"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />

            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] ml-1">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] ml-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all font-medium"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] ml-1">Nature of Inquiry</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500 transition-all font-medium appearance-none">
                  <option className="bg-slate-900">General Inquiry</option>
                  <option className="bg-slate-900">Property Support</option>
                  <option className="bg-slate-900">Owner Partnership</option>
                  <option className="bg-slate-900">Other</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] ml-1">How can we help?</label>
                <textarea 
                  rows="4" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500 transition-all font-medium resize-none"
                  placeholder="Describe your request in detail..."
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-6 rounded-[2rem] transition-all flex items-center justify-center gap-4 group cursor-pointer shadow-xl shadow-indigo-600/20"
              >
                DISPATCH MESSAGE 
                <FiSend className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
              </motion.button>
              
              <div className="flex items-center justify-center gap-2 opacity-30">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Support Response: &lt; 2hrs</span>
              </div>
            </form>
          </motion.div>
        </div>

      </div>
    </div >
  );
};

export default Contact;