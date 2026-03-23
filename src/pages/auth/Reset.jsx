import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { reset } from "../../service/authService";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock } from "lucide-react"; // Modern icon library

const Reset = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false); // Toggle State

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const response = await reset(token, data.password);
      if (response.status === 200) {
        toast.success("Password reset successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Network error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 transition-colors duration-500">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 transform transition-all">
        
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-indigo-600 w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">New Password</h2>
          <p className="text-slate-500 text-sm mt-1">Ensure it's at least 6 characters long.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          
          {/* PASSWORD FIELD */}
          <div className="relative group">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Too short!" }
              })}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 pr-12 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
            />
            {/* Toggle Icon with Animation */}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 p-1 text-slate-400 hover:text-indigo-600 transition-colors duration-200"
            >
              <div className="transform transition-transform duration-200 active:scale-75">
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </button>
            {errors.password && (
              <p className="mt-1 text-xs font-medium text-red-500 animate-pulse">{errors.password.message}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD FIELD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: "Required" })}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs font-medium text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative overflow-hidden group bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            <span className={loading ? "opacity-0" : "opacity-100"}>Update Password</span>
            
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;