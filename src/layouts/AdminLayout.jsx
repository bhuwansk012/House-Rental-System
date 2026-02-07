import AdminNavbar from "../components/navbar/AdminNavbar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Fixed Sidebar */}
      <AdminSidebar className="fixed top-0 left-0 h-screen z-50" />

      {/* Main Content */}
      <div className="flex-1  flex flex-col">

        {/* Fixed Navbar */}
        <div className="fixed top-0 left-60 right-0 z-40">
          <AdminNavbar />
        </div>

        {/* Scrollable Content */}
        <div className="mt-16 flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default  AdminLayout
