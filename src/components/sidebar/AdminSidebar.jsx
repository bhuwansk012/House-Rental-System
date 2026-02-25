import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaAddressBook, FaUsers,FaUser } from "react-icons/fa";
import { BsHousesFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'
import { toast } from 'react-toastify';   

const AdminSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully!");
        navigate("/");
    };

    const linkclass = ({ isActive }) =>
        `block px-4 py-3 transition-all duration-300 ${
            isActive
                ? 'bg-white text-blue-900 font-semibold rounded-l-lg'
                : 'text-white hover:bg-gray-200 hover:text-blue-900 font-semibold hover:rounded-l-lg'
        }`;

    return (
        <aside className="w-50 bg-purple-950 shadow h-screen pl-4 text-white">
            <div className='m-1 p-1'>
                <h2 className="text-xl font-bold mb-6 text-white">
                    House Rental System
                </h2>
            </div>

            <nav className='space-y-2'>
                <NavLink to="/admin/dashboard" className={linkclass}>
                    <MdOutlineSpaceDashboard className="inline mr-2" />
                    Dashboard
                </NavLink>

                <NavLink to="/admin/users" className={linkclass}>
                    <FaUsers className="inline mr-2" />
                    Users
                </NavLink>

                <NavLink to="/admin/properties" className={linkclass}>
                    <BsHousesFill className="inline mr-2" />
                    Properties
                </NavLink>

                <NavLink to="/admin/bookings" className={linkclass}>
                    <FaAddressBook className="inline mr-2" />
                    Bookings
                </NavLink>

                <NavLink to="/admin/owners" className={linkclass}>
                    <GrUserAdmin className="inline mr-2" />
                    Owners
                </NavLink>
                <NavLink to="/admin/profile" className={linkclass}>
                    <FaUser className="inline mr-2" />
                   Profile
                </NavLink>

                {/*Properly Closed Button */}
                <button 
                    className="block w-full text-left px-4 py-3 text-white hover:bg-red-500 hover:text-white font-semibold transition-all duration-300 rounded-l-lg"
                    onClick={handleLogout}
                >
                    <IoLogOut className="inline mr-2" />
                    Logout
                </button>
            </nav>
        </aside>
    )
}

export default AdminSidebar
