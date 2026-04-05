import React, { useState } from 'react';
import { verifyEmail } from '../../service/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (token.length !== 6) {
      return toast.warning("Please enter the 6-digit code.");
    }

    setLoading(true);
    try {
      const response = await verifyEmail(token);
      if (response.status === 200) {
        toast.success("Verification successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Removed min-h-screen and background to fit inside your Modal component */
    <div className="w-full max-w-sm mx-auto p-4 bg-white">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-800">Verify Email</h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter the 6-digit code sent to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="flex flex-col items-center">
          <input
            type="text"
            maxLength={6}
            value={token}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setToken(val);
            }}
            placeholder="000000"
            className="w-full text-center text-2xl font-bold tracking-[0.3em] py-2 border-b-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-transparent transition-colors"
          />
          <label className="mt-2 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
            Verification Code
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || token.length !== 6}
          className={`w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all ${
            loading || token.length !== 6
              ? 'bg-slate-200 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100'
          }`}
        >
          {loading ? "Verifying..." : "Confirm"}
        </button>
      </form>

      <div className="mt-6 text-center border-t border-slate-50 pt-4">
        <p className="text-xs text-slate-500">
          No code?{' '}
          <button 
            type="button"
            className="font-bold text-blue-600 hover:text-blue-500"
            onClick={() => toast.info("Resending code...")}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;