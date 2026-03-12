import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/public/Modal";
import AddProperty from "../../modal/formmodal/AddProperty";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const summary = [
    { title: "Total Properties", value: 8, color: "bg-blue-100", textColor: "text-blue-700" },
    { title: "Booked Properties", value: 3, color: "bg-red-100", textColor: "text-red-700" },
    { title: "Available Properties", value: 5, color: "bg-green-100", textColor: "text-green-700" },
    { title: "Total Revenue", value: "Rs. 1,50,000", color: "bg-yellow-100", textColor: "text-yellow-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summary.map((item, idx) => (
          <div key={idx} className={`p-6 rounded-xl shadow ${item.color}`}>
            <h2 className={`text-lg font-semibold ${item.textColor}`}>
              {item.title}
            </h2>
            <p className={`text-2xl font-bold ${item.textColor}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Add Property
        </button>

        <button
          onClick={() => navigate("/owner/my-property")}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          View My Properties
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddProperty />
      </Modal>
    </div>
  );
};

export default OwnerDashboard;