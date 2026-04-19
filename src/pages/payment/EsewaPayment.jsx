import React, { useEffect, useState } from "react";
import api from "../../service/api";

const EsewaPayment = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initiate payment on component mount
    api.post("/payment/initiate-v2", {
      amount: 120, // You can make this dynamic based on props
    })
    .then((res) => setData(res.data))
    .catch((err) => console.error("Error fetching payment data:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data) return;
    
    setLoading(true);

    // Fields must exactly match the signed_field_names and backend signature
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

    // Create a hidden form and submit it
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
      <div className="flex justify-center items-center min-h-75">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#60bb46]"></div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex flex-col">

    {/* HEADER */}
    <header className="bg-[#60bb46] shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img
          src="https://esewa.com.np/common/images/esewa_logo.png"
          alt="eSewa"
          className="h-10 brightness-0 invert"
        />
        <span className="text-white font-semibold text-lg">Secure Payment</span>
      </div>
      <span className="text-white text-sm">Test Environment</span>
    </header>

    {/* MAIN CONTENT */}
    <div className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT SIDE (INFO) */}
        <div className="bg-[#60bb46] text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Complete Your Payment</h2>
            <p className="text-sm opacity-90">
              You are securely paying through eSewa. Please confirm your details before proceeding.
            </p>
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <p>✔ Secure encrypted transaction</p>
            <p>✔ Instant confirmation</p>
            <p>✔ Trusted by millions</p>
          </div>
        </div>

        {/* RIGHT SIDE (PAYMENT CARD) */}
        <div className="p-8 flex flex-col justify-center">

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Payment Summary
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-600">
              <span>Amount</span>
              <span className="font-semibold text-gray-900">Rs. {data.amount}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span className="font-semibold text-gray-900">Rs. {data.tax_amount}</span>
            </div>

            <div className="pt-4 border-t flex justify-between">
              <span className="text-lg font-bold text-gray-800">
                Total Payable
              </span>
              <span className="text-xl font-black text-[#60bb46]">
                Rs. {data.total_amount}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-200
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#60bb46] hover:bg-[#4aa63a] active:scale-95"
              }`}
            >
              {loading ? "Processing..." : "Pay with eSewa"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            Powered securely by eSewa Payment Gateway
          </p>
        </div>
      </div>
    </div>

    {/* FOOTER */}
    <footer className="text-center py-4 text-xs text-gray-400">
      © {new Date().getFullYear()} eSewa Test Integration
    </footer>
  </div>
);
};

export default EsewaPayment;