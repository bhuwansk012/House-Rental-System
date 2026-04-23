import React, { useEffect, useState } from "react";
import { getAllPayment } from "../../service/paymentService";
import { 
  FaFileInvoiceDollar, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock,
  FaEye,
  FaTimes,
  FaChartLine
} from "react-icons/fa";
/* Note: You may need to install recharts: npm install recharts */
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await getAllPayment();
        setPayments(response.data || []);
      } catch (error) {
        console.error("Failed to load payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Prepare Chart Data (Grouping revenue by date)
  const chartData = payments
    .filter(p => p.status === "SUCCESS")
    .reduce((acc, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const existing = acc.find(item => item.date === date);
      if (existing) { existing.amount += curr.amount; }
      else { acc.push({ date, amount: curr.amount }); }
      return acc;
    }, []).slice(-7); // Last 7 days of activity

  const filteredPayments = filterStatus === "ALL" 
    ? payments 
    : payments.filter((p) => p.status === filterStatus);

  const totalRevenue = payments
    .filter(p => p.status === "SUCCESS")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-green-50 p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-green-900 flex items-center gap-3">
            <FaFileInvoiceDollar className="text-green-600" />
            Financial Management <span className="text-xs font-bold bg-green-600 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Admin Control</span>
          </h1>
        </div>

        {/* REVENUE GENERATED CURVE (Top Section) */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-green-100 mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-green-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <FaChartLine /> Revenue Analytics
              </p>
              <h2 className="text-2xl font-black text-green-900">Rs. {totalRevenue.toLocaleString()}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-bold uppercase">Status</p>
              <p className="text-sm font-bold text-green-600">Live Feed</p>
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0fdf4" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#86efac', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#16a34a', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-bold text-green-900">Transaction Logs</h3>
          <div className="flex gap-2 bg-green-200/40 p-1.5 rounded-2xl">
            {["ALL", "SUCCESS", "PENDING", "FAILED"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterStatus === s ? "bg-green-600 text-white shadow-md" : "text-green-700 hover:bg-green-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-green-50/50 border-b border-green-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-green-700 uppercase">Property & Owner</th>
                  <th className="px-8 py-5 text-xs font-bold text-green-700 uppercase">Transaction ID</th>
                  <th className="px-8 py-5 text-xs font-bold text-green-700 uppercase">Amount</th>
                  <th className="px-8 py-5 text-xs font-bold text-green-700 uppercase">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-green-700 uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-50">
                {filteredPayments.map((payment) => (
                  <React.Fragment key={payment.id}>
                    <tr className={`hover:bg-green-50/30 transition-colors ${activeId === payment.id ? 'bg-green-50' : ''}`}>
                      <td className="px-8 py-6">
                        <p className="font-bold text-green-900">{payment.propertyName || "N/A"}</p>
                        <p className="text-xs text-green-600 font-medium">Owner: {payment.ownerName || 'Admin'}</p>
                      </td>
                      <td className="px-8 py-6 font-mono text-sm text-slate-400">{payment.transactionId}</td>
                      <td className="px-8 py-6">
                        <span className="text-lg font-black text-green-900">Rs. {payment.amount?.toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          payment.status === "SUCCESS" ? "bg-green-100 text-green-700" : 
                          payment.status === "PENDING" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                        }`}>
                          {payment.status === "SUCCESS" ? <FaCheckCircle /> : 
                           payment.status === "PENDING" ? <FaClock /> : <FaTimesCircle />}
                          {payment.status}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button 
                          onClick={() => setActiveId(activeId === payment.id ? null : payment.id)}
                          className={`p-2.5 rounded-xl transition-all ${activeId === payment.id ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white'}`}
                        >
                          {activeId === payment.id ? <FaTimes /> : <FaEye />}
                        </button>
                      </td>
                    </tr>

                    {/* Detailed View for Admin */}
                    {activeId === payment.id && (
                      <tr>
                        <td colSpan="5" className="px-8 py-8 bg-green-50/20">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-300">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">Payer Information</p>
                              <p className="text-sm text-green-900 font-bold">{payment.payerName || "Guest User"}</p>
                              <p className="text-xs text-slate-500">Ref: {payment.referenceId || "Direct"}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">Property Metadata</p>
                              <p className="text-sm text-green-900 font-bold">ID: #{payment.propertyId}</p>
                              <p className="text-xs text-slate-500">Location: Internal Records</p>
                            </div>
                            <div className="space-y-1 text-right">
                              <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">Settlement Date</p>
                              <p className="text-sm text-green-900 font-bold">{new Date(payment.createdAt).toLocaleString()}</p>
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
        </div>
      </div>
    </div>
  );
};

export default Payments;