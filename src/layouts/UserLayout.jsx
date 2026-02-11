import UserNavbar from "../components/navbar/UserNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

function UserLayout() {
  return (
    <>
      <UserNavbar />
      <main className="pt-[8vh] ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default UserLayout;
