import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircleIcon, ArrowPathIcon, HomeIcon } from "@heroicons/react/24/outline";
import api from "../../service/api";

const Failure = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oid = params.get("oid");
    const refId = params.get("refId");
    const status = params.get("status");

    if (oid) {
      console.log("FAILED PAYMENT:", oid);
      // Notify backend about the failure
      api.post(`/payment/failed?transactionId=${oid}`).catch(err => 
        console.error("Backend sync failed:", err)
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl shadow-red-100 border border-red-50 text-center"
      >
        {/* Animated Error Icon */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [-10, 10, -10, 10, 0] }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-red-50 p-5 rounded-full">
            <XCircleIcon className="h-16 w-16 text-red-500" />
          </div>
        </motion.div>

        {/* Content */}
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Payment Failed</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          We couldn't process your transaction. This might be due to insufficient funds, 
          a timeout, or a canceled request.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/payment" // Adjust this to your checkout/payment route
            className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-red-200 active:scale-[0.98]"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Try Again
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-semibold py-4 px-6 rounded-2xl transition-all"
          >
            <HomeIcon className="h-5 w-5" />
            Go to Homepage
          </Link>
        </div>

        {/* Support Note */}
        <p className="mt-8 text-sm text-slate-400">
          If money was deducted from your account, <br />
          it will be refunded within 3-5 business days.
        </p>
      </motion.div>
    </div>
  );
};

export default Failure;