import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../service/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../features/auth/authSlice'

const Login = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();





const onSubmit = async (data) => {
  setServerError("");

  try {
    const response = await loginService(data);
    const logedData={id:response.data.id,name:response.data.fullName,role:response.data.role}
    dispatch(loginSuccess(logedData));
    
    if (response.status === 200) {
      toast.success(response.data.message);
      console.log(response.data);
      // Save token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if(response.data.role === "ADMIN"){
        navigate("/admin/dashboard");
      }
      else if(response.data.role === "OWNER"){
      navigate("/owner/dashboard");
    }
    else{
        navigate("/");
      }
    }

  } catch (error) {
    if (!error.response) {
      toast.error("Network Error!");
      return;
    }

    const status = error.response.status;

    if (status === 401) {
      toast.error("Invalid Email or Password");
    } else if (status === 400) {
      toast.error("Bad Request");
    } else if (status === 500) {
      toast.error("Server Error");
    } else {
      toast.error("Something went wrong!");
    }
  }
};





  return (
    <div className="min-h-screen max-w-380 mx-auto flex items-center justify-center bg-white px-4 shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-950 text-white p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Login Account
        </h2>

        {/* Server Error */}
        {serverError && (
          <div className="bg-red-500 text-white text-sm p-2 rounded mb-4 text-center">
            {serverError}
          </div>
        )}

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
              placeholder="••••••••"
              className={`w-full px-3 py-2 border rounded-lg bg-gray-900 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-600"
              }`}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 bg-gray-300 text-black py-2 rounded-lg font-semibold hover:bg-gray-400 transition cursor-pointer "
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="text-right mt-3">
          <Link to="/forget-password" className="text-blue-400 text-sm hover:underline">
            Forget password?
          </Link>
        </div>

        <p className="text-sm text-center mt-5 text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign-Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
