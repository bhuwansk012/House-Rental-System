import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { createBooking } from "../../service/bookService";
const AddDetail = ({id}) => {


  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();



  const onSubmit = async(data) => {
    try {
      await createBooking(id,data);
      toast.success("Property  booking requesting has been submitted successfully!");
      reset();
      navigate("/properties");
    } catch (error) {
      toast.error("Failed to save details");
      console.error(error);
      return;
    }
    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-md bg-transparent">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Property Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter address"
            {...register("address", { required: "Address is required" })}
            className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm bg-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>


        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            placeholder="Enter phone number"
            {...register("phone", { required: "Phone is required" })}
            className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm bg-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
        >
          Add Details
        </button>
      </form>
    </div>
  );
};

export default AddDetail;