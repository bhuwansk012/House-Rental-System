import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../service/profileService";
import ProfileSection from "../../components/profile/ProfileSection";
import { toast } from "react-toastify";
import  Modal from '../../modal/public/Modal';
import UpdateProfile from "../../modal/formmodal/UpdateProfile";

const OwnerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);  

  const role = sessionStorage.getItem("role");


  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();

        const formattedData = {
          ...data,
          image: data?.images ? `http://localhost:8080${data.images}` : null,
        };

        setProfileData(formattedData);
        console.log("Owner Profile Data:", formattedData);
  

        console.log("Profile Image in OwnerProfile:", formattedData.image);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && role === "OWNER") {
      fetchProfile();
    }
  }, [isAuthenticated, role, dispatch]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-[90vh] bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto">
        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}

        {/* Profile Info */}
        {!loading && profileData && (
          <ProfileSection data={profileData} />
        )}

        {/* Logout Button */}
         <div className="text-center mt-6 gap-4 flex justify-center">
          
          <button
            onClick={()=> setIsOpen(!isOpen)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
          >
            update

          </button>
      

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UpdateProfile />
      </Modal>
    </div>
  );
};

export default OwnerProfile;