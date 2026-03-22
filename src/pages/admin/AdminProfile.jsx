import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../service/profileService";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import Modal from "../../modal/public/Modal";
import UpdateProfile from "../../modal/formmodal/UpdateProfile";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const role = sessionStorage.getItem("role");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const name=sessionStorage.getItem("name");



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const data = await getProfile();

        const formattedData = {
          ...data,
          image: data?.images
            ? `http://localhost:8080${data.images}`
            : null,
        };

        setProfileData(formattedData);
        console.log("Admin Profile Data:", formattedData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && role === "ADMIN") {
      fetchProfile();
    }
  }, [isAuthenticated, role]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-[90vh] bg-gray-100 p-8 flex justify-center">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-4xl">

        {/* Cover */}
        {profileData?.image ? (
          <div
            className="h-40 bg-cover bg-center"
            style={{ backgroundImage: `url(${profileData.image})` }}
          ></div>
        ) : (
          <div className="h-40 bg-linear-to-r from-blue-500 to-purple-600"></div>
        )}

        {/* Profile */}
        {!loading && profileData && (
          <div className="flex flex-col items-center px-6 pb-6">

            {/* Avatar */}
            <div className="-mt-16">
              {profileData.image ? (
                <img
                  src={profileData.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                />
              ) : (
                <RxAvatar className="w-32 h-32 text-gray-400 bg-white rounded-full border-4 border-white shadow-md" />
              )}
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold mt-4">
              {profileData.fullName}
            </h2>

            <p className="text-gray-500">{profileData.email}</p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-6 mt-8 w-full">

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-semibold">
                  {profileData.phone || "N/A"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-semibold">
                  {profileData.address || "N/A"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Role</p>
                <p className="font-semibold">{role}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Status</p>
                <p className="font-semibold text-green-500">
                  Active
                </p>
              </div>

            </div>

            {/* Logout */}
            <button
              onClick={()=>setIsOpen(!isOpen)}
              className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Update Profile
            </button>

          </div>
        )}

        {loading && (
          <p className="text-center py-10 text-gray-500">
            Loading profile...
          </p>
        )}

      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UpdateProfile />
      </Modal>
    </div>
  );
};

export default AdminProfile;