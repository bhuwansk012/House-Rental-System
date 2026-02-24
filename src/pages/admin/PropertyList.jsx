import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { getAdminProperties, updatePropertyStatus } from "../../service/adminService";
import { toast } from "react-toastify";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

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
      const response = await updatePropertyStatus(propertyId, newStatus);

      if (response.status === 200) {
        toast.success(`Property ${newStatus} successfully`);
        // Update local state immediately instead of refetching all
        fetchProperties();
      } else if (response.status === 403) {
        toast.error("Access denied");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">
        Property List
      </h1>

      <div className="bg-white shadow-xl rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          {/* ================= HEADER ================= */}
          <thead className="bg-purple-700 text-white text-xs uppercase">
            <tr>
              <th className="px-2 py-2 text-xs">Image</th>
              <th className="px-2 py-2 text-xs">ID</th>
              <th className="px-2 py-2 text-xs">Title</th>
              <th className="px-2 py-2 text-xs">Type</th>
              <th className="px-2 py-2 text-xs">Price</th>
              <th className="px-2 py-2 text-xs">Area</th>
              <th className="px-2 py-2 text-xs">Bedrooms</th>
              <th className="px-2 py-2 text-xs">Bathrooms</th>
              <th className="px-2 py-2 text-xs">District</th>
              <th className="px-2 py-2 text-xs">Municipality</th>
              <th className="px-2 py-2 text-xs">Ward No</th>
              <th className="px-2 py-2 text-xs">House Name</th>
              <th className="px-2 py-2 text-xs">Owner</th>
              <th className="px-2 py-2 text-xs">Status</th>
              <th className="px-2 py-2 text-xs">Created At</th>
              <th className="px-2 py-2 text-xs">Updated At</th>
              <th className="px-2 py-2 text-xs text-center">Actions</th>
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody>
            {properties.map((property, index) => (
              <tr
                key={property.id}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition`}
              >
                <td className="px-2 py-2 text-xs">{property.id}</td>

                <td className="px-2 py-2 text-xs">
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

                <td className="px-2 py-2 font-semibold text-xs">{property.title}</td>
                <td className="px-4 py-2 font-semibold text-xs">{property.type}</td>
                <td className="px-2 py-2 text-green-600 font-semibold text-xs">
                  Rs. {property.price}
                </td>
                <td className="px-2 py-2 text-xs">{property.area}</td>
                <td className="px-2 py-2 text-xs">{property.bedrooms}</td>
                <td className="px-2 py-2 text-xs">{property.bathrooms}</td>
                <td className="px-2 py-2 text-xs">{property.district}</td>
                <td className="px-2 py-2 text-xs">{property.municipality}</td>
                <td className="px-2 py-2 text-xs">{property.wardNo}</td>
                <td className="px-2 py-2 text-xs">{property.houseName}</td>
                <td className="px-2 py-2 text-xs">{property.owner?.fullName || "N/A"}</td>



                <td className={`px-2 py-2  text-xs${property.bookingStatus==="AVAILABLE"?' text-green-500':'text-red-500'} font-semibold`}>
                  {property.bookingStatus}
                </td>




                <td className="px-2 py-2 text-xs">
                  {property.createdAt
                    ? new Date(property.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="px-2 py-2 text-xs">
                  {property.updatedAt
                    ? new Date(property.updatedAt).toLocaleDateString()
                    : "N/A"}
                </td>

                {/* ACTIONS */}
                <td className="px-2 py-2 text-xs">
                  <div className="flex gap-2 justify-center items-center bg-gray-300 p-1 m-1 rounded-xl">

                    <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                      <FiEdit size={16} />
                    </button>

                    <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition">
                      <FiTrash2 size={16} />
                    </button>
                     <div className="relative inline-block group">
                    <button
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white cursor-pointer
                     ${property.status === "APPROVED" ? "bg-green-500" : ""}
                      ${property.status === "PENDING" ? "bg-yellow-500" : ""}
                      ${property.status === "REJECTED" ? "bg-red-500" : ""}
                     `}
                    >
                      {property.status}
                    </button>

                    {property.status === "PENDING" && (
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="px-2 py-1 bg-green-600 rounded-l text-white text-xs font-semibold"
                          onClick={() => handleStatusChange(property.id, "APPROVED")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-2 py-1 bg-red-600 rounded-r text-white text-xs font-semibold"
                          onClick={() => handleStatusChange(property.id, "REJECTED")}
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