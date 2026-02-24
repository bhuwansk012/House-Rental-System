import React from 'react';
import {useNavigate} from 'react-router-dom'

const OwnerDashboard = () => {
  const navigate=useNavigate();
  // Mock summary data
  const summary = [
    { title: "Total Properties", value: 8, color: "bg-blue-100", textColor: "text-blue-700" },
    { title: "Booked Properties", value: 3, color: "bg-red-100", textColor: "text-red-700" },
    { title: "Available Properties", value: 5, color: "bg-green-100", textColor: "text-green-700" },
    { title: "Total Revenue", value: "Rs. 1,50,000", color: "bg-yellow-100", textColor: "text-yellow-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Owner Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your property summary.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summary.map((item, idx) => (
          <div key={idx} className={`p-6 rounded-2xl shadow-lg ${item.color}`}>
            <h2 className={`text-xl font-semibold ${item.textColor}`}>{item.title}</h2>
            <p className={`text-3xl font-bold mt-2 ${item.textColor}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <button onClick={()=>navigate("/owner/add-property")} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Add New Property
        </button>
        <button onClick={()=>navigate("/owner/my-property")} className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">
          View My Properties
        </button>
      </div>

      {/* Recent Properties Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Properties</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-gray-600">Title</th>
              <th className="py-2 px-4 text-gray-600">Type</th>
              <th className="py-2 px-4 text-gray-600">Price</th>
              <th className="py-2 px-4 text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-4">Cozy Apartment</td>
              <td className="py-2 px-4">Apartment</td>
              <td className="py-2 px-4">Rs. 25,000</td>
              <td className="py-2 px-4">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Available</span>
              </td>
            </tr>
            <tr className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-4">Family House</td>
              <td className="py-2 px-4">House</td>
              <td className="py-2 px-4">Rs. 55,000</td>
              <td className="py-2 px-4">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">Booked</span>
              </td>
            </tr>
            {/* Add more rows dynamically as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerDashboard;