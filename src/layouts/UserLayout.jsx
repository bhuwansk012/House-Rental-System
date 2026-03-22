import UserNavbar from "../components/navbar/UserNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Navbar */}
      <header className="shrink-0">
        <UserNavbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="shrink-0">
        <Footer />
      </footer>

    </div>
  );
}

export default UserLayout;