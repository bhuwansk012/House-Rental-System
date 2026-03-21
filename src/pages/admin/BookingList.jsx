import React, { useEffect, useState } from "react";
import { getAllBookings } from "../../service/bookService";
import { toast } from "react-toastify";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  // ---------------- FETCH BOOKINGS ----------------
  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      if (response.status === 200 && response.data) {
        // Show latest booking first
        setBookings([...response.data].reverse());
        toast.success("Bookings fetched successfully");
      } else if (response.status === 403) {
        toast.error("Access denied");
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (bookings.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        No bookings found
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Booking Requests
      </h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-800 text-white uppercase text-xs">
            <tr>
              <th className="px-2 py-2">Property</th>
              <th className="px-2 py-2">Title</th>
              <th className="px-2 py-2">Type</th>
              <th className="px-2 py-2">Price</th>
              <th className="px-2 py-2">Bedrooms</th>
              <th className="px-2 py-2">Bathrooms</th>
              <th className="px-2 py-2">Area</th>
              <th className="px-2 py-2">Location</th>
              <th className="px-2 py-2">Owner</th>
              <th className="px-2 py-2">Tenant</th>
              <th className="px-2 py-2">Booking Status</th>
              <th className="px-2 py-2">Property Status</th>
              <th className="px-2 py-2">Created At</th>
              <th className="px-2 py-2">Updated At</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking.id}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
              >
                {/* Property Image */}
                <td className="px-2 py-2">
                  <img
                    src={`http://localhost:8080/uploads/properties/${booking.property.imageUrl}`}
                    alt={booking.property.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>

                <td className="px-2 py-2">{booking.property.title}</td>
                <td className="px-2 py-2">{booking.property.type}</td>
                <td className="px-2 py-2">Rs. {booking.property.price}</td>
                <td className="px-2 py-2">{booking.property.bedrooms}</td>
                <td className="px-2 py-2">{booking.property.bathrooms}</td>
                <td className="px-2 py-2">{booking.property.area} sqft</td>
                <td className="px-2 py-2">
                  {booking.property.district}, {booking.property.municipality}, Ward {booking.property.wardNo}, {booking.property.tole}
                </td>
                <td className="px-2 py-2">{booking.property.owner.fullName}</td>
                <td className="px-2 py-2">{booking.tenant.fullName}</td>
                <td className="px-2 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-2 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.property.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : booking.property.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.property.status || "N/A"}
                  </span>
                </td>
                <td className="px-2 py-2">
                  {new Date(booking.property.createdAt).toLocaleDateString()}
                </td>
                <td className="px-2 py-2">
                  {new Date(booking.property.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;