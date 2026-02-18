import { useState } from "react";
import OwnerNavbar from "../components/navbar/OwnerNavbar";
import OwnerSidebar from "../components/sidebar/OwnerSidebar";
import { Outlet } from "react-router-dom";

export default function OwnerLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <OwnerSidebar isOpen={isOpen} />

      {/* Navbar */}
      <OwnerNavbar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 pt-20 p-6
        ${isOpen ? "ml-60" : "ml-20"}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
