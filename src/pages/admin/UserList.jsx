import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch, FiUser, FiMail, FiZap } from "react-icons/fi";
import { getAdminTenants, deleteTenantByAdmin } from "../../service/adminService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAdminTenants();
      setUsers(response || []);
    } catch (error) {
      toast.error("Failed to load tenants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deletingUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;

    try {
      await deleteTenantByAdmin(id);
      toast.success("Tenant removed from system");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("Failed to delete tenant");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-900"
    >
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
              Registered <span className="text-emerald-600">Tenants</span>
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Manage and monitor active platform seekers
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm transition-all"
            />
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
          <div className="overflow-x-auto">

            <table className="min-w-full border-separate border-spacing-0">

              {/* HEADER */}
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-b">
                    Tenant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-b">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider border-b">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">

                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center text-slate-400 font-medium animate-pulse">
                      Loading tenants...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (

                  <AnimatePresence>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="hover:bg-emerald-50/20 transition"
                      >

                        {/* PROFILE */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-sm">
                              {user.fullName?.charAt(0)}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {user.fullName}
                              </p>
                              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                                ID #{user.id}
                              </p>
                            </div>

                          </div>
                        </td>

                        {/* CONTACT */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-600 font-medium">
                            <FiMail className="text-emerald-400 shrink-0" />
                            <span className="truncate max-w-55">
                              {user.email}
                            </span>
                          </div>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                            <FiZap size={12} className="text-amber-500" />
                            Active
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">

                            <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition active:scale-90">
                              <FiEdit size={18} />
                            </button>

                            <button
                              onClick={() => deletingUser(user.id)}
                              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition active:scale-90"
                            >
                              <FiTrash2 size={18} />
                            </button>

                          </div>
                        </td>

                      </motion.tr>
                    ))}
                  </AnimatePresence>

                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <FiUser size={40} className="mx-auto text-slate-200 mb-3" />
                      <p className="text-slate-400 font-medium">
                        No tenants match your search.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>
        </div>

        {/* FOOTER STATS */}
       
      </div>
    </motion.div>
  );
};

export default UserList;