import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowRight, FiRotateCcw } from "react-icons/fi";
import { motion } from "framer-motion";
import { loginService } from "../../service/authService";

const Login = () => {
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
      const response = await loginService(data);

      if (response.status === 200) {
        toast.success(response.data.message);

        sessionStorage.setItem("email", response.data.email);
        sessionStorage.setItem("isAuthenticated", true);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("name", response.data.fullName);

        if (response.data.role === "ADMIN") navigate("/admin/dashboard");
        else if (response.data.role === "OWNER") navigate("/owner/dashboard");
        else navigate("/");
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 401) toast.error("Invalid Email or Password");
      else toast.error("Connection error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >

        <div className="bg-white rounded-3xl shadow-xl border border-white p-8 md:p-10">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Welcome <span className="text-blue-600">Back</span>
            </h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">
                Email Address
              </label>

              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition" />

                <input
                  type="email"
                  placeholder="alex@example.com"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm font-medium text-slate-700 outline-none transition-all
                  ${errors.email
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  }`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Password
                </label>

                <Link
                  to="/forget-password"
                  className="text-[11px] font-semibold text-blue-500 hover:text-blue-700 transition"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-3.5 bg-slate-50 border rounded-2xl text-sm font-medium text-slate-700 outline-none transition-all
                  ${errors.password
                      ? "border-red-200 focus:ring-2 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  }`}
                  {...register("password", { required: "Password is required" })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="pt-3 space-y-3">

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-2xl font-semibold text-sm hover:bg-blue-600 transition active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logining...
                  </span>
                ) : (
                  <>
                    Sign In <FiArrowRight />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => reset()}
                className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest transition"
              >
                <FiRotateCcw size={14} /> Clear Form
              </button>

            </div>

          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center border-t border-slate-100 pt-5">
            <p className="text-sm text-slate-500 font-medium">
              New here?{" "}
              <Link
                to="/register"
                className="font-bold text-slate-800 hover:text-blue-600 transition"
              >
                Create an account
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;