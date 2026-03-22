import React, { useEffect, useState } from "react";
import { FiTrash2, FiSearch, FiUser, FiMail, FiShield, FiMoreVertical } from "react-icons/fi";
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
      setOwners(owners.filter(o => o.id !== id));
    } catch (error) {
      toast.error("Failed to delete owner");
    }
  };

  // Improved filtering logic (Live Search)
  const filteredOwners = owners.filter(
    (owner) =>
      owner.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      owner.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="p-6 md:p-10 bg-[#f8fafc] min-h-screen font-sans"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              Account <span className="text-violet-600">Owners</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">Manage platform property providers</p>
          </div>

          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl w-full md:w-96 shadow-sm focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* --- TABLE CONTAINER --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="py-5 px-8 text-left text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Profile</th>
                  <th className="py-5 px-8 text-left text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Contact Information</th>
                  <th className="py-5 px-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Role Status</th>
                  <th className="py-5 px-8 text-right text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center text-slate-400 animate-pulse font-medium">Loading Database...</td>
                  </tr>
                ) : filteredOwners.length > 0 ? (
                  <AnimatePresence>
                    {filteredOwners.map((owner, index) => (
                      <motion.tr 
                        key={owner.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-slate-50/80 transition-all"
                      >
                        <td className="py-5 px-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-violet-600 font-bold shadow-sm">
                              {owner.fullName?.charAt(0) || <FiUser />}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{owner.fullName}</p>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-tighter italic">ID: #{owner.id}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-8">
                          <div className="flex items-center gap-2 text-slate-600 font-medium">
                            <FiMail className="text-violet-400" />
                            {owner.email}
                          </div>
                        </td>

                        <td className="py-5 px-8 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-xs font-bold border border-violet-100 uppercase tracking-wider">
                            <FiShield size={12} /> Verified Owner
                          </span>
                        </td>

                        <td className="py-5 px-8 text-right">
                          <button
                            onClick={() => handleDelete(owner.id)}
                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                            title="Delete Account"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <FiSearch size={40} className="opacity-20" />
                        <p className="font-medium text-lg">No matching owners found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER INFO --- */}
        <div className="mt-6 flex justify-between items-center px-4">
           <p className="text-sm text-slate-400 font-medium">
             Showing <span className="text-slate-700 font-bold">{filteredOwners.length}</span> active providers
           </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OwnerList;