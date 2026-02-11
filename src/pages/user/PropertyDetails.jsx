import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
} from "react-icons/fa";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

/* ------------------ DEMO DATA ------------------ */
const demoProperty = {
  id: 1,
  title: "Modern 2BHK Apartment",
  price: "Rs. 25,000 / month",
  location: "New Baneshwor, Kathmandu",
  status: "Available",
  beds: 2,
  baths: 1,
  area: "950 sq.ft",
  description:
    "This modern 2BHK apartment is located in the prime area of New Baneshwor. Ideal for families and professionals with easy access to schools, hospitals, and public transport.",
  amenities: [
    "Parking",
    "24/7 Water Supply",
    "Balcony",
    "Security",
    "Lift",
  ],
  owner: {
    name: "Ram Prasad Sharma",
    phone: "98XXXXXXXX",
    email: "owner@example.com",
  },
  images: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  ],
};

/* ------------------ MAP STYLE ------------------ */
const mapContainerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "12px",
};

const PropertyDetails = () => {
  const [position, setPosition] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  /* -------- Convert Location Name → Lat/Lng -------- */
  useEffect(() => {
    if (!isLoaded || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: demoProperty.location },
      (results, status) => {
        if (status === "OK") {
          const { lat, lng } = results[0].geometry.location;
          setPosition({ lat: lat(), lng: lng() });
        }
      }
    );
  }, [isLoaded]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* ---------------- TITLE ---------------- */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {demoProperty.title}
          </h1>
          <p className="flex items-center gap-2 text-gray-600 mt-2">
            <FaMapMarkerAlt className="text-blue-600" />
            {demoProperty.location}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-semibold text-blue-600">
            {demoProperty.price}
          </p>
          <span className="inline-block mt-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            {demoProperty.status}
          </span>
        </div>
      </div>

      {/* ---------------- IMAGES ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {demoProperty.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Property"
            className="w-full h-64 object-cover rounded-xl"
          />
        ))}
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
                <FaBed className="text-blue-600" /> {demoProperty.beds} Bedrooms
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-blue-600" /> {demoProperty.baths} Bathroom
              </div>
              <div className="flex items-center gap-2">
                <FaRulerCombined className="text-blue-600" /> {demoProperty.area}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {demoProperty.description}
            </p>
          </div>

          {/* AMENITIES */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {demoProperty.amenities.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white shadow rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
          <p className="font-medium text-gray-700">
            {demoProperty.owner.name}
          </p>
          <p className="text-gray-600 mt-1">📞 {demoProperty.owner.phone}</p>
          <p className="text-gray-600 mt-1">✉️ {demoProperty.owner.email}</p>

          <div className="mt-6 space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Contact Owner
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition">
              Book Visit
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- GOOGLE MAP (LAST) ---------------- */}
      <div className="bg-white shadow rounded-xl p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Property Location</h2>

        {!isLoaded && <p>Loading map...</p>}

        {isLoaded && position && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={position}
            zoom={15}
          >
            <Marker position={position} />
          </GoogleMap>
        )}
      </div>
    </section>
  );
};

export default PropertyDetails;
