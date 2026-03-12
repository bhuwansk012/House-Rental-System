import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col ">

      {/* Image */}
      <div className="relative">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-56 object-cover"
        />

        {/* Status */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full
          ${
            item.bookingStatus === "AVAILABLE"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {item.bookingStatus}
        </span>

        {/* Type */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          {item.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">

        <h2 className="text-lg font-semibold text-gray-800">
          {item.title}
        </h2>

        <p className="text-gray-500 text-sm">
          {item.tole}, {item.municipality}
        </p>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-grow">
          {item.description || "No description available"}
        </p>

        {/* Features */}
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <span>{item.bedrooms} Beds</span>
          <span>{item.bathrooms} Baths</span>
          <span>{item.area} sqft</span>
        </div>

        {/* Price + Button */}
        <div className="mt-5 flex justify-between items-center">
          <p className="text-orange-500 font-bold text-lg">
            Rs. {item.price}
          </p>

          <Button
            text="View"
            handleClick={() => navigate(`/property-details/${item.id}`)}
          />
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;