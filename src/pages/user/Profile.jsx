import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout,profileLoaded } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { getProfile } from "../../service/profileService";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();

      const formattedData = {
        ...data,
        image: data?.images ? `http://localhost:8080${data.images}` : null,
      };

      setProfile(formattedData);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-gray-200 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          {profile?.image ? (
            <img
              src={profile.image}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <RxAvatar size={140} className="text-blue-400" />
          )}
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">

          <div>
            <p className="text-gray-600 font-semibold">Full Name</p>
            <p className="text-gray-900">{profile.fullName}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Email</p>
            <p className="text-gray-900">{profile.email}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Address</p>
            <p className="text-gray-900">{profile.address}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Contact</p>
            <p className="text-gray-900">{profile.contact}</p>
          </div>

        </div>

        {/* Logout Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;