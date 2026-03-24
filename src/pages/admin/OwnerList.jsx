import React, { useEffect, useState } from "react";
import { FiTrash2, FiSearch, FiUser, FiMail, FiShield ,FiPhone} from "react-icons/fi";
import { getAdminOwners, deleteOwnerByAdmin } from "../../service/adminService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOwners = async () => {
    try {
      setLoading(true);
      const response = await getAdminOwners();
      setOwners(response || []);
    } catch (error) {
      toast.error("Failed to load owners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this owner account?")) return;
    try {
      await deleteOwnerByAdmin(id);
      toast.success("Owner deleted successfully");
      setOwners((prev) => prev.filter((o) => o.id !== id));
    } catch (error) {
      toast.error("Failed to delete owner");
    }
  };

  const filteredOwners = owners.filter(
    (owner) =>
      owner.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      owner.email?.toLowerCase().includes(search.toLowerCase())
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
              Account <span className="text-violet-600">Owners</span>
            </h1>
            <p className="text-slate-500 mt-1 text-sm font-medium">
              Manage platform property providers
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-sm transition-all"
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
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-widest border-b">
                    Profile
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-widest border-b">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-widest border-b">
                    PhoneNo.
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-bold uppercase tracking-widest border-b">
                    Status
                  </th>
                  <th className="py-4 px-6 text-right text-xs font-bold uppercase tracking-widest border-b">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center text-slate-400 font-medium animate-pulse">
                      Loading owners...
                    </td>
                  </tr>
                ) : filteredOwners.length > 0 ? (

                  <AnimatePresence>
                    {filteredOwners.map((owner, index) => (
                      <motion.tr
                        key={owner.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="hover:bg-slate-50 transition"
                      >

                        {/* PROFILE */}
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-violet-600 font-bold shadow-sm">
                              {owner.fullName?.charAt(0) || <FiUser />}
                            </div>

                            <div>
                              <p className="font-bold text-slate-800">
                                {owner.fullName}
                              </p>
                              <p className="text-xs text-slate-400 font-semibold">
                                ID: #{owner.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CONTACT */}
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                            <FiMail className="text-violet-400 shrink-0" />
                            <span className="truncate max-w-50">
                              {owner.email}
                            </span>
                          </div>
                        </td>
                         <td className="py-5 px-6">
                          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                            <FiPhone className="text-violet-400 shrink-0" />
                            <span className="truncate max-w-50">
                              {owner.phone}
                            </span>
                          </div>
                        </td>

                        {/* STATUS */}
                        <td className="py-5 px-6 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100 text-xs font-bold uppercase tracking-wider">
                            <FiShield size={12} />
                            Verified
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="py-5 px-6 text-right">
                          <button
                            onClick={() => handleDelete(owner.id)}
                            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition active:scale-90"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>

                      </motion.tr>
                    ))}
                  </AnimatePresence>

                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <FiSearch size={36} className="opacity-30" />
                        <p className="font-medium">No matching owners found</p>
                      </div>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 px-2 flex justify-between items-center text-sm text-slate-500">
          <p>
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredOwners.length}
            </span>{" "}
            owners
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default OwnerList;