import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiLock,
  FiBriefcase,
  FiArrowRight,
  FiRotateCcw
} from "react-icons/fi";
import { motion } from "framer-motion";
import { registerService } from "../../service/authService";

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
    try {
      const response = await registerService(data);

      if (response.status === 201) {
        toast.success(response.data || "Registration Successful!");
        reset();
        navigate("/login");
      }
    } catch (error) {
      const errorMsg = error.response?.data || "Registration Failed!";
      toast.error(typeof errorMsg === "string" ? errorMsg : "Network Error!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-[-8%] right-[-8%] w-[35%] h-[35%] bg-emerald-100 rounded-full blur-[100px] opacity-40" />
      <div className="absolute bottom-[-8%] left-[-8%] w-[35%] h-[35%] bg-blue-100 rounded-full blur-[100px] opacity-40" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg z-10"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-white p-8 md:p-10">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Join the <span className="text-blue-600">Platform</span>
            </h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* FULL NAME */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">
                Full Name
              </label>

              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition" />

                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm font-medium outline-none transition-all
                  ${errors.fullName
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  }`}
                  {...register("fullName", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Minimum 3 characters" }
                  })}
                />
              </div>

              {errors.fullName && (
                <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">
                Email Address
              </label>

              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition" />

                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm font-medium outline-none transition-all
                  ${errors.email
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format"
                    }
                  })}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD + ROLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* PASSWORD */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">
                  Password
                </label>

                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    className={`w-full pl-11 pr-10 py-3.5 bg-slate-50 border rounded-2xl text-sm font-medium outline-none transition-all
                    ${errors.password
                        ? "border-red-200 focus:ring-2 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" }
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* ROLE */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">
                  Role
                </label>

                <div className="relative group">
                  <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition" />

                  <select
                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold outline-none transition-all appearance-none cursor-pointer
                    ${errors.role
                        ? "border-red-200 focus:ring-2 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    }`}
                    {...register("role", { required: "Select role" })}
                  >
                    <option value="">Select Role</option>
                    <option value="TENANT">Tenant</option>
                    <option value="OWNER">Owner</option>
                  </select>
                </div>

                {errors.role && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

            </div>

            {/* BUTTONS */}
            <div className="pt-4 space-y-3">

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-2xl font-semibold text-sm hover:bg-blue-600 transition active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account <FiArrowRight />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => reset()}
                className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest transition"
              >
                <FiRotateCcw size={14} /> Reset Form
              </button>

            </div>

          </form>

          {/* FOOTER */}
          <div className="mt-8 pt-5 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-slate-800 hover:text-blue-600 transition"
              >
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Register;