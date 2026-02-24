import React, { useEffect, useState } from "react";
import { FiUsers, FiHome, FiKey, FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";
import { getAdminData } from "../../service/adminService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#7c3aed", "#ddd6fe"];

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getAdminData();

        setDashboardData(data);
      
      } catch (error) {
        const status = error.response?.status;

        if (status === 401) toast.error("Unauthorized Access");
        else if (status === 403) toast.error("Access Denied");
        else if (status === 500) toast.error("Server Error");
        else toast.error("Something went wrong!");

      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-6 text-lg font-semibold text-center items-center ">Loading Dashboard...</div>;
  }

  if (!dashboardData) {
    return <div className="p-6 text-red-500">No Data Available</div>;
  }

  // 
  const stats = [
    {
      title: "Total Tenants",
      value: dashboardData.totalTenants || 0,
      icon: <FiUsers size={28} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Total Owners",
      value: dashboardData.totalOwners || 0,
      icon: <FiKey size={28} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Total Properties",
      value: dashboardData.totalProperties || 0,
      icon: <FiHome size={28} />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || 0,
      icon: <FiCalendar size={28} />,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  ];

  const barData = [
    { name: "Tenants", total: dashboardData.totalTenants || 0 },
    { name: "Owners", total: dashboardData.totalOwners || 0 },
    { name: "Properties", total: dashboardData.totalProperties || 0 },
    { name: "Bookings", total: dashboardData.totalBookings || 0 },
  ];

  const pieData = [
    { name: "Booked", value: dashboardData.bookedProperties || 0 },
    { name: "Available", value: dashboardData.availableProperties || 0 },
  ];

  return (
    <div className="m-4 space-y-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 pl-2">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="hover:bg-purple-800 hover:text-white rounded-xl shadow-md p-5 flex text-purple-900
            items-center justify-between border border-gray-200 transition-all duration-300 cursor-pointer"
          >
            <div>
              <p className="text-lg font-bold">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>

            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg} ${item.text}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 lg:col-span-2 shadow-md">
          <h2 className="text-lg font-bold text-purple-900 mb-4">
            System Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#7c3aed" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md">
          <h2 className="text-lg font-bold text-purple-900 mb-4">
            Property Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-4 mt-4 text-sm font-medium">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
              Booked
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-200 rounded-full"></span>
              Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;