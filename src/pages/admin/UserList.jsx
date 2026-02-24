import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { getAdminTenants, deleteTenantByAdmin } from "../../service/adminService";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // ✅ Fetch Tenants
  const fetchUsers = async () => {
    try {
      const response = await getAdminTenants();
      setUsers(response);
      setFilteredUsers(response); // initial load
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load tenants");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Delete Tenant
  const deletingUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;

    try {
      await deleteTenantByAdmin(id);
      toast.success("Tenant deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete tenant");
    }
  };

  // ✅ Search when button clicked
  const handleSearch = () => {
    const filtered = users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  return (
    <div className="p-6 bg-white min-h-screen">

      {/* 🔥 FLEX HEADER */}
      <div className="flex justify-between items-center mb-6">

        {/* LEFT SIDE - TITLE */}
        <h1 className="text-3xl font-bold text-blue-900">
          Tenants List
        </h1>

        {/* RIGHT SIDE - SEARCH */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <FiSearch className="absolute top-3 left-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search name or email..."
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
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className={user.id % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.fullName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-6">
                    <button className="text-gray-600 hover:text-blue-800 mr-3 cursor-pointer">
                      <FiEdit size={18} />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => deletingUser(user.id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No tenants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UserList;