import React, { useState, useEffect } from "react";
import {
  getOwnerProperty,
  deleteOwnerProperty
} from "../../service/ownerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyProperty = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  // FETCH PROPERTIES CORRECTLY
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getOwnerProperty();

        // Convert imageUrl string → images array
        const formatted = data.map((p) => ({
          ...p,
          images: p.imageUrl
            ? p.imageUrl.split(",").map(
                (img) =>
                  `http://localhost:8080/uploads/properties/${img}`
              )
            : [],
        }));

        setProperties(formatted);
        console.log(formatted);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load properties");
      }
    };

    fetchProperties();
  }, []);

  const handleEdit = (id) => {
    navigate(`/owner/edit-property/${id}`);
  };

  // DELETE FROM BACKEND
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteOwnerProperty(id);
        setProperties(properties.filter((p) => p.id !== id));
        toast.success("Property deleted successfully");
      } catch (error) {
        toast.error("Failed to delete property");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Banner */}
      {properties.length > 0 &&
        properties[0].images &&
        properties[0].images.length > 0 && (
          <div className="w-full h-64 md:h-96 relative">
            <img
              src={properties[0].images[0]}
              alt="Page Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
              <h1 className="text-orange-500 text-3xl md:text-5xl font-bold text-center">
                Welcome to Your Property Page
              </h1>
            </div>
          </div>
        )}

      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold">My Properties</h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Search property..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer">
              Search
            </button>
            <button
              onClick={() => navigate("/owner/add-property")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
            >
              Add New Property
            </button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p className="text-gray-600 col-span-full">
              No properties found.
            </p>
          ) : (
            properties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                {/* Property Image */}
                {prop.images && prop.images.length > 0 && (
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{prop.title}</h3>
                  <p className="text-sm text-gray-500">
                    {prop.type} • Rs. {prop.price}
                  </p>

                  <div className="flex gap-2 mt-2 text-xs text-gray-600">
                    <span>{prop.bedrooms} Beds</span>
                    <span>{prop.bathrooms} Baths</span>
                    <span>{prop.area} sqft</span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {prop.district}, {prop.municipality}{" "}
                    {prop.tole && `• ${prop.tole}`}
                  </p>

                  {/* Badges */}
                  <div className="flex gap-2 mt-2 text-xs flex-wrap">
                    {prop.furnished && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Furnished
                      </span>
                    )}
                    {prop.parkingAvailable && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Parking
                      </span>
                    )}

                    {/* FIXED STATUS LOGIC */}
                    <span
                      className={`px-2 py-1 rounded-full ${
                        prop.bookingStatus === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {prop.bookingStatus}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(prop.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition cursor-pointer"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/property/details/${prop.id}`)
                      }
                      className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProperty;