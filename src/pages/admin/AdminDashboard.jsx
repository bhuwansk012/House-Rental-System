import React from "react";
import { FiUsers, FiHome, FiKey, FiCalendar } from "react-icons/fi";
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

const recentProperties = [
  {
    id: 1,
    name: "2BHK Apartment - Baneshwor",
    owner: "Ram Sharma",
    rent: "Rs. 25,000",
    date: "2026-02-01",
    status: "Available",
  },
  {
    id: 2,
    name: "1BHK Flat - Lalitpur",
    owner: "Sita Thapa",
    rent: "Rs. 18,000",
    date: "2026-01-30",
    status: "Booked",
  },
  {
    id: 3,
    name: "3BHK House - Bhaktapur",
    owner: "Hari KC",
    rent: "Rs. 40,000",
    date: "2026-01-28",
    status: "Available",
  },
];


const stats = [
  {
    title: "Total Tenants",
    value: 120,
    icon: <FiUsers size={28} />,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    title: "Total Owners",
    value: 35,
    icon: <FiKey size={28} />,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    title: "Total Properties",
    value: 150,
    icon: <FiHome size={28} />,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  {
    title: "Total Bookings",
    value: 210,
    icon: <FiCalendar size={28} />,
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
];

/* Chart Data */
const barData = [
  { name: "Tenants", total: 120 },
  { name: "Owners", total: 35 },
  { name: "Properties", total: 150 },
  { name: "Bookings", total: 210 },
];

const pieData = [
  { name: "Booked", value: 140 },
  { name: "Available", value: 10 },
];

const COLORS = ["#7c3aed", "#ddd6fe"];

const AdminDashboard = () => {
  return (
    <div className="m-4 space-y-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-blue-900 pl-2">
        Admin Dashboard
      </h1>

      {/* Stats Cards (UNCHANGED STYLE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {stats.map((item, index) => (
          <div
            key={index}
            className="hover:bg-purple-800 hover:text-white rounded-xl shadow-sm p-5 flex text-purple-900
            items-center justify-between border border-gray-200 transition-colors duration-300 hover:z-10 w-80 cursor-pointer"
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 lg:col-span-2 ">
          <h2 className="text-lg font-bold text-purple-900 mb-4">
            System Overview
          </h2>

          <ResponsiveContainer width="80%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="total"
                fill="#7c3aed"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
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
