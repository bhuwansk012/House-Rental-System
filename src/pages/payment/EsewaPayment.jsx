import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initiatePayment } from "../../service/paymentService";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Info,
  Building2,
  Receipt,
  ChevronRight,
  Wallet,
} from "lucide-react";

const EsewaPayment = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPaymentData = async () => {
    try {
      if (!id) return;
      const paymentResponse = await initiatePayment(id);
      setData(paymentResponse.data);
      console.log("Payment initiation data:", paymentResponse.data);
    } catch (err) {
      console.error("Error fetching payment data:", err);
      setError("Failed to load payment data. Please try again.");
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data) return;

    setLoading(true);

    const formData = {
      amount: data.amount,
      tax_amount: data.tax_amount,
      total_amount: data.total_amount,
      transaction_uuid: data.transaction_uuid,
      product_code: data.product_code,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: "http://localhost:5173/success",
      failure_url: "http://localhost:5173/failure",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: data.signature,
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    Object.keys(formData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = formData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-600 flex flex-col justify-center items-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="text-red-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="w-full py-3 bg-gray-800 text-white rounded-xl font-semibold">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Loading State
  if (!data) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-600">
        <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white opacity-20"></div>
            <div className="absolute inset-0 animate-spin-slow rounded-full h-20 w-20 border-r-4 border-[#60bb46]"></div>
        </div>
        <p className="mt-6 text-white font-light text-lg tracking-widest">ESTABLISHING SECURE CONNECTION</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-600 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Checkout Container */}
      <div className="w-full max-w-4xl bg-white rounded-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-125">
        
        {/* Left Sidebar - Transaction Details */}
        <div className="md:w-5/12 bg-gray-900 p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#60bb46] mb-8">
              <ShieldCheck size={24} />
              <span className="font-bold tracking-tight text-sm uppercase">Secure Checkout</span>
            </div>
            
            <h2 className="text-3xl font-light mb-2">Payment <br /><span className="font-bold">Summary</span></h2>
            <div className="h-1 w-12 bg-[#60bb46] mb-8"></div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Building2 className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-xs text-gray-400 uppercase">Property Details</p>
                  <p className="text-lg font-medium">{data.propertyName || "Product Purchase"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Receipt className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-xs text-gray-400 uppercase">Transaction ID</p>
                  <p className="text-sm font-mono text-gray-300">{data.transaction_uuid.split('-')[0]}...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-400 uppercase">Total Payable</p>
                <p className="text-3xl font-bold text-white">Rs. {data.total_amount}</p>
              </div>
              <Lock className="text-gray-600" size={24} />
            </div>
          </div>
        </div>

        {/* Right Section - Action Area */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-10">
            <img
              src="https://esewa.com.np/common/images/esewa_logo.png"
              alt="eSewa"
              className="h-10 object-contain"
            />
            <div className="bg-amber-50 border border-amber-100 px-3 py-1 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Sandbox Mode</span>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex justify-between text-gray-600 pb-3 border-b border-gray-100">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">Rs. {data.amount}</span>
            </div>
            <div className="flex justify-between text-gray-600 pb-3 border-b border-gray-100">
              <span>Service Tax</span>
              <span className="font-semibold text-gray-900">Rs. {data.tax_amount}</span>
            </div>
            <div className="flex justify-between text-lg pt-2">
              <span className="font-bold text-gray-900">Total Amount</span>
              <span className="font-black text-[#60bb46]">Rs. {data.total_amount}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#60bb46] p-4 text-white transition-all hover:bg-[#52a43b] active:scale-[0.98] disabled:opacity-70"
            >
              <div className="relative z-10 flex items-center justify-center gap-3 font-bold text-lg">
                {loading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Redirecting to eSewa...</span>
                  </>
                ) : (
                  <>
                    <Wallet size={20} />
                    <span>Pay with eSewa</span>
                    <ChevronRight className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-gray-400 flex items-center justify-center gap-2">
            <Lock size={12} />
            Your payment is encrypted and securely processed by eSewa.
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-8 flex items-center gap-6 text-gray-300 opacity-60">
          <div className="flex items-center gap-1">
              <CreditCard size={14} />
              <span className="text-[10px] uppercase font-semibold">Secure SSL</span>
          </div>
          <div className="flex items-center gap-1">
              <ShieldCheck size={14} />
              <span className="text-[10px] uppercase font-semibold">Verified Merchant</span>
          </div>
      </div>
    </div>
  );
};

export default EsewaPayment;