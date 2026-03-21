import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/public/Modal";
import AddProperty from "../../modal/formmodal/AddProperty";
import { getDashboardStats } from "../../service/ownerService";
import { getAllOwnerBookings } from "../../service/bookService";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);

  // Fetch dashboard stats from backend
  const getDashboardStatsData = async () => {
    try {
      const response = await getDashboardStats();
      setData(response); // Ensure using response.data from Axios
      console.log("Dashboard stats:", response);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  // Fetch last 5 bookings for this owner
  const getRecentBookingData = async () => {
    try {
      const response = await getAllOwnerBookings();
      const updated = response.data.map((booking) => ({
        ...booking,
        imageUrl: booking.property?.imageUrl
          ? `http://localhost:8080/uploads/properties/${booking.property.imageUrl}`
          : null,
      }));
      setRecentBookings(updated || []);
    } catch (error) {
      console.error("Error fetching recent bookings:", error);
    }
  };

  useEffect(() => {
    getDashboardStatsData();
    getRecentBookingData();
  }, []);

  // Summary cards data
  const summary = [
    {
      title: "Total Properties",
      value: data?.totalProperty || 0,
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Booked Properties",
      value: data?.totalBooking || 0,
      color: "bg-red-100",
      textColor: "text-red-700",
    },
    {
      title: "Available Properties",
      value: data?.totalAvailable || 0,
      color: "bg-green-100",
      textColor: "text-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Owner Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {summary.map((item, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center ${item.color}`}
          >
            <h2 className={`text-2xl font-semibold mb-4 ${item.textColor}`}>
              {item.title}
            </h2>
            <p className={`text-4xl font-bold ${item.textColor}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6 mb-8">
        <button
          onClick={() => navigate("/owner/my-property")}
          className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-green-700 transition"
        >
          View My Properties
        </button>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Recent Bookings
        </h2>

        {recentBookings.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Property</th>
                <th className="px-4 py-2">Tenant</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.slice(0, 5).map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">
                    {booking.imageUrl ? (
                      <img
                        src={booking.imageUrl}
                        alt="Property"
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2">{booking.property?.title}</td>
                  <td className="px-4 py-2">{booking.tenant?.fullName}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
                        booking.status === "BOOKED"
                          ? "bg-green-500"
                          : booking.status === "PENDING"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No recent bookings found.</p>
        )}
      </div>

      {/* Modal for adding property */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddProperty />
      </Modal>
    </div>
  );
};

export default OwnerDashboard;