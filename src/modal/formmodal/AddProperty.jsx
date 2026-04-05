import React, { useState, useRef, useCallback, useEffect } from "react";
import api from '../../service/api.js';
import { useForm } from "react-hook-form";
import { addProperty } from "../../service/ownerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import { Camera, Upload, X, ImageIcon, Car, Armchair } from "lucide-react";

const AddProperty = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  
  // States
  const [isUpdated, setIsUpdated] = useState(false);
  // CHANGED: State is now an array for 3 photos
  const [propertyImages, setPropertyImages] = useState([]); 
  const [citizenFront, setCitizenFront] = useState(null);
  const [citizenBack, setCitizenBack] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      furnished: false,
      parkingAvailable: false,
      available: true
    }
  });

  const updateStatus = async () => {
    try {
      const response = await api.get("/owner/get/status");
      if (response.status === 200) {
        setIsUpdated(response.data);
      }
    } catch (error) {
      console.error("Error fetching owner status", error);
    }
  };

  useEffect(() => {
    updateStatus();
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "passport_photo.jpg", { type: "image/jpeg" });
        setPassportPhoto(file);
        setShowCamera(false);
        toast.success("Photo captured!");
      });
  }, [webcamRef]);

  // ---------------- NEW MULTI-FILE HANDLER ----------------
  const handlePropertyPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (propertyImages.length + files.length > 3) {
      toast.error("You can only upload a maximum of 3 photos");
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast.error(`${file.name} is too heavy (max 5MB)`);
        return false;
      }
      return true;
    });

    setPropertyImages(prev => [...prev, ...validFiles]);
  };

  const removeImage = (index) => {
    setPropertyImages(prev => prev.filter((_, i) => i !== index));
  };

  // ---------------- SUBMIT ----------------
  const onSubmit = async (data) => {
    if (!isUpdated && (!citizenFront || !citizenBack || !passportPhoto)) {
      toast.error("Please provide all identity documents");
      return;
    }

    if (propertyImages.length === 0) {
        toast.error("Please upload at least one property photo");
        return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      // CHANGED: Append multiple images to the 'image' key (or 'images' depending on backend)
      propertyImages.forEach((file) => {
        formData.append("image", file);
      });

      if (!isUpdated) {
        formData.append("citizenFront", citizenFront);
        formData.append("citizenBack", citizenBack);
        formData.append("passportPhoto", passportPhoto);
      }

      await addProperty(formData);
      toast.success("Property Published Successfully!");
      navigate("/owner/dashboard");
    } catch (error) {
      toast.error(error.response?.data || "Failed to add property");
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
          <p className="text-gray-500 mt-2">Provide accurate details to attract verified tenants.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <section className={sectionStyle}>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-indigo-600 w-2 h-6 rounded-full" />
              <h3 className="text-lg font-bold text-gray-800">Property Details</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelStyle}>Property Title</label>
                <input {...register("title", { required: "Title is required" })} placeholder="2BHK Apartment" className={inputStyle} />
              </div>
              
              <div>
                <label className={labelStyle}>Price (NPR / Month)</label>
                <input {...register("price", { required: true })} type="number" step="0.01" className={inputStyle} />
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

              <div className="grid grid-cols-2 gap-4">
                <input {...register("bedrooms")} type="number" className={inputStyle} placeholder="Bedrooms" />
                <input {...register("bathrooms")} type="number" className={inputStyle} placeholder="Bathrooms" />
              </div>

              <div>
                <input {...register("area")} type="number" step="0.1" placeholder="Area (Sq. Ft.)" className={inputStyle} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="checkbox" {...register("furnished")} className="w-5 h-5 accent-indigo-600" />
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700"><Armchair size={18} /> Furnished</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="checkbox" {...register("parkingAvailable")} className="w-5 h-5 accent-indigo-600" />
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700"><Car size={18} /> Parking</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input {...register("houseNo")} placeholder="House No." className={inputStyle} />
              <textarea {...register("description")} rows="1" className={inputStyle} placeholder="Brief description..." />
            </div>
          </section>

          <section className={sectionStyle}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Location</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input {...register("district", { required: true })} placeholder="District" className={inputStyle} />
              <input {...register("municipality", { required: true })} placeholder="Municipality" className={inputStyle} />
              <input {...register("wardNo")} type="number" placeholder="Ward" className={inputStyle} />
              <input {...register("tole")} placeholder="Tole" className={inputStyle} />
            </div>
          </section>

          {!isUpdated && (
            <section className={sectionStyle}>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Owner Verification</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-indigo-400">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setCitizenFront(e.target.files[0])} />
                  <Upload className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs font-medium truncate">{citizenFront ? citizenFront.name : "Citizen Front"}</p>
                </div>
                <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-indigo-400">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setCitizenBack(e.target.files[0])} />
                  <Upload className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs font-medium truncate">{citizenBack ? citizenBack.name : "Citizen Back"}</p>
                </div>
                <div className="relative border-2 border-dashed border-indigo-200 bg-indigo-50 rounded-2xl p-4 text-center flex flex-col items-center justify-center">
                  {passportPhoto ? (
                    <img src={URL.createObjectURL(passportPhoto)} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" alt="Passport" />
                  ) : (
                    <button type="button" onClick={() => setShowCamera(true)} className="text-indigo-600 text-[10px] font-bold uppercase flex flex-col items-center"><Camera className="mb-1" /> Take Live Photo</button>
                  )}
                </div>
                <div>
                  <input {...register("phoneNo")} placeholder="Phone No" className={inputStyle} />
                </div>
              </div>
            </section>
          )}

          {/* 4. MULTIPLE PROPERTY PHOTOS */}
          <section className={sectionStyle}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Property Photos (Max 3)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {propertyImages.map((img, index) => (
                <div key={index} className="relative h-40">
                  <img 
                    src={URL.createObjectURL(img)} 
                    className="w-full h-full object-cover rounded-2xl border shadow-sm" 
                    alt={`Preview ${index}`} 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)} 
                    className="absolute -top-2 -right-2 bg-white shadow-md rounded-full p-1 text-red-500 hover:bg-red-50"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              
              {propertyImages.length < 3 && (
                <label className="h-40 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePropertyPhotoChange} 
                  />
                  <ImageIcon className="text-gray-400 w-8 h-8 mb-2" />
                  <span className="text-xs font-bold text-gray-500 uppercase">
                    {propertyImages.length === 0 ? "Upload Photos" : "Add More"}
                  </span>
                </label>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">* Each image must be under 5MB.</p>
          </section>

          {/* CAMERA MODAL */}
          {showCamera && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
              <div className="bg-white rounded-3xl overflow-hidden max-w-sm w-full">
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full" />
                <div className="p-4 flex gap-4">
                  <button type="button" onClick={() => setShowCamera(false)} className="flex-1 py-2 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="button" onClick={capture} className="flex-1 py-2 bg-indigo-600 text-white rounded-xl">Capture</button>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
            }`}
          >
            {loading ? "Uploading..." : "List Property Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;