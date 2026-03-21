import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCar,
  FaCouch,
} from "react-icons/fa";
import { getPropertyById } from "../../service/publicService";
import { toast } from "react-toastify";
import Modal from "../../modal/public/Modal";
import AddDetail from "../../modal/formmodal/AddDetail";

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  // ---------------- FETCH PROPERTY ----------------
  const fetchProperty = async () => {
    try {
      const response = await getPropertyById(id);

      const updated = {
        ...response.data,
        imageUrl: `http://localhost:8080/uploads/properties/${response.data.imageUrl}`,
      };

      setProperty(updated);
    } catch (error) {
      console.error("Error fetching property:", error);
      toast.error("Failed to load property");
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  // ---------------- BOOKING ----------------
  const handleBooking = () => {
    if (role === "TENANT") {
      setIsModalOpen(true);
    } else {
      toast.error("Please login to your account first");
      navigate("/login");
    }
  };

  if (!property) {
    return <p className="text-center py-10">Loading property...</p>;
  }

  return (
    <section className="max-w-7xl shadow mx-auto px-6 py-10 bg-gray-100">
      {/* ---------------- TITLE ---------------- */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
          <p className="flex items-center gap-2 text-gray-600 mt-2">
            <FaMapMarkerAlt className="text-blue-600" />
            {property.tole}, {property.municipality}, {property.district}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-semibold text-blue-600">
            Rs. {property.price}
          </p>
          <span
            className={`inline-block mt-2 px-4 py-1 rounded-full text-sm ${
              property.bookingStatus === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {property.bookingStatus}
          </span>
        </div>
      </div>

      {/* ---------------- IMAGE ---------------- */}
      <div className="mb-10">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-[420px] object-cover rounded-xl shadow"
        />
      </div>

      {/* ---------------- DETAILS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* FEATURES */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="flex flex-wrap gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <FaBed className="text-blue-600" />
                {property.bedrooms} Bedrooms
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-blue-600" />
                {property.bathrooms} Bathrooms
              </div>
              <div className="flex items-center gap-2">
                <FaRulerCombined className="text-blue-600" />
                {property.area} sqft
              </div>
              <div className="flex items-center gap-2">
                <FaCouch className="text-blue-600" />
                {property.furnished ? "Furnished" : "Not Furnished"}
              </div>
              <div className="flex items-center gap-2">
                <FaCar className="text-blue-600" />
                {property.parkingAvailable ? "Parking Available" : "No Parking"}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {property.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white shadow rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
          <p className="font-medium text-gray-700">{property.ownerName}</p>

          {/* BUTTONS */}
          <div className="mt-6 space-y-3">
            {/* <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"> */}
              {/* Contact Owner */}
            {/* </button> */}

            {property.bookingStatus === "AVAILABLE" ? (
              <button
                className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition"
                onClick={handleBooking}
              >
                Book Now
              </button>
            ) : (
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg opacity-50 cursor-not-allowed"
                disabled
              >
                {property.bookingStatus}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- MAP (NO API) ---------------- */}
      <div className="bg-white shadow rounded-xl p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Property Location</h2>

        {/* Address text (important) */}
        <p className="text-gray-600 mb-3">
          {property.tole}, {property.municipality}-{property.wardNo}, {property.district},
          Nepal
        </p>

        <iframe
          title="map"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px" }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            `${property.municipality}, ${property.district}, Nepal`,
          )}&z=15&output=embed`}
        ></iframe>
      </div>

      {/* ---------------- MODAL ---------------- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddDetail id={property.id} />
      </Modal>
    </section>
  );
};

export default PropertyDetails;
