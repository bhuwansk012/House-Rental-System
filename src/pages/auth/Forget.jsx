import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiArrowLeft, FiSend, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email address");

    setLoading(true);
    try {
      // Logic for forgot password API call would go here
      // await forgetPassword(email);
      
      // Simulating API delay
      setTimeout(() => {
        setIsSubmitted(true);
        setLoading(false);
        toast.success("Reset link sent to your email!");
      }, 1500);
    } catch (error) {
      toast.error("Failed to send reset link. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* --- CARD --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-white p-10 relative overflow-hidden">
          
          {/* Decorative Background Blob */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-indigo-50 rounded-full opacity-50 blur-3xl" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* ICON & TITLE */}
                <div className="mb-8 text-center">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-50">
                    <FiSend size={28} />
                  </div>
                  <h1 className="text-3xl font-black text-slate-800 tracking-tight">Forgot <span className="text-indigo-600">Password?</span></h1>
                  <p className="text-slate-500 mt-2 font-medium">No worries! Enter your email and we'll send you a recovery link.</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full pl-11 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700"
                        required
                      />
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-600 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-50">
                  <FiCheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Check your email</h2>
                <p className="text-slate-500 mt-3 font-medium px-4">
                  We've sent a password recovery link to: <br/>
                  <span className="text-slate-900 font-bold italic">{email}</span>
                </p>
                
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-indigo-600 font-bold text-sm hover:underline cursor-pointer"
                >
                  Didn't get the email? Try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BACK TO LOGIN */}
          <div className="mt-10 pt-6 border-t border-slate-50 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-slate-800 transition-colors group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>
        </div>

        {/* FOOTER HINT */}
        <p className="text-center mt-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
          Secure Authentication System
        </p>
      </motion.div>
    </div>
  );
};

export default Forget;