import { Routes, Route } from "react-router-dom";
import Forget from '../pages/auth/forget'
import Profile from '../pages/auth/Profile'
import Login from "../pages/auth/Login";
import Register from '../pages/auth/Register'
import Home from "../pages/user/Home";
import Properties from "../pages/user/Properties";
import About from "../pages/user/About";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserLayout from "../layouts/UserLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserList from "../pages/admin/UserList";
import PropertyList from "../pages/admin/PropertyList";
import BookingList from "../pages/admin/bookingList";
import OwnerList from "../pages/admin/OwnerList";

function AppRoutes() {
  return (
    <Routes>
     
      <Route path="/forget-password" element={<Forget/>}/>
      <Route path='/profile' element={<Profile/>}/>

      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
      </Route>

      {/* Owner Routes */}
      <Route element={<OwnerLayout />}>
        <Route path="/owner" element={<OwnerDashboard />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/properties" element={<PropertyList />} />
        <Route path="/admin/bookings" element={<BookingList />} />
        <Route path="/admin/owners" element={<OwnerList />} />
      </Route>
      
    </Routes>
  );
}

export default AppRoutes;
