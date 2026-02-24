import React, { useEffect, useState } from "react";
import { FiTrash2, FiSearch } from "react-icons/fi";
import { getAdminOwners, deleteOwnerByAdmin } from "../../service/adminService";
import { toast } from "react-toastify";

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOwners, setFilteredOwners] = useState([]);

  // ✅ Fetch Owners
  const fetchOwners = async () => {
    try {
      const response = await getAdminOwners();
      setOwners(response);
      setFilteredOwners(response);
    } catch (error) {
      console.error("Error fetching owners:", error);
      toast.error("Failed to load owners");
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  // ✅ Delete Owner
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;

    try {
      await deleteOwnerByAdmin(id);
      toast.success("Owner deleted successfully");
      fetchOwners();
    } catch (error) {
      toast.error("Failed to delete owner");
    }
  };

  // ✅ Search Button Logic
  const handleSearch = () => {
    const filtered = owners.filter(
      (owner) =>
        owner.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        owner.address?.toLowerCase().includes(search.toLowerCase()) ||
        owner.email?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredOwners(filtered);
  };

  return (
    <div className="p-6 bg-white min-h-screen">

      {/* 🔥 FLEX HEADER */}
      <div className="flex justify-between items-center mb-6">

        {/* LEFT SIDE */}
        <h1 className="text-3xl font-bold text-blue-900">
          Owner List
        </h1>

        {/* RIGHT SIDE - SEARCH */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <FiSearch className="absolute top-3 left-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search name, email or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* 📋 TABLE */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Owner Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOwners.length > 0 ? (
              filteredOwners.map((owner) => (
                <tr
                  key={owner.id}
                  className={owner.id % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-2 px-4">{owner.id}</td>
                  <td className="py-2 px-4">{owner.fullName}</td>
                  <td className="py-2 px-4">{owner.email}</td>
                  <td className="py-2 px-4">{owner.address}</td>
                  <td className="py-2 px-4">{owner.phone}</td>
                  <td className="py-2 px-6">
                    <button
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => handleDelete(owner.id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No owners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default OwnerList;