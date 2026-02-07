import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { BsHousesFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";



const AdminSidebar = () => {

    const linkclass = ({ isActive }) => `block px-4 py-3 right-0 transition- 
    ${isActive ? 'bg-white text-blue-900 font-semibold right-0 rounded-l-lg  '
            : 'text-white hover:bg-gray-200 hover:text-blue-900 font-semibold hover:rounded-l-lg '}`;
    return (
        <aside className="w-60  bg-purple-950 shadow h-screen pl-4 text-white">
            <div className='m-1  p-1'>
                <h2 className="text-xl font-bold  mb-6 text-white">
                    House Rental System
                </h2>
            </div>
            <nav className='space-y-2 '>
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
                    Booking
                </NavLink>
                <NavLink to="/admin/owners" className={linkclass}>
                    <GrUserAdmin className="inline mr-2" />
                    Owners
                </NavLink>
                <NavLink to="/admin/logout" className={linkclass}>
                    <IoLogOut className="inline mr-2" />
                    Logout
                </NavLink>
            </nav>
        </aside>
    )
}

export default AdminSidebar