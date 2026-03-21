import React, { useEffect, useState } from "react";
import { getAllOwnerBookings, updateBookingAccept, updateBookingReject } from "../../service/bookService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { FaHome, FaUser, FaMapMarkerAlt, FaBed, FaBath, FaCar, FaIdBadge, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { button } from "framer-motion/client";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  // ---------------- FETCH BOOKINGS ----------------
  const fetchBookings = async () => {
    try {
      const response = await getAllOwnerBookings();

      setBookings([...response.data].reverse());
    } catch (error) {
      toast.error("Failed to load bookings");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ---------------- ACCEPT / REJECT ----------------
  const handleAccept = async (id) => {
    try {
      await updateBookingAccept(id);
      toast.success("Booking accepted successfully");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to accept booking");
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateBookingReject(id);
      toast.success("Booking rejected successfully");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to reject booking");
      console.error(error);
    }
  };

  if (bookings.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        No bookings found
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Booking Requests
      </h1>

      {bookings.map((booking) => {
        //  Show last image first
        const propertyImages = booking.property.images?.length
          ? [...booking.property.images].reverse()
          : booking.property.imageUrl
          ? [`http://localhost:8080/uploads/properties/${booking.property.imageUrl}`]
          : [];

        return (
          <div
            key={booking.id}
            className="flex flex-col md:flex-row gap-6 p-6 mb-8 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition"
          >
            {/* IMAGE */}
            <div className="md:w-1/3">
              <img
                src={propertyImages[0]}
                alt={booking.property.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>

            {/* CONTENT */}
            <div className="md:w-2/3">
              {/* STATUS */}
              <div className="flex gap-3 mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {booking.status}
                </span>
              </div>

              {/* PROPERTY DETAILS */}
              <div className="mb-4">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                  <FaHome /> Property Details
                </h2>

                <p className="mt-1 text-gray-500 text-sm flex items-center gap-1">
                  <FaIdBadge /> Property ID: {booking.property.id}
                </p>

                <p className="mt-1 text-lg font-semibold">{booking.property.title}</p>
                <p className="text-gray-600">Rs. {booking.property.price}</p>

                <p className="flex items-center gap-1 text-gray-500">
                  <FaMapMarkerAlt />
                  {booking.property.district}, {booking.property.municipality}, Ward {booking.property.wardNo}, {booking.property.tole}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 text-sm">
                  <p className="flex items-center gap-1">
                    <FaBed /> {booking.property.bedrooms} Beds
                  </p>
                  <p className="flex items-center gap-1">
                    <FaBath /> {booking.property.bathrooms} Baths
                  </p>
                  <p className="flex items-center gap-1">
                    <FaCar /> {booking.property.parkingAvailable ? "Parking" : "No Parking"}
                  </p>
                </div>

                <p className="mt-3 text-gray-600">{booking.property.description}</p>
              </div>

              {/* TENANT */}
              <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                <h3 className="flex items-center gap-2 text-blue-700 font-semibold">
                  <FaUser /> Booking Request By
                </h3>
                <p className="text-gray-700"><strong>Name:</strong> {booking.tenant.fullName}</p>
                <p className="text-sm text-gray-500"><strong>Email:</strong> {booking.tenant.email}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaIdBadge /> Tenant ID: {booking.tenant.id}
                </p>
              </div>

            

              {/* ACCEPT / REJECT */}
              {booking.status === "PENDING" && (
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleAccept(booking.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(booking.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                  >
                    Reject
                  </button>
                </div>
              )}
              <div>
                {booking.status==="REJECTED"&&(
                  <button onClick={() => handleDelete(booking.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
                    Delete Booking
                  </button>
                )
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Booking;