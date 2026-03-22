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

    if (!email) {
      return toast.error("Please enter your email address");
    }

    setLoading(true);

    try {
      // Simulated API call
      setTimeout(() => {
        setIsSubmitted(true);
        setLoading(false);
        toast.success("Reset link sent to your email!");
      }, 1200);
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
        className="w-full max-w-md"
      >

        {/* CARD */}
        <div className="relative bg-white rounded-3xl shadow-xl border border-white p-8 md:p-10 overflow-hidden">

          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-50 rounded-full blur-3xl opacity-40" />

          <AnimatePresence mode="wait">

            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -15 }}
              >

                {/* HEADER */}
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <FiSend size={24} />
                  </div>

                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                    Forgot <span className="text-indigo-600">Password?</span>
                  </h1>

                  <p className="text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                    Enter your email address and we’ll send you a secure reset link.
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Email Address
                    </label>

                    <div className="relative group">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition" />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-2xl font-semibold text-sm hover:bg-indigo-600 transition active:scale-[0.98] disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Reset Link
                      </>
                    )}
                  </button>

                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >

                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <FiCheckCircle size={32} />
                </div>

                <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">
                  Check your email
                </h2>

                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  We’ve sent a password reset link to:
                  <br />
                  <span className="text-slate-900 font-semibold break-all">
                    {email}
                  </span>
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-indigo-600 font-semibold text-sm hover:underline"
                >
                  Didn’t receive it? Try again
                </button>

              </motion.div>
            )}

          </AnimatePresence>

          {/* BACK TO LOGIN */}
          <div className="mt-8 pt-5 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-slate-500 text-sm font-semibold hover:text-slate-800 transition group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>

        </div>

        {/* FOOTER */}
        <p className="text-center mt-6 text-[11px] font-bold tracking-widest uppercase text-slate-400">
          Secure Authentication System
        </p>

      </motion.div>
    </div>
  );
};

export default Forget;