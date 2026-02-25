import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";
import { getProfile, updateProfile } from "../../service/profileService";

const OwnerProfile = () => {

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const role = user?.role;

  
  const { register, handleSubmit, setValue, watch } = useForm();

  // Watch for file input to show preview
  const watchImage = watch("image");

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
          
          setValue("phone", data?.phone || "");
          setValue("address", data?.address || "");
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    fetchProfile();
  }, [role, user, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await updateProfile(formData);
      alert("Profile updated successfully!");
      setEditMode(false);

      // Refresh profile
      const refreshed = await getProfile();
      setProfileData({
        ...refreshed,
        image: refreshed.images
          ? `http://localhost:8080${refreshed.images}`
          : null,
      });
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile.");
    }
  };

  if (role !== "OWNER" || !isAuthenticated) return null;

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-6">Owner Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        {watchImage?.length > 0 ? (
          <img
            src={URL.createObjectURL(watchImage[0])}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : profileData?.image ? (
          <img
            src={profileData.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center text-8xl bg-gray-200 rounded-full">
            <RxAvatar />
          </div>
        )}
      </div>

      {/* Display Mode */}
      {!editMode ? (
        <>
          <div className="space-y-2 text-lg mb-4">
            <p>
              <strong>Name:</strong> {user?.name || "Not set"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "Not set"}
            </p>
            <p>
              <strong>Phone:</strong> {profileData?.phone || "Not set"}
            </p>
            <p>
              <strong>Address:</strong> {profileData?.address || "Not set"}
            </p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setEditMode(true)}
          >
            Update Profile
          </button>
        </>
      ) : (
        /* Edit Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              {...register("phone")}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              {...register("address")}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OwnerProfile;