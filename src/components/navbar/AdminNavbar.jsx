import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile } from "../../service/profileService";
import { toast } from "react-toastify";

const AdminNavbar = () => {
  const role = sessionStorage.getItem("role");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [profile, setProfile] = useState(null);

  // Fetch admin profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        const formattedData = {
          ...data,
          imageUrl: data?.images ? `http://localhost:8080${data.images}` : null, 
        };

        setProfile(formattedData);
        console.log("Admin Profile Data in navbar:", formattedData);
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Failed to load profile");
      }
    };

    if (isAuthenticated && role === "ADMIN") {
      fetchProfile();
    }
  }, [isAuthenticated, role]);

  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 mx-auto shadow-sm">
      <div className="ml-4">
        <h1 className="text-xl font-bold text-blue-900">
          Welcome to Administrator Dashboard
        </h1>
      </div>

      <div>
        <Link
          to="/admin/profile"
          className="flex items-center px-4 py-2 rounded-full border border-blue-900 text-blue-900 font-semibold hover:bg-blue-900 hover:text-white transition-all duration-300 shadow-sm"
        >
          {profile?.imageUrl ? (
            <img
              src={profile.imageUrl}
              alt="Profile"
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <RxAvatar size={22} />
          )}
          <span className="ml-2">{profile?.fullName || "Admin"}</span>
        </Link>
      </div>
    </header>
  );
};

export default AdminNavbar;