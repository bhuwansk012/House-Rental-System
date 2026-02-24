import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";


const AdminNavbar = () => {


  const user=useSelector((state)=>state.auth.user);
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
  return (
    <header className='h-16 border-b border-gray-200 flex items-center justify-between px-6 mx-auto shadow-gray-100'>
      <div className="ml-4"> 
      <h1 className='text-xl font-bold text-blue-900'>
        Welcome to Administrattor Dashboard
      </h1>
      </div>
      
      <div> 
        <Link
      to="/profile"
      className="flex items-center px-5 py-2 rounded-full border border-blue-900 
                 text-blue-900 font-semibold hover:bg-blue-900 hover:text-white 
                 transition-all duration-300 shadow-sm"
    >
      <RxAvatar size={22} />
      <span className="ml-2">{user?.name}</span>
    </Link></div>
    </header>
  )
}

export default AdminNavbar