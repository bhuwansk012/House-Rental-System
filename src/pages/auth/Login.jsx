import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeSlash, FiMail, FiLock, FiArrowRight, FiRotateCcw } from "react-icons/fi";
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
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-8 md:p-12">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
              Welcome <span className="text-blue-600">Back</span>
            </h1>
            <p className="text-slate-500 font-medium">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-4 block">
                Work Email
              </label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="alex@example.com"
                  className={`w-full pl-12 pr-6 py-4 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                    ${errors.email ? "border-red-200 focus:ring-4 focus:ring-red-500/5" : "border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
                  `}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase ml-4">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-4 pr-4">
                <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 block">
                  Security Code
                </label>
                <Link to="/forget-password" size={18} className="text-[11px] font-black uppercase text-blue-500 hover:text-blue-700 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                    ${errors.password ? "border-red-200 focus:ring-4 focus:ring-red-500/5" : "border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
                  `}
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <FiEyeSlash size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase ml-4">{errors.password.message}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? "Authenticating..." : (
                  <>
                    Sign In <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => reset()}
                className="w-full py-3 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 flex items-center justify-center gap-2 transition-colors"
              >
                <FiRotateCcw size={14} /> Clear Form
              </button>
            </div>

          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-slate-400 text-sm font-medium">
              New here?{" "}
              <Link to="/register" className="text-slate-800 font-black hover:text-blue-600 transition-colors">
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