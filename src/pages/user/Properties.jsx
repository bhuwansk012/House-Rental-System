import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiX, FiHome, FiGrid, FiLayers } from "react-icons/fi";
import PropertyCard from "../../components/Card/PropertyCard";
import { getAllProperties, searchProperties } from "../../service/publicService";

const categories = [
  { name: "All", icon: <FiGrid /> },
  { name: "HOUSE", icon: <FiHome /> },
  { name: "APARTMENT", icon: <FiLayers /> },
  { name: "ROOM", icon: <FiUser /> }, // Assuming you have FiUser or similar
];

const priceRanges = [
  { label: "Any Price", value: "" },
  { label: "Below Rs. 5k", value: "0-5000" },
  { label: "Rs. 5k - 10k", value: "5000-10000" },
  { label: "Rs. 10k - 20k", value: "10000-20000" },
  { label: "Above Rs. 20k", value: "20000-" },
];

const Properties = () => {
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (isFiltered = false) => {
    setLoading(true);
    try {
      let response;
      if (isFiltered) {
        const [min, max] = priceRange.split("-");
        const params = {
          keyword: search || undefined,
          type: activeCategory !== "All" ? activeCategory : undefined,
          minPrice: min || undefined,
          maxPrice: max || undefined,
        };
        response = await searchProperties(params);
      } else {
        response = await getAllProperties();
      }

      const properties = Array.isArray(response.data) ? response.data : [];
      setData(properties.map((item) => ({
        ...item,
        imageUrl: `http://localhost:8080/uploads/properties/${item.imageUrl}`,
      })));
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFiltered = search || activeCategory !== "All" || priceRange;
    fetchProperties(isFiltered);
  }, [search, activeCategory, priceRange]);

  return (
    <section className="min-h-screen bg-[#f8fafc] pb-24">
      {/* --- PAGE HEADER --- */}
      <div className="bg-white border-b border-slate-100 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">
            Find Your <span className="text-indigo-600">Next Home</span>
          </h2>
          <p className="text-slate-500 font-medium mt-2">Discover verified listings tailored to your lifestyle.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        {/* --- SEARCH & FILTER BAR --- */}
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white flex flex-col lg:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by location or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-700"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500">
                <FiX />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex bg-slate-50 p-1.5 rounded-2xl w-full lg:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat.name
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Price Dropdown */}
          <div className="relative w-full lg:w-64">
            <FiFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- RESULTS GRID --- */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8 px-2">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
              {data.length} Results Found
            </p>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="skeleton"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-[400px] bg-white rounded-[2.5rem] animate-pulse border border-slate-100" />
                ))}
              </motion.div>
            ) : data.length > 0 ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
              >
                {data.map((item) => (
                  <PropertyCard key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200"
              >
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSearch size={30} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">No properties match your criteria</h3>
                <p className="text-slate-400 mt-2 font-medium">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {setSearch(""); setActiveCategory("All"); setPriceRange("");}}
                  className="mt-6 text-indigo-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Simple utility for better icon rendering
const FiUser = ({ size }) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export default Properties;