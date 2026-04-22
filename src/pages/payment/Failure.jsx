import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, RefreshCcw, Home, AlertCircle, LifeBuoy } from "lucide-react";
import api from "../../service/api";

const Failure = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oid = params.get("oid");

    if (oid) {
      console.log("FAILED PAYMENT:", oid);
      api.post(`/payment/failed?transactionId=${oid}`).catch((err) =>
        console.error("Backend sync failed:", err)
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-600 flex flex-col items-center justify-center px-4 font-sans">
      
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-red-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          x: [0, -10, 10, -10, 10, 0] // Subtle error shake
        }}
        transition={{ duration: 0.6, times: [0, 0.1, 0.3, 0.5, 0.7, 1] }}
        className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10"
      >
        {/* Error Accent Bar */}
        <div className="h-2 w-full bg-linear-to-r from-red-400 to-red-600"></div>

        <div className="p-8 md:p-12 text-center">
          {/* Error Icon Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 bg-red-100 rounded-full blur-xl"
              ></motion.div>
              <div className="relative bg-red-50 p-6 rounded-full border-4 border-white shadow-sm">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Transaction Failed
          </h2>
          
          <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-sm mx-auto">
            We couldn't process your payment. Don't worry, no funds were permanently deducted.
          </p>

          {/* Error Details Box */}
          <div className="bg-slate-50 rounded-2xl p-5 mb-10 border border-slate-100 flex items-start gap-4 text-left">
            <AlertCircle className="text-red-400 shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">Common Reasons:</p>
              <ul className="text-xs text-slate-500 mt-1 list-disc list-inside space-y-1">
                <li>Insufficient wallet balance</li>
                <li>Transaction timed out by eSewa</li>
                <li>Network connection interrupted</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/payment" // Adjust to your checkout route
              className="group flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-red-200 active:scale-[0.98]"
            >
              <RefreshCcw className="h-5 w-5 transition-transform group-hover:rotate-180 duration-500" />
              Try Again
            </Link>

            <Link
              to="/owner/dashboard" // Adjust to your home/dashboard route
              className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-800 text-slate-700 hover:text-slate-900 font-bold py-5 px-6 rounded-2xl transition-all duration-300 active:scale-[0.98]"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-slate-50 py-6 border-t border-slate-100 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <LifeBuoy size={16} />
            <span className="text-xs font-medium">Need help with this?</span>
          </div>
          <button className="text-red-500 text-xs font-black uppercase tracking-widest hover:underline">
            Contact Support
          </button>
        </div>
      </motion.div>

      {/* Reassurance Note */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-xs text-white max-w-xs leading-relaxed"
      >
        If your account was debited, the amount will be automatically refunded within 3-5 working days as per bank policy.
      </motion.p>
    </div>
  );
};

export default Failure;