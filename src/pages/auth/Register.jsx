import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    navigate("/login");
    reset();
  };

  return (
    <div className="min-h-176 max-w-380 mx-auto flex items-center justify-center bg-white px-4 drop-shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-5 bg-gray-950 text-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-5">
          Sign Up
        </h2>

        {/* GRID START */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium text-sm">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Bhuwan Sarki"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none ${
                errors.fullName ? "border-red-500" : "border-gray-300"
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
          <div>
            <label className="block mb-1 font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
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

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium text-sm">
              Phone
            </label>
            <input
              type="text"
              placeholder="98XXXXXXXX"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-sm ${
                errors.phoneNo ? "border-red-500" : "border-gray-300"
              }`}
              {...register("phoneNo", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit number",
                },
              })}
            />
            {errors.phoneNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNo.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium text-sm">
              Address
            </label>
            <input
              type="text"
              placeholder="Kathmandu, Nepal"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-sm ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              {...register("address", {
                required: "Address is required",
              })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 font-medium text-sm">
              Role
            </label>
            <select
              className={`w-full px-3 py-2 border rounded-lg bg-gray-900 focus:outline-none text-sm ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
              {...register("role", {
                required: "Role is required",
              })}
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
              <option value="tenant">Tenant</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

        </div>
        {/* GRID END */}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-300"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-900 disabled:opacity-60"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </div>

        {/* Login */}
        <p className="text-sm text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
