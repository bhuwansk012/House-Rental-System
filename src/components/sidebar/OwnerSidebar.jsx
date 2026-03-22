import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiHome,
  FiCalendar,
  FiBell,
  FiCreditCard,
  FiBarChart2,
  FiUser,
  FiPlusCircle,
} from "react-icons/fi";

const OwnerSidebar = ({ isOpen }) => {
  const name = sessionStorage.getItem("name") || "Owner";

  const menuItems = [
    { to: "/owner/dashboard", icon: <FiGrid />, label: "Overview" },
    { to: "/owner/my-property", icon: <FiHome />, label: "My Assets" },
    { to: "/owner/bookings", icon: <FiCalendar />, label: "Reservations" },
    { to: "/owner/notifications", icon: <FiBell />, label: "Alerts" },
    { to: "/owner/payments", icon: <FiCreditCard />, label: "Payouts" },
    { to: "/owner/reports", icon: <FiBarChart2 />, label: "Insights" },
    { to: "/owner/profile", icon: <FiUser />, label: "Settings" },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="fixed top-0 left-0 h-screen bg-slate-900 text-slate-400 border-r border-slate-800 flex flex-col z-50 overflow-hidden"
    >

      {/* --- BRAND --- */}
      <div className="h-20 flex items-center px-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shrink-0">
            <FiPlusCircle size={20} />
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="font-extrabold text-white text-lg tracking-tight whitespace-nowrap"
              >
                Owner<span className="text-indigo-500">Hub</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- NAV --- */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">

        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `group relative flex items-center rounded-xl transition-all duration-200
              ${isOpen ? "px-4 py-3" : "justify-center py-3"}
              ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "hover:bg-slate-800 hover:text-slate-200"
              }`
            }
          >
            {/* Icon */}
            <span className={`${isOpen ? "text-lg" : "text-xl"} shrink-0`}>
              {item.icon}
            </span>

            {/* Label */}
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="ml-3 text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tooltip (collapsed mode) */}
            {!isOpen && (
              <div className="absolute left-20 bg-slate-800 text-white text-[10px] font-semibold px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest border border-slate-700 shadow-lg">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* --- FOOTER --- */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className={`flex items-center ${isOpen ? "gap-3" : "justify-center"}`}>
          
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold border-2 border-slate-800 shrink-0">
            {name.charAt(0)}
          </div>

          {/* Info */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-xs font-semibold text-white truncate">
                  {name}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Verified Host
                </span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </motion.div>
  );
};

export default OwnerSidebar;