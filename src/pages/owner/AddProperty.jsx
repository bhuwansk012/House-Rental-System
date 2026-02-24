import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addProperty } from "../../service/ownerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProperty = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 2) {
      toast.warning("Maximum 2 images allowed");
      return;
    }
    setSelectedFiles(files);
  };

  const preventNegative = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
      setValue(e.target.name, 0);
    }
  };

  const onSubmit = async (data) => {
    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      selectedFiles.forEach(file => formData.append("images", file));
      await addProperty(formData);
      toast.success("Property Added Successfully 🎉");
      reset();
      setSelectedFiles([]);
      setTimeout(() => navigate("/owner/my-property"), 1500);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-90vh bg-gray-100 py-6 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow border border-black"
      >
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Add New Property</h2>

        {/* BASIC INFO */}
        <h3 className="text-sm font-semibold mb-2 text-black border-l-2 border-black pl-2">Basic Information</h3>
        
        <div className="grid md:grid-cols-2 gap-3 mb-4">


          <input {...register("title", { required: "Title is required" })} 
          placeholder="Title" 
          className="border border-black rounded px-2 py-1 text-xs
           bg-white text-black w-full outline-none" />
          {errors.title && 
          <span className="text-red-600 text-xs">{errors.title.message}</span>}


          <input {...register("price", { required: "Price is required" })} 
          type="number" min="0" onInput={preventNegative} 
          placeholder="Price (NPR)" 
          className="border border-black rounded px-2 py-1 text-xs
           bg-white text-black w-full outline-none" />
          {errors.price && 
          <span className="text-red-600 text-xs">{errors.price.message}</span>}


          <select {...register("type", { required: "Type is required" })} 
          className="border border-black rounded px-2 py-1 text-xs
           bg-white text-black w-full outline-none">
            <option value="">Property Type</option>
            <option value="HOUSE">HOUSE</option>
            <option value="APARTMENT">APARTMENT</option>
            <option value="ROOM">ROOM</option>
          </select>
          {errors.type && <span className="text-red-600 text-xs">{errors.type.message}</span>}
          <input {...register("area", { required: "Area is required" })} type="number" min="0"
           onInput={preventNegative} placeholder="Area (sq ft)" 
           className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
          {errors.area && <span className="text-red-600 text-xs">{errors.area.message}</span>}
        </div>

        <textarea {...register("description")} placeholder="Description" rows="3" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none mb-4" />

        {/* LOCATION */}
        <h3 className="text-sm font-semibold mb-2 text-black border-l-2 border-black pl-2">Location Information</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <input {...register("district", { required: "District required" })} placeholder="District" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
          <input {...register("municipality", { required: "Municipality required" })} placeholder="Municipality" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
          <input {...register("wardNo")} type="number" min="0" onInput={preventNegative} placeholder="Ward No" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
          <input {...register("tole")} placeholder="Tole" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
        </div>

        {/* DETAILS */}
        <h3 className="text-sm font-semibold mb-2 text-black border-l-2 border-black pl-2">Property Details</h3>
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <input {...register("houseName")} placeholder="House Name" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
          <input {...register("bedrooms")} type="number" min="0" onInput={preventNegative} placeholder="Bedrooms" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
          <input {...register("bathrooms")} type="number" min="0" onInput={preventNegative} placeholder="Bathrooms" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
          <input {...register("houseNo")} type="number" min="0" onInput={preventNegative} placeholder="House No" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
          <input {...register("apartmentNo")} type="number" min="0" onInput={preventNegative} placeholder="Apartment No" className="border border-black rounded px-2 py-1 text-xs bg-white text-black w-full outline-none" />
        </div>

        {/* FEATURES */}
        <h3 className="text-sm font-semibold mb-2 text-black border-l-2 border-black pl-2">Additional Features</h3>
        <div className="flex flex-wrap gap-4 mb-4 text-black text-xs">
          <label className="flex items-center gap-1">
            <input type="checkbox" {...register("furnished")} className="w-4 h-4 border-black" />
            Furnished
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" {...register("parkingAvailable")} className="w-4 h-4 border-black" />
            Parking Available
          </label>
        </div>

        {/* IMAGES */}
        <h3 className="text-sm font-semibold mb-2 text-black border-l-2 border-black pl-2">Upload Images (Max 2)</h3>
        <input type="file" multiple onChange={handleFileChange} className="mb-4 w-full border border-black rounded px-2 py-1 text-xs bg-white" />

        {/* SUBMIT */}
        <button type="submit" disabled={loading} className={`w-full py-2 rounded text-white font-semibold text-xs bg-black hover:bg-gray-800 transition-colors ${loading ? "cursor-not-allowed bg-gray-500" : ""}`}>
          {loading ? "Submitting..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;