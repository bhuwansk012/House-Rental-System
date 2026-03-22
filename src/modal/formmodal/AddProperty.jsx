import React, { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { addProperty } from "../../service/ownerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import { Camera, Upload, X, CheckCircle, Image as ImageIcon } from "lucide-react";

const AddProperty = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  // States
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [citizenFront, setCitizenFront] = useState(null);
  const [citizenBack, setCitizenBack] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm();
  const propertyType = watch("type");

  // ---------------- CAMERA LOGIC ----------------
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Convert base64 to File object to keep it consistent with other uploads
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "passport_photo.jpg", { type: "image/jpeg" });
        setPassportPhoto(file);
        setShowCamera(false);
        toast.success("Photo captured!");
      });
  }, [webcamRef]);

  // ---------------- FILE HANDLERS ----------------
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 5) {
      toast.warning("Maximum 5 property images allowed");
      return;
    }
    setSelectedFiles([...selectedFiles, ...files]);
  };

  // ---------------- SUBMIT ----------------
  const onSubmit = async (data) => {
    if (!citizenFront || !citizenBack || !passportPhoto) {
      toast.error("Missing identity documents or live photo");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      selectedFiles.forEach(file => formData.append("images", file));
      formData.append("citizenFront", citizenFront);
      formData.append("citizenBack", citizenBack);
      formData.append("passportPhoto", passportPhoto);

      await addProperty(formData);
      toast.success("Property Published Successfully!");
      navigate("/owner/dashboard");
    } catch (error) {
      toast.error("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  const sectionStyle = "bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4";
  const inputStyle = "w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none bg-gray-50";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1 ml-1";

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">List Your Property</h1>
          <p className="text-gray-500 mt-2">Fill in the details below to reach thousands of potential tenants.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* 1. BASIC INFO */}
          <section className={sectionStyle}>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-indigo-600 w-2 h-6 rounded-full" />
              <h3 className="text-lg font-bold text-gray-800">Basic Details</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Property Title</label>
                <input {...register("title", { required: true })} placeholder="e.g. Modern 2BHK Apartment" className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>Price (NPR / Month)</label>
                <input {...register("price", { required: true })} type="number" placeholder="0.00" className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>Property Type</label>
                <select {...register("type", { required: true })} className={inputStyle}>
                  <option value="">Select Type</option>
                  <option value="HOUSE">House</option>
                  <option value="APARTMENT">Apartment</option>
                  <option value="ROOM">Single Room</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Area (Sq. Ft.)</label>
                <input {...register("area", { required: true })} type="number" placeholder="e.g. 1200" className={inputStyle} />
              </div>
            </div>
            <div>
              <label className={labelStyle}>Description</label>
              <textarea {...register("description")} rows="3" className={inputStyle} placeholder="Tell us about the amenities, neighborhood, etc." />
            </div>
          </section>

          {/* 2. LOCATION */}
          <section className={sectionStyle}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Location Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input {...register("district")} placeholder="District" className={inputStyle} />
              <input {...register("municipality")} placeholder="Municipality" className={inputStyle} />
              <input {...register("wardNo")} placeholder="Ward" className={inputStyle} />
              <input {...register("tole")} placeholder="Tole/Street" className={inputStyle} />
            </div>
          </section>

          {/* 3. IDENTITY VERIFICATION (WITH CAMERA) */}
          <section className={sectionStyle}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Identity Verification</h3>
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Citizenship Front */}
              <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-indigo-400 transition-colors">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setCitizenFront(e.target.files[0])} />
                <Upload className="mx-auto text-gray-400 mb-2" />
                <p className="text-xs font-medium text-gray-600">{citizenFront ? citizenFront.name : "Citizenship Front"}</p>
                {citizenFront && <CheckCircle className="absolute top-2 right-2 text-green-500 w-5 h-5" />}
              </div>

              {/* Citizenship Back */}
              <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-indigo-400 transition-colors">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setCitizenBack(e.target.files[0])} />
                <Upload className="mx-auto text-gray-400 mb-2" />
                <p className="text-xs font-medium text-gray-600">{citizenBack ? citizenBack.name : "Citizenship Back"}</p>
                {citizenBack && <CheckCircle className="absolute top-2 right-2 text-green-500 w-5 h-5" />}
              </div>

              {/* LIVE PASSPORT PHOTO */}
              <div className="relative border-2 border-dashed border-indigo-200 bg-indigo-50 rounded-2xl p-4 text-center flex flex-col items-center justify-center">
                {passportPhoto ? (
                  <div className="relative">
                    <img src={URL.createObjectURL(passportPhoto)} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500" alt="Passport" />
                    <button type="button" onClick={() => setPassportPhoto(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={12}/></button>
                    <p className="text-xs mt-1 text-indigo-600 font-bold">Photo Ready</p>
                  </div>
                ) : (
                  <button type="button" onClick={() => setShowCamera(true)} className="text-indigo-600 flex flex-col items-center">
                    <Camera className="mb-1" />
                    <span className="text-xs font-bold uppercase tracking-wider">Take Live Photo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Camera Modal */}
            {showCamera && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                <div className="bg-white rounded-3xl overflow-hidden max-w-sm w-full relative">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-auto"
                    videoConstraints={{ facingMode: "user" }}
                  />
                  <div className="p-6 flex justify-between gap-4">
                    <button type="button" onClick={() => setShowCamera(false)} className="flex-1 py-2 bg-gray-100 rounded-xl font-semibold">Cancel</button>
                    <button type="button" onClick={capture} className="flex-1 py-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200">Capture</button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 4. PROPERTY IMAGES */}
          <section className={sectionStyle}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Property Images</h3>
            <div className="flex flex-wrap gap-4">
              <label className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                <input type="file" multiple className="hidden" onChange={handleFileChange} />
                <ImageIcon className="text-gray-400 w-6 h-6" />
                <span className="text-[10px] mt-1 font-bold text-gray-500">ADD</span>
              </label>

              {selectedFiles.map((file, idx) => (
                <div key={idx} className="relative w-24 h-24">
                  <img src={URL.createObjectURL(file)} className="w-full h-full object-cover rounded-2xl border" alt="preview" />
                  <button 
                    type="button" 
                    onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute -top-2 -right-2 bg-white shadow-md rounded-full p-1 text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all transform active:scale-[0.98] ${
              loading ? "bg-gray-400" : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-indigo-200"
            }`}
          >
            {loading ? "Processing..." : "Publish Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;