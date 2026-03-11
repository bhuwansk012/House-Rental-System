import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { getProfile, updateProfile } from "../../service/profileService";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullName", profile.fullName || "");
      formData.append("email", profile.email || "");
      formData.append("address", profile.address || "");
      formData.append("contact", profile.contact || "");

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await updateProfile(formData);

      toast.success("Profile updated successfully!");
      setEditMode(false);
      setSelectedImage(null);
      setPreviewImage(null);
      fetchProfile();
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (loading && !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg">

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          ) : profile?.imageUrl ? (
            <img
              src={`http://localhost:8080${profile.imageUrl}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <RxAvatar size={120} className="text-blue-400" />
          )}

          {editMode && (
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-3"
            />
          )}
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-4">

          <div>
            <label className="text-gray-600 font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile?.fullName || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={profile?.email || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-600 font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={profile?.address || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-600 font-semibold">Contact</label>
            <input
              type="text"
              name="contact"
              value={profile?.contact || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">

          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={() => {
                  setEditMode(false);
                  setPreviewImage(null);
                  setSelectedImage(null);
                  fetchProfile();
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;