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
      selectedFiles.forEach((file) => formData.append("images", file));

      await addProperty(formData);

      toast.success("Property Added Successfully");
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
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 space-y-8 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Add New Property
        </h2>

        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 mb-2">
            Basic Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Title"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.title && <span className="text-red-600 text-base mt-1">{errors.title.message}</span>}
            </div>

            <div className="flex flex-col">
              <input
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                type="number"
                min="0"
                onInput={preventNegative}
                placeholder="Price (NPR)"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.price && <span className="text-red-600 text-base mt-1">{errors.price.message}</span>}
            </div>

            <div className="flex flex-col">
              <select
                {...register("type", { required: "Type is required" })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Property Type</option>
                <option value="HOUSE">HOUSE</option>
                <option value="APARTMENT">APARTMENT</option>
                <option value="ROOM">ROOM</option>
              </select>
              {errors.type && <span className="text-red-600 text-base mt-1">{errors.type.message}</span>}
            </div>

            <div className="flex flex-col">
              <input
                {...register("area", { required: "Area is required" })}
                type="number"
                min="0"
                onInput={preventNegative}
                placeholder="Area (sq ft)"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.area && <span className="text-red-600 text-base mt-1">{errors.area.message}</span>}
            </div>
          </div>

          <div className="flex flex-col">
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Description"
              rows="4"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
            {errors.description && <span className="text-red-600 text-base mt-1">{errors.description.message}</span>}
          </div>
        </section>

        {/* Location Info */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 mb-2">
            Location Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {["district", "municipality", "wardNo", "tole"].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <input
                  {...register(field, { required: `${field} is required` })}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  type={["wardNo"].includes(field) ? "number" : "text"}
                  min="0"
                  onInput={preventNegative}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors[field] && <span className="text-red-600 text-base mt-1">{errors[field].message}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Property Details */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 mb-2">
            Property Details
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {["houseName", "bedrooms", "bathrooms", "houseNo"].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <input
                  {...register(field, { required: `${field} is required` })}
                  placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                  type={["bedrooms","bathrooms","houseNo","apartmentNo"].includes(field) ? "number" : "text"}
                  min="0"
                  onInput={preventNegative}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors[field] && <span className="text-red-600 text-base mt-1">{errors[field].message}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 mb-2">
            Additional Features
          </h3>
          <div className="flex gap-6 text-base">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("furnished")} className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2" />
              Furnished
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("parkingAvailable")} className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2" />
              Parking Available
            </label>
          </div>
        </section>

        {/* Images */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 mb-2">
            Upload Images 
          </h3>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          />
          <div className="flex gap-4 mt-2">
            {selectedFiles.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </section>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-700 transition-colors ${
            loading ? "cursor-not-allowed bg-gray-400" : ""
          }`}
        >
          {loading ? "Submitting..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;