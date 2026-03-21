import React, { useState, useEffect } from "react";
import { getOwnerProperty, deleteOwnerProperty } from "../../service/ownerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../modal/public/Modal"; 
import AddProperty from "../../modal/formmodal/AddProperty";

const MyProperty = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ---------------- FETCH PROPERTIES ----------------
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getOwnerProperty();

        // Format images and reverse for latest property first
        const formatted = [...data].reverse().map((p) => ({
          ...p,
          images: p.imageUrl
            ? [...p.imageUrl.split(",")].reverse().map(
                (img) => `http://localhost:8080/uploads/properties/${img}`
              )
            : [],
        }));

        setProperties(formatted);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load properties");
      }
    };

    fetchProperties();
  }, []);

  // ---------------- EDIT ----------------
  const handleEdit = (id) => {
    navigate(`/owner/edit-property/${id}`);
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    try {
      const prop = properties.find((p) => p.id === id);

      if (!prop) return;

      // Prevent deleting booked property
      if (prop.bookingStatus === "BOOKED") {
        toast.error("Cannot delete a booked property");
        return;
      }

      await deleteOwnerProperty(id);
      setProperties(properties.filter((p) => p.id !== id));
      toast.success("Property deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete property");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* PAGE BANNER */}
      {properties.length > 0 && properties[0].images.length > 0 && (
        <div className="w-full h-64 md:h-96 relative">
          <img
            src={properties[0].images[0]}
            alt="Page Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-orange-500 text-3xl md:text-5xl font-bold text-center">
              Welcome to Your Property Page
            </h1>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold">My Properties</h2>

          {/* ADD PROPERTY */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Add New Property
          </button>
        </div>

        {/* PROPERTY GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p className="text-gray-600 col-span-full">No properties found.</p>
          ) : (
            properties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                {/* IMAGE */}
                {prop.images.length > 0 && (
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  {/* TITLE */}
                  <h3 className="text-lg font-semibold">{prop.title}</h3>
                  <p className="text-sm text-gray-500">
                    {prop.type} • Rs. {prop.price}
                  </p>

                  {/* FEATURES */}
                  <div className="flex gap-2 mt-2 text-xs text-gray-600">
                    <span>{prop.bedrooms} Beds</span>
                    <span>{prop.bathrooms} Baths</span>
                    <span>{prop.area} sqft</span>
                  </div>

                  {/* ADDRESS */}
                  <p className="text-sm text-gray-500 mt-1">
                    {prop.district}, {prop.municipality}{" "}
                    {prop.tole && `• ${prop.tole}`}
                  </p>

                  {/* BADGES */}
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

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                      onClick={() => handleEdit(prop.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(prop.id)}
                      className={`text-white px-3 py-1 rounded text-sm transition cursor-pointer ${
                        prop.bookingStatus === "BOOKED"
                          ? "bg-gray-400 cursor-not-allowed disabled"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      disabled={prop.bookingStatus === "BOOKED"}
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

      {/* ADD PROPERTY MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProperty />
      </Modal>
    </div>
  );
};

export default MyProperty;