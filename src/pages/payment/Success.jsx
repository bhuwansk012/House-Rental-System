import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, ArrowLeftIcon, ReceiptIcon } from "lucide-react";
import api from "../../service/api";

const Success = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("data");

    if (encodedData) {
      try {
        const decodedString = atob(encodedData);
        const responseData = JSON.parse(decodedString);
        setTransactionData(responseData);

        const transactionId = responseData.transaction_uuid;
        const reference_id = responseData.transaction_code;
        // Send confirmation to backend
        api.post(`/payment/success?transactionId=${transactionId}`, {
          reference_id: reference_id
        });
      } catch (error) {
        console.error("Error decoding payment data:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-600 flex flex-col items-center justify-center px-4 font-sans">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10"
      >
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-linear-to-r from-green-400 to-green-600"></div>

        <div className="p-8 md:p-12 text-center">
          {/* Animated Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-green-100 rounded-full blur-md"
              ></motion.div>
              <div className="relative bg-green-100 p-6 rounded-full border-4 border-white shadow-sm">
                <CheckCircleIcon className="h-16 w-16 text-[#60bb46]" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Payment Success!
          </h2>

          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Your transaction has been processed securely. <br />
            A digital receipt has been sent to your email.
          </p>

          {/* Transaction Summary Card */}
          {transactionData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100 text-left"
            >
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-sm uppercase font-bold tracking-wider">Transaction ID</span>
                <span className="text-gray-900 font-mono text-sm">{transactionData.transaction_uuid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm uppercase font-bold tracking-wider">Reference ID</span>
                <span className="text-gray-900 font-mono text-sm">{transactionData.transaction_code}</span>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="space-y-6">
            <Link
              to="/owner/dashboard"
              className="group flex items-center justify-center gap-3 w-full bg-gray-900 hover:bg-black text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl active:scale-[0.98]"
            >
              <ArrowLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </Link>

            <div className="flex items-center justify-center gap-3">
              <div className="h-1 w-12 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#60bb46]"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 10, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Support Link */}
        <div className="bg-gray-50 py-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Having issues? <button className="text-[#60bb46] font-bold hover:underline">Contact Support</button>
          </p>
        </div>
      </motion.div>

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="mt-8 flex items-center gap-2 text-white"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em]">Secure End-to-End Encryption</span>
      </motion.div>
    </div>
  );
};

export default Success;