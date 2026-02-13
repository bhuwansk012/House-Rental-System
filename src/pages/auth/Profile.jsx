import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateProfile, getProfile } from "../../service/userProfileTest";

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile on component moun
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response);
        setPreview(response.image); // Show existing profile image
        reset({
          name: response.name || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.profile_img && data.profile_img[0]) {
        formData.append("profile_img", data.profile_img[0]);
      }

      const updated = await updateProfile(formData);
      alert("Profile updated successfully!");
      setProfile(updated);
      if (updated.image) setPreview(updated.image);
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Failed to update profile.");
    }
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  if (loading) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Update Profile
        </h2>

        {/* NAME FIELD */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* PROFILE IMAGE FIELD */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Profile Image</label>

          {preview && (
            <div className="flex justify-center mb-4">
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
              />
            </div>
          )}

          <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
            <span className="text-gray-600 font-medium">Click to upload image</span>
            <span className="text-xs text-gray-400">JPG, PNG (Max 2MB)</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("profile_img", {
                validate: {
                  fileSize: (value) =>
                    !value[0] || value[0].size < 2000000 || "File must be less than 2MB",
                },
              })}
              onChange={handleImageChange}
            />
          </label>

          {errors.profile_img && (
            <p className="text-red-500 text-sm mt-2">{errors.profile_img.message}</p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              reset();
              setPreview(profile?.image || null);
            }}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>

      {/* DISPLAY PROFILE */}
      {profile && (
        <div className="mt-8 flex flex-col items-center">
          <img
            src={profile.image}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2 object-cover border-2 border-blue-500"
          />
          <span className="font-semibold text-lg">{profile.name}</span>
        </div>
      )}
    </div>
  );
};

export default Profile;
