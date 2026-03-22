import AdminNavbar from "../components/navbar/AdminNavbar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <div className="h-20 shrink-0">
          <AdminNavbar />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;