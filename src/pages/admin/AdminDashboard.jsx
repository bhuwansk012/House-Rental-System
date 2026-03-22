import React, { useEffect, useState } from "react";
import { FiUsers, FiHome, FiKey, FiCalendar, FiActivity, FiTrendingUp, FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getAdminData } from "../../service/adminService";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid
} from "recharts";

const COLORS = ["#f43f5e", "#10b981"];
const GRADIENTS = {
  blue: "from-blue-500 to-indigo-600",
  emerald: "from-emerald-400 to-teal-500",
  violet: "from-violet-500 to-purple-600",
  amber: "from-orange-400 to-amber-500",
};

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getAdminData();
        setDashboardData(data);
      } catch (error) {
        toast.error("Failed to load dashboard metrics");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // --- PDF GENERATION FUNCTION ---
  const generatePDFReport = () => {
    if (!dashboardData) return toast.error("No data to export");

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Indigo 600
    doc.text("System Analytics Report", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${date}`, 14, 28);
    doc.text("Confidential - Internal Use Only", 14, 33);

    // Table
    const tableRows = [
      ["Total Tenants", dashboardData.totalTenants || 0],
      ["Total Owners", dashboardData.totalOwners || 0],
      ["Total Properties", dashboardData.totalProperties || 0],
      ["Total Bookings", dashboardData.totalBookings || 0],
      ["Occupied Units", dashboardData.bookedProperties || 0],
      ["Available Units", dashboardData.availableProperties || 0],
    ];

    doc.autoTable({
      head: [["Metric Category", "Current Value"]],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] },
      styles: { cellPadding: 5 }
    });

    doc.save(`Analytics_Report_${date.replace(/\//g, '-')}.pdf`);
    toast.success("PDF Report Downloaded");
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-slate-50">
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <FiActivity className="absolute text-indigo-600 animate-pulse" size={24} />
        </div>
        <p className="mt-4 text-slate-500 font-semibold tracking-wide uppercase text-xs">Syncing Ecosystem...</p>
      </div>
    );
  }

  const data = dashboardData || {};

  const stats = [
    { title: "Tenants", value: data.totalTenants || 0, icon: <FiUsers />, color: GRADIENTS.blue },
    { title: "Owners", value: data.totalOwners || 0, icon: <FiKey />, color: GRADIENTS.emerald },
    { title: "Properties", value: data.totalProperties || 0, icon: <FiHome />, color: GRADIENTS.violet },
    { title: "Bookings", value: data.totalBookings || 0, icon: <FiCalendar />, color: GRADIENTS.amber },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="p-6 md:p-10 bg-[#f8fafc] min-h-screen font-sans text-slate-900"
    >
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">
            <span className="w-8 h-[2px] bg-indigo-600"></span> System Overview
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Analytics</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <button 
            onClick={generatePDFReport}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <FiDownload /> Export PDF
          </button>
        </div>
      </header>

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[2rem] p-7 shadow-xl shadow-slate-200/50 border border-white overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-[0.04] rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500`} />
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                {React.cloneElement(item.icon, { size: 22 })}
              </div>
              <div className="flex items-center text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <FiTrendingUp className="mr-1" /> +Live
              </div>
            </div>
            <div>
              <p className="text-slate-400 font-semibold text-sm uppercase tracking-wider">{item.title}</p>
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">{item.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- CHARTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-white"
        >
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800">Growth Distribution</h3>
            <p className="text-slate-400 text-sm">Real-time database volume</p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer>
              <BarChart data={[
                { name: "Tenants", total: data.totalTenants || 0 },
                { name: "Owners", total: data.totalOwners || 0 },
                { name: "Properties", total: data.totalProperties || 0 },
                { name: "Bookings", total: data.totalBookings || 0 },
              ]}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="total" fill="url(#barGradient)" radius={[10, 10, 10, 10]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-white flex flex-col items-center"
        >
          <div className="w-full text-left mb-4">
            <h3 className="text-xl font-bold text-slate-800">Inventory Status</h3>
            <p className="text-slate-400 text-sm">Asset utilization</p>
          </div>
          <div className="relative h-[280px] w-full flex items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-slate-400 text-xs font-bold uppercase">Total</span>
                <span className="text-3xl font-black text-slate-800">{(data.bookedProperties || 0) + (data.availableProperties || 0)}</span>
            </div>
            <ResponsiveContainer>
              <PieChart>
                <Pie 
                  data={[
                    { name: "Booked", value: data.bookedProperties || 0 },
                    { name: "Available", value: data.availableProperties || 0 },
                  ]} 
                  innerRadius={75} outerRadius={105} paddingAngle={8} dataKey="value"
                >
                  {COLORS.map((color, index) => <Cell key={index} fill={color} stroke="none" />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full space-y-3 mt-6">
            <div className="flex items-center justify-between p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
              <span className="text-sm font-bold text-slate-600">Occupied Units</span>
              <span className="text-lg font-black text-rose-600">{data.bookedProperties || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <span className="text-sm font-bold text-slate-600">Available Units</span>
              <span className="text-lg font-black text-emerald-600">{data.availableProperties || 0}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;