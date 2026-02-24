import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaPlus,
  FaBook,
  FaBell,
  FaMoneyBill,
  FaUser,
  FaChartBar,
} from "react-icons/fa";

const OwnerSidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-lg border-r 
      transition-all duration-300 z-40
      ${isOpen ? "w-60" : "w-20"}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center font-bold text-lg bg-orange-500 text-white shadow">
        {isOpen ? "Owner Panel" : "OP"}
      </div>

      <div className="mt-4 space-y-2 px-3">

        {[
          { to: "/owner/dashboard", icon: <FaHome />, label: "Dashboard" },
          { to: "/owner/my-property", icon: <FaBuilding />, label: "My Property" },
          { to: "/owner/bookings", icon: <FaBook />, label: "Bookings" },
          { to: "/owner/notifications", icon: <FaBell />, label: "Notifications" },
          { to: "/owner/payments", icon: <FaMoneyBill />, label: "Payments" },
          { to: "/owner/reports", icon: <FaChartBar />, label: "Reports" },
          { to: "/owner/profile", icon: <FaUser />, label: "Profile" },
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center ${isOpen ? "space-x-3" : "justify-center"}
              px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"}`
            }
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default OwnerSidebar;
