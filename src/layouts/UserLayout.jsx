import UserNavbar from "../components/navbar/UserNavbar";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      <UserNavbar />
      <main className="pt-[8vh] ">
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;
