import React,{useEffect,useState} from "react";
import { RxAvatar } from "react-icons/rx";
import { HiMenu } from "react-icons/hi";
import {useSelector} from 'react-redux'
import {getProfile} from '../../service/profileService'
const OwnerNavbar = ({ isOpen, toggleSidebar }) => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (role === "OWNER") {
        try {
          const data = await getProfile();
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

    if (role) {
      fetchProfile();
    }
  }, [role]);

  return (
    <div
      className={`fixed top-0 h-16 bg-white shadow flex items-center justify-between px-6 z-50 transition-all duration-300
      ${isOpen ? "left-60" : "left-20"} right-0`}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <HiMenu size={26} />
        </button>

        <h1 className="text-lg font-semibold text-gray-700">
           Welcome {user?.name} on your Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-3 cursor-pointer bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
        {profileData?.image ? (
          <img
            src={profileData.image}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <RxAvatar size={28} />
        )}
        <span className="font-semibold text-gray-700 text-lg  ">{user?.name}</span>
      </div>
    </div>
  );
};

export default OwnerNavbar;
