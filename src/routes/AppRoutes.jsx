import { Routes, Route } from "react-router-dom";
import Forget from '../pages/auth/forget'
import Profile from '../pages/user/Profile'
import Login from "../pages/auth/Login";
import Register from '../pages/auth/Register'
import Home from "../pages/user/Home";
import Properties from "../pages/user/Properties";
import About from "../pages/user/About";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import MyProperty from "../pages/owner/MyProperty";
import AddProperty from "../pages/owner/AddProperty";
import EditProperty from "../pages/owner/EditProperty";
import Booking from "../pages/owner/Booking";
import Notification from "../pages/owner/Notification";
import Payment from "../pages/owner/Payment";
import OwnerProfile from "../pages/owner/OwnerProfile";
import Report from "../pages/owner/Report";

import AdminDashboard from "../pages/admin/AdminDashboard";
import UserLayout from "../layouts/UserLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserList from "../pages/admin/UserList";
import PropertyList from "../pages/admin/PropertyList";
import BookingList from "../pages/admin/bookingList";
import OwnerList from "../pages/admin/OwnerList";
import PropertyDetails from "../pages/user/PropertyDetails";
import AdminProfile from '../pages/admin/AdminProfile'

function AppRoutes() {
  return (
    <Routes>
     
      <Route path="/forget-password" element={<Forget/>}/>
    

      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/property-details" element={<PropertyDetails/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Route>

      {/* Owner Routes */}
      <Route element={<OwnerLayout />}>
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/my-property" element={<MyProperty />} />
        <Route path="/owner/add-property" element={<AddProperty />} />
        <Route path="/owner/edit-property/:id" element={<EditProperty />} />
        <Route path="/owner/bookings" element={<Booking />} />
        <Route path="/owner/notifications" element={<Notification />} />
        <Route path="/owner/payments" element={<Payment />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />
        <Route path="/owner/reports" element={<Report />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/properties" element={<PropertyList />} />
        <Route path="/admin/bookings" element={<BookingList />} />
        <Route path="/admin/owners" element={<OwnerList />} />
        <Route path="/admin/profile" element={<AdminProfile/>}/>
      </Route>
      
    </Routes>
  );
}

export default AppRoutes;
