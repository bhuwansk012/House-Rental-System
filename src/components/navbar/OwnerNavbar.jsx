import React,{useEffect,useState} from "react";
import { RxAvatar } from "react-icons/rx";
import { HiMenu } from "react-icons/hi";
import {useSelector} from 'react-redux'
import {getProfile} from '../../service/profileService'
const OwnerNavbar = ({ isOpen, toggleSidebar }) => {
  const user=useSelector((state)=>state.auth.user);
  const isAuthenticated=useSelector((state)=>state.auth.user);
   const [profileData, setProfileData] = useState(null);
  const role=user?.role;
    useEffect(() => {
    const fetchProfile = async () => {
      if (role === "OWNER") {
        try {
          const data = await getProfile();
          console.log(data);
          const updatedData = {
            ...data,
            image: data.images
              ? `http://localhost:8080${data.images}`
              : null,
          };
          setProfileData(updatedData);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    fetchProfile();
  },[]);
  return (
    <div
      className={`fixed top-0 h-16 bg-white shadow flex items-center justify-between px-6 z-50 transition-all duration-300
      ${isOpen ? "left-60" : "left-20"} right-0`}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <HiMenu size={26} />
        </button>

        <h1 className="text-lg font-semibold text-gray-700">
          {user?.name} Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 cursor-pointer bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
        {isAuthenticated?<RxAvatar size={28} />:<img src={profileData?.image}  className="w-14 h-14 rounded-full"/>}
        <span className="font-medium text-gray-700">{user.name}</span>
      </div>
    </div>
  );
};

export default OwnerNavbar;
