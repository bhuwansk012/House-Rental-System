import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../service/authService";
import { motion } from "framer-motion";
import { getOwnerDocument as fetchDocumentService } from "../../service/ownerService";
import {
  FiUser,
  FiMail,
  FiShield,
  FiLogOut,
  FiPhone,
  FiFileText
} from "react-icons/fi";

const OwnerProfile = () => {
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [isAuthenticated, navigate]);

  const fetchData = async () => {
    try {
      const response = await fetchDocumentService();

      const formattedDocument = {
        ...response.data,
        frontDoc: response.data.fdocImg
          ? `http://localhost:8080/uploads/documents/${response.data.fdocImg}`
          : null,
        backDoc: response.data.bdocImg
          ? `http://localhost:8080/uploads/documents/${response.data.bdocImg}`
          : null,
        passPhotoUrl: response.data.passPhoto
          ? `http://localhost:8080/uploads/documents/${response.data.passPhoto}`
          : null,
      };

      setDocument(formattedDocument);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile documents");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 md:px-10 lg:px-20 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white rounded-3xl shadow-xl p-6 md:p-10"
      >
        {/* ================= TOP SECTION ================= */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8">
          {/* Profile Image */}
          {document?.passPhotoUrl ? (
            <img
              src={document.passPhotoUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-400 object-cover shadow-md"
            />
          ) : (
            <div className="w-32 h-32 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-md">
              <FiUser size={60} />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold">{name || "User Name"}</h2>
            <p className="text-gray-500 uppercase text-sm mt-1">{role}</p>

            <div className="flex flex-col md:flex-row gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <FiMail />
                <span>{email}</span>
              </div>

              <div className="flex items-center gap-2 justify-center md:justify-start">
                <FiPhone />
                <span>{document?.phone || "No phone added"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MIDDLE SECTION ================= */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <FiShield className="text-indigo-600" />
            Identity Verification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Front Document */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-1">
                <FiFileText /> Front-side Citizenship
              </p>

              <div className="h-80 border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                {document?.frontDoc ? (
                  <img
                    src={document.frontDoc}
                    alt="Front Document"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            {/* Back Document */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-1">
                <FiFileText /> Back-side Citizenship
              </p>

              <div className="h-80 border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                {document?.backDoc ? (
                  <img
                    src={document.backDoc}
                    alt="Back Document"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= NOTE ================= */}
        <div className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
          <strong>Note:</strong> These documents are used for identity
          verification only. To update them, please contact the administrator.
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-10 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center gap-2 text-lg transition shadow-md"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OwnerProfile;