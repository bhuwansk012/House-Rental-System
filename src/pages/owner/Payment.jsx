import React, { useEffect, useState } from "react";
import { getAllPaymentByOwner } from "../../service/paymentService";
import { 
  FaEye, 
  FaDownload, 
  FaTimes, 
  FaCheckCircle, 
  FaExclamationCircle 
} from "react-icons/fa";
import { jsPDF } from "jspdf";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [activeId, setActiveId] = useState(null);

  // 1. Fetch Data
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await getAllPaymentByOwner();
      setPayments(response.data || []);
      console.log("Fetched payments:", response.data);
    } catch (error) {
      console.error("Failed to load payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // 2. Logic for filtering and totals
  const filteredPayments = filter === "ALL" 
    ? payments 
    : payments.filter((p) => p.status === filter);

  const totalSuccessful = payments
    .filter(p => p.status === "SUCCESS")
    .reduce((sum, p) => sum + p.amount, 0);

  // 3. PDF Generator (Individual Receipt)
  const downloadReceipt = (payment) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(30, 58, 138); // Blue-900
    doc.text("PAYMENT RECEIPT-RentHub", 105, 30, { align: "center" });
    
    // Divider
    doc.setDrawColor(200);
    doc.line(20, 35, 190, 35);
    
    // Body Details
    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.setFont("helvetica", "normal");

    const data = [
      ["Property", payment.propertyName],
      ["Property ID", `#${payment.propertyId}`],    
      ["Transaction ID", payment.transactionId],
      ["Reference ID", payment.referenceId || "N/A"],
      ["Amount", `Rs. ${payment.amount.toLocaleString()}`],
      ["Status", payment.status],
      ["Payment by", payment.payName || "N/A"],
      ["Payment To", payment.payTo || "N/A"],
      ["Date", new Date(payment.createdAt).toLocaleDateString()],
      ["Time", new Date(payment.createdAt).toLocaleTimeString()],
    ];

    let y = 50;
    data.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 25, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${value}`, 70, y);
      y += 12;
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Generated via Property Management Portal", 105, 280, { align: "center" });
    
    doc.save(`Receipt_${payment.transactionId}.pdf`);
  };

  // 4. CSV Generator (Export Table)
  

  const getBtnClass = (current) => 
    `px-4 py-2 rounded-lg transition-all font-medium text-sm ${
      filter === current 
        ? "bg-blue-600 text-white shadow-md" 
        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Payments</h1>
            <p className="text-slate-500 mt-2">
              Viewing <span className="font-bold text-slate-700">{filteredPayments.length}</span> transactions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">Rs. {totalSuccessful.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 bg-slate-200 p-1.5 rounded-2xl w-fit mb-6">
          {["ALL", "SUCCESS", "FAILED"].map((status) => (
            <button key={status} onClick={() => setFilter(status)} className={getBtnClass(status)}>
              {status === "ALL" ? "All Activity" : status}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-32 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-500 font-medium">Syncing with bank records...</p>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="p-32 text-center text-slate-400 italic">
              No transactions found under this category.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Property</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Reference</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredPayments.map((payment) => (
                    <React.Fragment key={payment.id}>
                      <tr className={`group transition-colors ${activeId === payment.id ? "bg-blue-50/40" : "hover:bg-slate-50/80"}`}>
                        <td className="px-8 py-6">
                          <p className="font-bold text-slate-800">{payment.propertyName}</p>
                          <p className="text-xs text-slate-400 mt-1 font-mono">#{payment.propertyId}</p>
                        </td>
                        <td className="px-8 py-6 font-mono text-sm text-slate-500">
                          {payment.transactionId}
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-lg font-extrabold text-slate-900">Rs. {payment.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`flex items-center gap-2 w-fit px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                            payment.status === "SUCCESS" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}>
                            {payment.status === "SUCCESS" ? <FaCheckCircle /> : <FaExclamationCircle />}
                            {payment.status}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500 leading-tight">
                          <div className="font-semibold">{new Date(payment.createdAt).toLocaleDateString()}</div>
                          <div className="text-xs opacity-60">{new Date(payment.createdAt).toLocaleTimeString()}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex justify-center gap-2">
                            <button 
                              onClick={() => setActiveId(activeId === payment.id ? null : payment.id)}
                              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            >
                              {activeId === payment.id ? <FaTimes /> : <FaEye />}
                            </button>
                            <button 
                              onClick={() => downloadReceipt(payment)}
                              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                            >
                              <FaDownload />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Detail View */}
                      {activeId === payment.id && (
                        <tr>
                          <td colSpan="6" className="px-8 py-8 bg-slate-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-in slide-in-from-top-1 duration-200">
                              <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Reference ID</p>
                                <p className="text-sm font-mono break-all text-slate-700">{payment.referenceId || "Internal System Entry"}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Property-name</p>
                                <p className="text-sm text-slate-700 font-medium">{payment.propertyName || "N/A"}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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