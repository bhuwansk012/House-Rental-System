import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";

const OwnerProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchOwnerProfile();
  }, []);

  const fetchOwnerProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/owner/profile/${authUser.id}`
      );
      setProfile(res.data);
    } catch (err) {
      toast.error("Failed to load owner profile");
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      Object.keys(profile).forEach((key) => {
        formData.append(key, profile[key]);
      });

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.put(
        `http://localhost:8080/api/owner/profile/update/${authUser.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Profile updated successfully!");
      setEditMode(false);
      fetchOwnerProfile();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-gray-200 p-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl shadow-2xl rounded-3xl p-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            {profile.imageUrl ? (
              <img
                src={`http://localhost:8080${profile.imageUrl}`}
                alt="Owner"
                className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
              />
            ) : (
              <RxAvatar size={140} className="text-indigo-400" />
            )}

            {editMode && (
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-3"
              />
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">
              {profile.fullName}
            </h2>
            <p className="text-gray-500 mt-1">{profile.email}</p>
            <p className="text-gray-500">{profile.phone}</p>
            <p className="text-gray-500">{profile.address}</p>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-indigo-50 p-3 rounded-xl shadow-sm">
                <p className="font-semibold text-indigo-600">
                  Total Properties
                </p>
                <p className="text-lg font-bold">{profile.totalProperties}</p>
              </div>

              <div className="bg-green-50 p-3 rounded-xl shadow-sm">
                <p className="font-semibold text-green-600">
                  Total Earnings
                </p>
                <p className="text-lg font-bold">
                  Rs. {profile.totalEarnings}
                </p>
              </div>

              <div className="bg-yellow-50 p-3 rounded-xl shadow-sm">
                <p className="font-semibold text-yellow-600">
                  Account Status
                </p>
                <p className="font-bold">{profile.status}</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl shadow-sm">
                <p className="font-semibold text-blue-600">
                  Joined Date
                </p>
                <p className="font-bold">{profile.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">Citizenship No</label>
            <input
              type="text"
              name="citizenshipNo"
              value={profile.citizenshipNo || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold">Agency Name</label>
            <input
              type="text"
              name="agencyName"
              value={profile.agencyName || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          {editMode ? (
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={() => navigate("/change-password")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-xl"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default OwnerProfile;