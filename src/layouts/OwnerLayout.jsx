import OwnerNavbar from "../components/navbar/OwnerNavbar";
import { Outlet } from "react-router-dom";


export default function OwnerLayout() {
return (
<>
<OwnerNavbar />
<Outlet />
</>
);
}