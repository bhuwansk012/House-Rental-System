import React from "react";
import { RxAvatar } from "react-icons/rx";
import { HiMenu } from "react-icons/hi";

const OwnerNavbar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 h-16 bg-white shadow flex items-center justify-between px-6 z-50 transition-all duration-300
      ${isOpen ? "left-60" : "left-20"} right-0`}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <HiMenu size={26} />
        </button>

        <h1 className="text-lg font-semibold text-gray-700">
          Owner Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 cursor-pointer bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
        <RxAvatar size={28} />
        <span className="font-medium text-gray-700">Owner</span>
      </div>
    </div>
  );
};

export default OwnerNavbar;
