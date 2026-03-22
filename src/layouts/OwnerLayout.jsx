import { useState } from "react";
import OwnerNavbar from "../components/navbar/OwnerNavbar";
import OwnerSidebar from "../components/sidebar/OwnerSidebar";
import { Outlet } from "react-router-dom";

export default function OwnerLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* Sidebar */}
      <OwnerSidebar isOpen={isOpen} />

      {/* Main Section */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <OwnerNavbar
          isOpen={isOpen}
          toggleSidebar={() => setIsOpen(!isOpen)}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}