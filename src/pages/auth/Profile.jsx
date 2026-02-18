import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import {toast} from 'react-toastify';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          No user data found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <div className="flex flex-col items-center">
          <RxAvatar size={80} className="text-blue-900 mb-4" />
          
          <h2 className="text-2xl font-bold text-gray-800">
            {user.name}
          </h2>

          <p className="text-gray-500 mt-2">
           <span className="font-semibold">{user.role}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition duration-300"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;
