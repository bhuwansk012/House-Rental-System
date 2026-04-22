import React, { useEffect, useState } from "react";
import { getAllPaymentByOwner } from "../../service/paymentService";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const fetchPayments = async () => {
    try {
      const response = await getAllPaymentByOwner();
      setPayments(response.data);
      const response1=await getPaymentDetail();
      setPaymentDetail(response1.data);
      console.log("Payment details:", response1.data);

    } catch (error) {
      console.error("Something went wrong!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments =
    filter === "ALL"
      ? payments
      : payments.filter((p) => p.status === filter);

  // Helper to style filter buttons dynamically
  const getBtnClass = (current) => 
    `px-4 py-2 rounded-lg transition-colors font-medium ${
      filter === current 
        ? "bg-blue-600 text-white shadow-md" 
        : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-300"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-300 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            My Payments
          </h1>
        <div className="text-sm text-gray-500">
            Total Transactions: <span className="font-semibold text-gray-700">{payments.length}</span>
          </div>
           <div className="text-sm text-gray-500">
            Total Amount: <span className="font-semibold text-gray-700">Rs. {payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</span>
           </div>
           <div className="text-sm text-gray-500">
            Last Payment Status: <span className={`font-semibold ${paymentDetail?.status === "SUCCESS" ? "text-green-600" : "text-red-600"}`}>
              {paymentDetail ? paymentDetail.status : "N/A"}
            </span>
           </div>       

          {/* Filters */}
          <div className="flex gap-2 bg-gray-200 p-1 rounded-xl">
            <button onClick={() => setFilter("ALL")} className={getBtnClass("ALL")}>
              All
            </button>
            <button onClick={() => setFilter("SUCCESS")} className={getBtnClass("SUCCESS")}>
              Success
            </button>
            <button onClick={() => setFilter("FAILED")} className={getBtnClass("FAILED")}>
              Failed
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-gray-500">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
              <p>Loading payments...</p>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="p-20 text-center">
              <p className="text-gray-400 italic">No payment records found for "{filter}".</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">time</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{payment.propertyName}</div>
                        <div className="text-xs text-gray-400">ID: {payment.propertyId}</div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">
                        {payment.transactionId}
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">
                        {payment.referenceId}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        Rs. {payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          payment.status === "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(payment.createdAt).toLocaleTimeString(undefined, {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-500 hover:text-blue-700">
                          View Details
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;