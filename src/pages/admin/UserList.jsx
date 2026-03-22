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
    if (!window.confirm("Are you sure you want to delete this tenant? This action cannot be undone.")) return;

    try {
      await deleteTenantByAdmin(id);
      toast.success("Tenant removed from system");
      setUsers(users.filter(u => u.id !== id));
    } catch (error) {
      toast.error("Failed to delete tenant");
    }
  };

  // Live filtering logic
  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
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
              Registered <span className="text-emerald-600">Tenants</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1 text-lg">Manage and monitor active platform seekers</p>
          </div>

          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Filter by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl w-full md:w-96 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* --- DATA TABLE --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="py-5 px-8 text-left text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Tenant Identity</th>
                  <th className="py-5 px-8 text-left text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Contact</th>
                  <th className="py-5 px-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Access Level</th>
                  <th className="py-5 px-8 text-right text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Operations</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-50 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Syncing Tenants...</td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  <AnimatePresence>
                    {filteredUsers.map((user, index) => (
                      <motion.tr 
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="group hover:bg-emerald-50/30 transition-all duration-300"
                      >
                        {/* Profile & ID */}
                        <td className="py-5 px-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-100">
                              {user.fullName?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-base">{user.fullName}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Reference #{user.id}</p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-5 px-8">
                          <div className="flex items-center gap-2 text-slate-600 font-semibold italic">
                            <FiMail className="text-emerald-400" />
                            {user.email}
                          </div>
                        </td>

                        {/* Status/Role Badge */}
                        <td className="py-5 px-8 text-center">
                          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                            <FiZap size={12} className="text-amber-500" /> Active Tenant
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-5 px-8 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90">
                              <FiEdit size={18} />
                            </button>
                            <button
                              onClick={() => deletingUser(user.id)}
                              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
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
                    <td colSpan="4" className="py-24 text-center">
                      <FiUser size={48} className="mx-auto text-slate-200 mb-4" />
                      <p className="text-slate-400 font-bold text-lg">No tenants match your search.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- STAT FOOTER --- */}
        <div className="mt-8 flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
           <div className="flex gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Population</p>
                <p className="text-2xl font-black text-slate-800">{users.length}</p>
              </div>
              <div className="w-[1px] h-10 bg-slate-100" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filtered Results</p>
                <p className="text-2xl font-black text-emerald-500">{filteredUsers.length}</p>
              </div>
           </div>
           <button 
             onClick={() => window.print()} 
             className="hidden md:block px-6 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-black transition-all shadow-lg shadow-slate-200"
           >
             Print Directory
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserList;