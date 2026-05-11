import React, { useEffect, useState, useMemo } from "react";
import { getAllPayment } from "../../service/paymentService";
import {
  FaEye,
  FaTrashAlt,
  FaChartLine,
  FaShieldAlt,
  FaDownload,
  FaWallet,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [activeDetailId, setActiveDetailId] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await getAllPayment();
        setPayments(res?.data || []);
      } catch (err) {
        console.error("Failed to load payments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleDelete = (id) => {
      setPayments(payments.filter(p => p.id !== id));
  };

  const filteredPayments = useMemo(() => {
    if (filterStatus === "ALL") return payments;
    return payments.filter((p) => p.status === filterStatus);
  }, [payments, filterStatus]);

  const totalRevenue = useMemo(() => {
    return payments
      .filter((p) => p.status === "SUCCESS")
      .reduce((sum, p) => sum + (p.amount || 0), 0);
  }, [payments]);

  const pendingCount = useMemo(() => {
    return payments.filter((p) => p.status === "PENDING").length;
  }, [payments]);

  const graphData = useMemo(() => {
    return payments
      .filter((p) => p.status === "SUCCESS")
      .slice(-10)
      .map((p) => ({
        name: new Date(p.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        }),
        revenue: p.amount
      }));
  }, [payments]);

  const downloadTransactionPDF = (payment) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(16, 185, 129);
    doc.text("RentHub Official Receipt", 105, 20, { align: "center" });
    autoTable(doc, {
      startY: 40,
      head: [["Field", "Details"]],
      body: [
        ["Property", payment.propertyName || "N/A"],
        ["Transaction ID", payment.transactionId || "N/A"],
        ["Amount", `Rs. ${payment.amount || 0}`],
        ["Status", payment.status],
        ["Payer", payment.payerName || "N/A"],
        ["Date", new Date(payment.createdAt).toLocaleString()]
      ],
      theme: "grid",
      headStyles: { fillColor: [16, 185, 129] }
    });
    doc.save(`RentHub_${payment.transactionId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 text-slate-800">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg shadow-indigo-100">
                <FaShieldAlt size={22} />
              </div>
              Financial Dashboard
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Manage transactions and property revenue performance.
            </p>
          </div>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="group relative overflow-hidden rounded-3xl bg-indigo-600 p-8 text-white shadow-xl transition-all hover:shadow-indigo-200 hover:-translate-y-1">
            <FaWallet className="absolute right-[-10%] bottom-[-10%] text-white/10 group-hover:scale-110 transition-transform" size={140} />
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100 mb-2">Total Revenue</p>
            <h2 className="text-4xl font-black">Rs. {totalRevenue.toLocaleString()}</h2>
            <div className="mt-4 flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              <FaChartLine /> +12.4% this month
            </div>
          </div>

          <div className="group rounded-3xl bg-white p-8 border border-slate-200 shadow-sm transition-all hover:border-amber-200 hover:shadow-md">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-2">Pending</p>
            <h2 className="text-4xl font-black text-slate-900">{pendingCount}</h2>
            <div className="mt-4 flex items-center gap-2 text-amber-600 text-xs font-bold uppercase">
              <FaHourglassHalf className="animate-spin-slow" /> Needs Verification
            </div>
          </div>

          <div className="group rounded-3xl bg-white p-8 border border-slate-200 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-2">Total Records</p>
            <h2 className="text-4xl font-black text-slate-900">{payments.length}</h2>
            <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase">
              <FaCheckCircle /> All systems clear
            </div>
          </div>
        </div>

        {/* CHART */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-10 overflow-hidden relative">
          <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
              <div className="w-2 h-8 bg-indigo-600 rounded-full mr-1"></div>
              Revenue Flow Chart
            </h3>
            
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }} 
                   dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={4}
                  fill="url(#rev)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          
          <div className="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-slate-100 gap-4">
            <h3 className="font-bold text-lg text-slate-800">Recent Transactions</h3>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
              {["ALL", "SUCCESS", "PENDING", "FAILED"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    filterStatus === s
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 font-bold text-left">Property Details</th>
                  <th className="px-4 py-5 font-bold text-left">Transaction ID</th>
                  <th className="px-4 py-5 font-bold text-left">Amount</th>
                  <th className="px-4 py-5 font-bold text-center">Status</th>
                  <th className="px-8 py-5 font-bold text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((p) => (
                  <React.Fragment key={p.id}>
                    <tr className={`hover:bg-slate-50/80 transition-colors group ${activeDetailId === p.id ? "bg-indigo-50/30" : ""}`}>
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {p.propertyName || "Unnamed Property"}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          Payer: {p.payerName}
                        </p>
                      </td>

                      <td className="px-4 py-5">
                        <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                          {p.transactionId}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <p className="font-extrabold text-slate-900">
                          Rs. {p.amount?.toLocaleString()}
                        </p>
                      </td>

                      <td className="px-4 py-5 text-center">
                        {p.status === "SUCCESS" && (
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Completed
                          </span>
                        )}
                        {p.status === "PENDING" && (
                          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Pending
                          </span>
                        )}
                        {p.status === "FAILED" && (
                          <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Failed
                          </span>
                        )}
                      </td>

                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setActiveDetailId(activeDetailId === p.id ? null : p.id)}
                            className={`p-2 rounded-lg transition-all ${activeDetailId === p.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"}`}
                            title="View Details"
                          >
                            <FaEye size={16} />
                          </button>

                          <button
                            onClick={() => downloadTransactionPDF(p)}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Download Receipt"
                          >
                            <FaDownload size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="Delete Record"
                          >
                            <FaTrashAlt size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* ENHANCED VIEW DETAILS SECTION */}
                    {activeDetailId === p.id && (
                      <tr className="bg-indigo-50/30">
                        <td colSpan="5" className="px-8 py-6">
                          <div className="bg-white rounded-2xl p-6 shadow-inner border border-indigo-100 flex flex-col md:flex-row gap-8 items-start animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="flex-1 space-y-4">
                              <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                                <FaInfoCircle /> Transaction Information
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Transaction ID</span>
                                  <span className="text-sm font-mono text-slate-700">{p.transactionId || "N/A"}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Payment Method</span>
                                  <span className="text-sm font-bold text-slate-700">{p.paymentMethod || "Digital Transfer"}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Processed On</span>
                                  <span className="text-sm font-bold text-slate-700">{new Date(p.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Description</span>
                                  <span className="text-sm text-slate-600 italic">"{p.description || "No description provided for this transaction."}"</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 min-w-50">
                              <p className="text-[10px] uppercase font-black text-slate-400 mb-2 tracking-widest">Summary</p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Amount:</span>
                                  <span className="font-bold">Rs. {p.amount?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Fee:</span>
                                  <span className="text-rose-500 font-bold">Rs. 0.00</span>
                                </div>
                                <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between text-sm">
                                  <span className="font-bold text-slate-800">Total:</span>
                                  <span className="font-black text-indigo-600">Rs. {p.amount?.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {!loading && filteredPayments.length === 0 && (
              <div className="py-24 text-center">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-slate-200" size={30} />
                </div>
                <p className="text-slate-400 font-bold">No matching transactions found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;