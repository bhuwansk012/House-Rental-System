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

  // --- PDF GENERATION ---
  const generatePDFReport = () => {
    if (!dashboardData) return toast.error("No data to export");

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229);
    doc.text("System Analytics Report", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${date}`, 14, 28);

    const tableRows = [
      ["Total Tenants", dashboardData.totalTenants || 0],
      ["Total Owners", dashboardData.totalOwners || 0],
      ["Total Properties", dashboardData.totalProperties || 0],
      ["Total Bookings", dashboardData.totalBookings || 0],
      ["Occupied Units", dashboardData.bookedProperties || 0],
      ["Available Units", dashboardData.availableProperties || 0],
    ];

    doc.autoTable({
      head: [["Metric", "Value"]],
      body: tableRows,
      startY: 35,
      theme: "grid",
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 10, cellPadding: 4 }
    });

    doc.save(`Analytics_Report_${date.replace(/\//g, "-")}.pdf`);
    toast.success("PDF Report Downloaded");
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-slate-50">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <FiActivity className="absolute text-indigo-600 animate-pulse" size={22} />
        </div>
        <p className="mt-4 text-slate-500 font-semibold uppercase text-xs tracking-widest">
          Syncing Ecosystem...
        </p>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 bg-[#f8fafc] min-h-screen text-slate-900 font-sans antialiased"
    >

      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">

        <div>
          <div className="flex items-center gap-3 text-indigo-600 font-semibold text-xs uppercase tracking-[0.2em] mb-2">
            <span className="w-8 h-px bg-indigo-600"></span>
            System Overview
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-800">
            Platform{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Analytics
            </span>
          </h1>
        </div>

        <button
          onClick={generatePDFReport}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
        >
          <FiDownload /> Export PDF
        </button>

      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative bg-white rounded-3xl p-6 shadow-lg border border-white overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-[0.05] rounded-full -mr-10 -mt-10`} />

            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md`}>
                {React.cloneElement(item.icon, { size: 20 })}
              </div>

              <div className="flex items-center text-emerald-500 text-[11px] font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <FiTrendingUp className="mr-1" /> Live
              </div>
            </div>

            <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
              {item.title}
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tabular-nums leading-tight">
              {item.value}
            </h2>
          </motion.div>
        ))}

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* BAR CHART */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg border"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold tracking-tight text-slate-800">
              Growth Distribution
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Real-time database volume
            </p>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer>
              <BarChart
                data={[
                  { name: "Tenants", total: data.totalTenants || 0 },
                  { name: "Owners", total: data.totalOwners || 0 },
                  { name: "Properties", total: data.totalProperties || 0 },
                  { name: "Bookings", total: data.totalBookings || 0 },
                ]}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="total" fill="url(#barGradient)" radius={[8, 8, 8, 8]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* PIE CHART */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-6 shadow-lg border flex flex-col items-center"
        >
          <div className="w-full mb-4">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              Inventory Status
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Asset utilization
            </p>
          </div>

          <div className="h-[260px] w-full flex items-center justify-center relative">
            <div className="absolute text-center">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">
                Total
              </p>
              <p className="text-2xl font-extrabold tabular-nums">
                {(data.bookedProperties || 0) + (data.availableProperties || 0)}
              </p>
            </div>

            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: "Booked", value: data.bookedProperties || 0 },
                    { name: "Available", value: data.availableProperties || 0 },
                  ]}
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full space-y-3 mt-6">
            <div className="flex justify-between p-4 bg-rose-50 rounded-xl border">
              <span className="text-sm font-medium">Occupied</span>
              <span className="font-extrabold text-rose-600 tabular-nums">
                {data.bookedProperties || 0}
              </span>
            </div>

            <div className="flex justify-between p-4 bg-emerald-50 rounded-xl border">
              <span className="text-sm font-medium">Available</span>
              <span className="font-extrabold text-emerald-600 tabular-nums">
                {data.availableProperties || 0}
              </span>
            </div>
          </div>

        </motion.div>

      </div>
    </motion.div>
  );
};

export default AdminDashboard;