import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import {loginUser} from '../../service/userService'


const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const navigate = useNavigate()


  const onSubmit = (data) => {
      
    console.log(data);
    const response=loginUser(data);
    console.log("Login Response in Component:", response);
    navigate('/');
    reset();
  };
  

  return (
    <div className="min-h-176 max-w-380 mx-auto flex items-center justify-center bg-white  px-4 drop-shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mg-gray-50  p-6 bg-gray-950 text-white rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              errors.email
                ? "border-red-500"
                : "border-gray-300"
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
          <label className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message:
                  "Password must be at least 6 characters",
              },
            })}
          />
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
            className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-300 transition cursor-pointer">
            Reset
          </button>

           <button
            type="submit"
            disabled={ isSubmitting}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition disabled:opacity-60 cursor-pointer" >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
        <Link to="/forget-password" className="text-blue-500 font-semibold p-2  ">Forget password</Link>

        {/* Register Link */}
        <p className="text-sm text-center mt-5 text-gray-300  ">
            Don't have an account?{" "}
          <Link  to='/register' className="text-blue-500 cursor-pointer hover:underline">
            Sign-Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
