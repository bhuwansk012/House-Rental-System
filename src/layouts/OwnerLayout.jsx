import { useState } from "react";
import OwnerNavbar from "../components/navbar/OwnerNavbar";
import OwnerSidebar from "../components/sidebar/OwnerSidebar";
import { Outlet } from "react-router-dom";

export default function OwnerLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      
      <OwnerSidebar isOpen={isOpen} />

      {/* Main wrapper shifts with sidebar */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? "ml-65" : "ml-20"
        }`}
      >
        <OwnerNavbar
          isOpen={isOpen}
          toggleSidebar={() => setIsOpen(!isOpen)}
        />

        {/* Push content below navbar */}
        <main className="flex-1 overflow-y-auto p-6 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}