import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import api from "../../service/api";

const Success = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("data");

    if (encodedData) {
      try {
        const decodedString = atob(encodedData);
        const responseData = JSON.parse(decodedString);
        const transactionId = responseData.transaction_uuid;

        // Send confirmation to backend
        api.post(`/payment/success?transactionId=${transactionId}`);
      } catch (error) {
        console.error("Error decoding payment data:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
        </motion.div>

        {/* Text Content */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Received!</h2>
        <p className="text-gray-500 mb-8">
          Thank you for your payment. Your transaction has been completed successfully and a confirmation email is on its way.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Return to Home
          </Link>
          
          <p className="text-sm text-gray-400">
            Redirecting you automatically in a few seconds...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;