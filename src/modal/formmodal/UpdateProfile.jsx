import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "../../service/profileService";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const role= sessionStorage.getItem("role");
  const {
    register,
    handleSubmit,
    reset,  
  } = useForm();

  
 const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append("address", data.address);
  formData.append("phone", data.phone);

  if (data.profileImage[0]) {
    formData.append("image", data.profileImage[0]);
  }

  try {
    await updateProfile(formData); // 

    toast.success("Profile updated successfully!");
    reset();
    if(role === "OWNER"){
      navigate("/owner/dashboard");
    } else if(role === "ADMIN"){
      navigate("/admin/dashboard");
    }
  } catch (error) {
    console.error("Update Error:", error);
    toast.error("Failed to update profile");
  }
};

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-6 rounded-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Update Profile
        </h2>

        {/* Address */}
        <label>Address</label>
        <input
          type="text"
          {...register("address", { required: "Address is required" })}
          className="w-full border p-2 mb-3 rounded"
        />
        

        {/* Phone */}
        <label>Phone</label>
        <input
          type="text"
          {...register("phone", { required: "Phone is required" })}
          className="w-full border p-2 mb-3 rounded"
        />


        {/* Image Upload */}
        <label className="block mb-2 font-medium">Profile Image</label>

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-4">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
          </div>

          <input
            type="file"
            {...register("profileImage")}
            className=""
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;