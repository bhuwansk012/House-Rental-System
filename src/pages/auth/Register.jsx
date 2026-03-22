import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../service/authService";
import { FiEye, FiEyeSlash, FiUser, FiMail, FiLock, FiBriefcase, FiArrowRight, FiRotateCcw } from "react-icons/fi";
import { motion } from "framer-motion";

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
      toast.error(typeof errorMsg === 'string' ? errorMsg : "Network Error!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-emerald-100 rounded-full blur-[100px] opacity-40" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] bg-blue-100 rounded-full blur-[100px] opacity-40" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[500px] z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
              Join the <span className="text-blue-600">Platform</span>
            </h1>
            <p className="text-slate-500 font-medium">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 block">Full Name</label>
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700 ${
                    errors.fullName ? "border-red-200 focus:ring-4 focus:ring-red-500/5" : "border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  }`}
                  {...register("fullName", { required: "Name is required", minLength: { value: 3, message: "Minimum 3 characters" }})}
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-[10px] font-bold ml-4 uppercase tracking-tighter">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 block">Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700 ${
                    errors.email ? "border-red-200 focus:ring-4 focus:ring-red-500/5" : "border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  }`}
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                  })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold ml-4 uppercase tracking-tighter">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 block">Password</label>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    className={`w-full pl-11 pr-10 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700 ${
                      errors.password ? "border-red-200 focus:ring-4 focus:ring-red-500/5" : "border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }`}
                    {...register("password", { 
                      required: "Required", 
                      minLength: { value: 6, message: "Min 6 chars" }
                    })}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <FiEyeSlash size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[10px] font-bold ml-4 uppercase tracking-tighter">{errors.password.message}</p>}
              </div>

              {/* Role Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 block">I am a...</label>
                <div className="relative group">
                  <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <select
                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer ${
                      errors.role ? "border-red-200 focus:ring-4 focus:ring-red-500/5" : "border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }`}
                    {...register("role", { required: "Select role" })}
                  >
                    <option value="">Role</option>
                    <option value="TENANT">TENANT</option>
                    <option value="OWNER">OWNER</option>
                  </select>
                </div>
                {errors.role && <p className="text-red-500 text-[10px] font-bold ml-4 uppercase tracking-tighter">{errors.role.message}</p>}
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col gap-3 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? "Creating Account..." : (
                  <>
                    Create Account <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => reset()}
                className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-rose-500 flex items-center justify-center gap-2 transition-colors py-2"
              >
                <FiRotateCcw /> Reset Form
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-4">
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