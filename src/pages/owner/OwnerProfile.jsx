import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import { getProfile, updateProfile } from "../../service/profileService";
import ProfileSection from "../../components/profile/ProfileSection";
import {logout} from '../../features/auth/authSlice'

const OwnerProfile = () => {
  const navigate=useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch=useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const { register, handleSubmit, reset } = useForm();
    const  handleLogout=()=>{
      dispatch(logout())
      navigate("/login")
    }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        const formattedData = {
          ...data,
          image: data.images
            ? `http://localhost:8080${data.images}`
            : null,
        };

        setProfileData(formattedData);
        reset(formattedData); // auto fill form
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) fetchProfile();
  }, [isAuthenticated, user, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("age", data.age);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("dateOfBirth", data.dateOfBirth);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await updateProfile(formData);
      alert("Profile Updated Successfully");

      setFormOpen(false);
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="h-[90vh] bg-gray-100 p-8">
      {!formOpen&&<div className="bg-white shadow-lg rounded-lg p-4 max-w-10xl mx-auto">
        <ProfileSection data={profileData} />
       <div className="text-center mt-6"> <button onClick={handleLogout} className="cursor-pointer bg-gray-400 p-2 m-1 px-4 py-2  rounded-xl">Logout</button></div>
        <div className="text-center mt-6">
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
        >
          {formOpen ? "Cancel" : "Update Profile"}
        </button>
      </div>
      </div>
      }

      {/* Update Form */}
      {formOpen && (
        <div className="max-w-3xl mx-auto mt-6 bg-white shadow-md p-6 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              {...register("age")}
              placeholder="Age"
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              {...register("dateOfBirth")}
              className="w-full border p-2 rounded"
            />

            <input
              {...register("phone")}
              placeholder="Phone"
              className="w-full border p-2 rounded"
            />

            <input
              {...register("address")}
              placeholder="Address"
              className="w-full border p-2 rounded"
            />

            <input
              type="file"
              {...register("image")}
              className="w-full border p-2 rounded"
            />
         <div className="flex flex-row">   <button className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer" onClick={()=>setFormOpen(!formOpen)}>Cancel</button>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded cursor-pointer"
            >
              Save Changes
            </button></div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OwnerProfile;