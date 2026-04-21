import React, { useEffect, useState } from "react";
import api from "../../service/api";
import { 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Info 
} from "lucide-react";

const EsewaPayment = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.post("/payment/initiate-v2", {
      amount: 120, 
    })
    .then((res) => setData(res.data))
    .catch((err) => console.error("Error fetching payment data:", err));
  }, []);

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
  };

  if (!data) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-50">
        <div className="relative flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#60bb46]"></div>
            <img src="https://esewa.com.np/common/images/esewa_logo.png" className="absolute h-4 w-auto grayscale opacity-50" alt="loading" />
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">Preparing secure checkout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans antialiased text-slate-900">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 py-4 px-8 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <img
            src="https://esewa.com.np/common/images/esewa_logo.png"
            alt="eSewa"
            className="h-8"
          />
          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>
          <span className="text-slate-500 font-medium text-sm hidden sm:block">Checkout</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
          <Info size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Test Mode</span>
        </div>
      </header>

      {/* MAIN CHECKOUT SECTION */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl grid md:grid-cols-10 bg-white rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          
          {/* LEFT PANEL: ORDER DETAILS (4/10 cols) */}
          <div className="md:col-span-4 bg-slate-900 p-8 md:p-12 text-white flex flex-col">
            <div className="mb-auto">
              <div className="inline-flex items-center gap-2 text-[#60bb46] mb-6">
                <ShieldCheck size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Verified Merchant</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-4 leading-tight">Secure <br/>Rental Payment</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Your payment is processed through eSewa's encrypted gateway. 
                Funds are held securely until the transaction is verified.
              </p>

              <div className="space-y-4">
                {[
                  "End-to-end encryption",
                  "Instant transaction updates",
                  "24/7 Fraud monitoring"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-[#60bb46]" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Lock size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">Security Standard</p>
                  <p className="text-xs font-semibold">PCI DSS Compliant</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: SUMMARY & ACTION (6/10 cols) */}
          <div className="md:col-span-6 p-8 md:p-12 bg-white">
            <div className="flex items-center gap-2 mb-8">
              <CreditCard className="text-slate-400" size={24} />
              <h3 className="text-xl font-bold text-slate-800">Order Summary</h3>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="font-bold text-slate-800">Rs. {data.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">VAT / Tax</span>
                  <span className="font-bold text-slate-800">Rs. {data.tax_amount}</span>
                </div>
                <div className="h-px bg-slate-200 my-2"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-slate-900">Total Amount</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Inclusive of all taxes</p>
                  </div>
                  <span className="text-3xl font-black text-[#60bb46]">
                    Rs. {data.total_amount}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full group relative flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-white text-lg shadow-xl shadow-green-200 transition-all duration-300
                ${
                  loading
                    ? "bg-slate-300 cursor-not-allowed shadow-none"
                    : "bg-[#60bb46] hover:bg-[#52a43b] hover:-translate-y-1 active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <>
                    <span>Pay with eSewa</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="text-center">
                <p className="text-xs text-slate-400 font-medium inline-flex items-center gap-1">
                   By clicking, you agree to our <span className="text-slate-600 underline cursor-pointer">Terms of Service</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 border-t border-slate-200 bg-white text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} RentalHub Integration • Secure Checkout
        </p>
      </footer>
    </div>
  );
};

export default EsewaPayment;