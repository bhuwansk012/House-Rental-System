import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { data } from "../../data/data";

const PropertyList = () => {
  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-900  text-center">
          Property List
        </h1>
      <div className="bg-white shadow-xl rounded-xl ">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm">
            {/* TABLE HEADER */}
            <thead className="bg-purple-700 text-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left uppercase">ID</th>
                <th className="px-4 py-3 text-left uppercase">Property</th>
                <th className="px-4 py-3 text-left uppercase">Location</th>
                <th className="px-4 py-3 text-left uppercase">City</th>
                <th className="px-4 py-3 text-left uppercase">Price</th>
                <th className="px-4 py-3 text-left uppercase">Area</th>
                <th className="px-4 py-3 text-left uppercase">Feature</th>
                <th className="px-4 py-3 text-left uppercase">Status</th>
                <th className="px-4 py-3 text-center uppercase">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {data.map((property, index) => (
                <tr
                  key={property.id}
                  className={`transition  ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"
                  }`}
                >
                  <td className="px-2 py-2 font-medium">{property.id}</td>

                  {/* IMAGE + NAME */}
                  <td className="px-2 py-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                      <span className="font-semibold text-gray-700">
                        {property.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">{property.location}</td>
                  <td className="px-4 py-3">{property.city}</td>

                  <td className="px-4 py-3 font-semibold text-green-600">
                    Rs. {property.price}
                  </td>

                  <td className="px-4 py-3">{property.area}</td>
                  <td className="px-4 py-3">{property.feature}</td>

                  {/* STATUS BADGE */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property.type === "Rent"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {property.type}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition cursor-pointer">
                        <FiEdit size={16} />
                      </button>
                      <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition cursor-pointer">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
