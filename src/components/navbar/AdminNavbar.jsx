import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";

const AdminNavbar = () => {
  return (
    <header className='h-16 border-b border-gray-200 flex items-center justify-between px-6 mx-auto shadow-gray-100'>
      <div className="ml-4"> 
      <h1 className='text-xl font-bold text-blue-900'>
        Welcome to Administrattor Dashboard
      </h1>
      </div>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-72 rounded-full px-4 py-2 pr-12 bg-white border border-gray-200 text-sm text-gray-600
               focus:outline-none focus:ring-2 focus:ring-purple-700
               transition-all"
        />

        <button
          type="submit"
          className="absolute right-4 text-blue-900 
               cursor-pointer
               hover:text-black
               transition-colors duration-200"
        >
          <IoIosSearch size={25} />
        </button>
      </div>
      <div className="flex items-center space-x-4 right-0 w-30">
        <button className='px-4 py-2  text-blue-900 transition duration-300 cursor-pointer font-bold rounded-full'>
          <RxAvatar  size={30}/>
        </button>

      </div>
    </header>
  )
}

export default AdminNavbar