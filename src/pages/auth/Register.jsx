import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../service/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  
 const onSubmit = async (data) => {
    console.log("Form Data:", data);
  try {
    const response = await registerService(data);

    if (response.status === 201) {
      toast.success(response.data);   //just response.data
      reset();
      navigate("/login");
    }

  } catch (error) {
    if (!error.response) {
      toast.error("Network Error!");
      return;
    }

    toast.error(error.response.data || "Registration Failed!");
  }
};


  return (
    <div className="min-h-screen max-w-380 mx-auto flex items-center justify-center bg-white px-4 shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-950 text-white p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Bhuwan Sarki"
            className={`w-full px-3 py-2 border rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.fullName ? "border-red-500" : "border-gray-600"
            }`}
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className={`w-full px-3 py-2 border rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-600"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              className={`w-full px-3 py-2 border rounded-lg bg-gray-900 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-600"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Role</label>
          <select
            className={`w-full px-3 py-2 border rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.role ? "border-red-500" : "border-gray-600"
            }`}
            {...register("role", {
              required: "Role is required",
            })}
          >
            <option value="">Select Role</option>
            <option value="USER">USER</option>
            <option value="OWNER">OWNER</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 bg-gray-300 text-black py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-sm text-center mt-5 text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
