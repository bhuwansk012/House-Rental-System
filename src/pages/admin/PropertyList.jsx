import React, { useEffect, useState } from "react";
import { getAdminProperties, updatePropertyStatus } from "../../service/adminService";
import { toast } from "react-toastify";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // ✅ per-row loading

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await getAdminProperties();

      const formatted = response.map((p) => ({
        ...p,
        images:
          p.images && p.images.length > 0
            ? p.images
            : p.imageUrl
            ? [`http://localhost:8080/uploads/properties/${p.imageUrl}`]
            : [],
      }));

      setProperties(formatted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load properties");
    }
  };

  const handleStatusChange = async (propertyId, newStatus) => {
    try {
      setLoadingId(propertyId); // ✅ only this row loads

      const response = await updatePropertyStatus(propertyId, newStatus);

      if (response.status === 200) {
        toast.success(`Property ${newStatus} successfully`);
        fetchProperties();
      } else if (response.status === 403) {
        toast.error("Access denied");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    } finally {
      setLoadingId(null); // ✅ reset
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">
        Property List
      </h1>

      <div className="bg-white shadow-xl rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          {/* HEADER */}
          <thead className="bg-purple-700 text-white text-xs uppercase">
            <tr>
              <th className="px-2 py-2">Image</th>
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">Title</th>
              <th className="px-2 py-2">Type</th>
              <th className="px-2 py-2">Price</th>
              <th className="px-2 py-2">Area</th>
              <th className="px-2 py-2">Bedrooms</th>
              <th className="px-2 py-2">Bathrooms</th>
              <th className="px-2 py-2">District</th>
              <th className="px-2 py-2">Municipality</th>
              <th className="px-2 py-2">Ward No</th>
              <th className="px-2 py-2">House Name</th>
              <th className="px-2 py-2">Owner</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Created</th>
              <th className="px-2 py-2">Updated</th>
              <th className="px-2 py-2 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {properties.map((property, index) => (
              <tr
                key={property.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition`}
              >
                {/* ✅ Image first */}
                <td className="px-2 py-2">
                  <img
                    src={
                      property.images.length > 0
                        ? property.images[0]
                        : "https://via.placeholder.com/60"
                    }
                    alt={property.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>

                {/* ✅ ID second */}
                <td className="px-2 py-2">{property.id}</td>

                <td className="px-2 py-2 font-semibold">
                  {property.title}
                </td>
                <td className="px-2 py-2">{property.type}</td>

                <td className="px-2 py-2 text-green-600 font-semibold">
                  Rs. {property.price}
                </td>

                <td className="px-2 py-2">{property.area}</td>
                <td className="px-2 py-2">{property.bedrooms}</td>
                <td className="px-2 py-2">{property.bathrooms}</td>
                <td className="px-2 py-2">{property.district}</td>
                <td className="px-2 py-2">{property.municipality}</td>
                <td className="px-2 py-2">{property.wardNo}</td>
                <td className="px-2 py-2">{property.houseName}</td>

                <td className="px-2 py-2">
                  {property.owner?.fullName || "N/A"}
                </td>

                {/* Booking status */}
                <td
                  className={`px-2 py-2 font-semibold ${
                    property.bookingStatus === "AVAILABLE"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {property.bookingStatus}
                </td>

                <td className="px-2 py-2">
                  {property.createdAt
                    ? new Date(property.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="px-2 py-2">
                  {property.updatedAt
                    ? new Date(property.updatedAt).toLocaleDateString()
                    : "N/A"}
                </td>

                {/* ACTION */}
                <td className="px-2 py-2">
                  <div className="flex justify-center">
                    <div className="relative group">
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white
                          ${
                            property.status === "APPROVED"
                              ? "bg-green-500"
                              : ""
                          }
                          ${
                            property.status === "PENDING"
                              ? "bg-yellow-500"
                              : ""
                          }
                          ${
                            property.status === "REJECTED"
                              ? "bg-red-500"
                              : ""
                          }`}
                      >
                        {loadingId === property.id
                          ? "Approving..."
                          : property.status}
                      </button>

                      {/* Hover Actions */}
                      {property.status === "PENDING" &&
                        loadingId !== property.id && (
                          <div className="absolute top-0 left-0 w-full h-full flex opacity-0 group-hover:opacity-100 transition">
                            <button
                              className="flex-1 bg-green-600 text-white text-xs rounded-l"
                              onClick={() =>
                                handleStatusChange(
                                  property.id,
                                  "APPROVED"
                                )
                              }
                            >
                              Approve
                            </button>

                            <button
                              className="flex-1 bg-red-600 text-white text-xs rounded-r"
                              onClick={() =>
                                handleStatusChange(
                                  property.id,
                                  "REJECTED"
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY */}
        {properties.length === 0 && (
          <div className="text-center p-6 text-gray-500">
            No properties found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;