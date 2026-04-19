import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiHome,
  FiGrid,
  FiLayers,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";
import { MdMeetingRoom } from "react-icons/md";
import PropertyCard from "../../components/Card/PropertyCard";
import { getAllProperties, searchProperties } from "../../service/publicService";

const categories = [
  { name: "All", icon: <FiGrid /> },
  { name: "HOUSE", icon: <FiHome /> },
  { name: "APARTMENT", icon: <FiLayers /> },
  { name: "ROOM", icon: <MdMeetingRoom /> },
];

const priceRanges = [
  { label: "Any Price", value: "" },
  { label: "Below Rs. 5k", value: "0-5000" },
  { label: "Rs. 5k - 10k", value: "5000-10000" },
  { label: "Rs. 10k - 20k", value: "10000-20000" },
  { label: "Above Rs. 20k", value: "20000-" },
];

const sortOptions = [
  { label: "Default", value: "" },
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

const basedOnOptions = [
  { label: "Sort By", value: "any" },
  { label: "Price", value: "price" },
  { label: "Location", value: "location" },
  { label: "Area", value: "area" },
];

const Properties = () => {
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("");
  const [basedOn, setBasedOn] = useState("price");

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setPriceRange("");
    setOrder("");
    setBasedOn("any");
  };

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
          order: order || undefined,
          basedOn: basedOn || undefined,
        };
        response = await searchProperties(params);
      } else {
        response = await getAllProperties();
      }

      const properties = Array.isArray(response.data) ? response.data : [];
      setData(
        properties.map((item) => ({
          ...item,
          imageUrl: `http://localhost:8080/uploads/properties/${item.images[1]}`,
        }))
      );
      console.log("Fetched properties:", response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFiltered = search || activeCategory !== "All" || priceRange || order || basedOn;
    fetchProperties(isFiltered);
  }, [search, activeCategory, priceRange, order, basedOn]);

  return (
    <section className="min-h-screen bg-[#F1F5F9] pb-24">
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Find Your <span className="text-indigo-600">Dream Sanctuary</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto"
          >
            Explore the most exclusive and verified listings. Your next home is just a click away.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        {/* ENHANCED FILTER BAR */}
        <div className="bg-white/80 backdrop-blur-xl p-3 rounded-4xl shadow-2xl shadow-indigo-100/50 border border-white flex flex-col xl:flex-row gap-3">
          
          {/* SEARCH INPUT */}
          <div className="relative flex-[1.5]">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search city, neighborhood, or building..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-12 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-slate-700"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <FiX className="text-slate-500" />
              </button>
            )}
          </div>

          {/* CATEGORY SWITCHER */}
          <div className="flex bg-slate-100/50 p-1.5 rounded-2xl gap-1 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat.name ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {cat.icon}
                <span className="relative z-10">{cat.name}</span>
                {activeCategory === cat.name && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white shadow-sm rounded-xl"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* SELECT DROPDOWNS */}
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <div className="relative flex-1 min-w-35">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full appearance-none bg-slate-50/50 border border-slate-100 px-5 py-4 rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>

            <div className="relative flex-1 min-w-30">
              <select
                value={basedOn}
                onChange={(e) => setBasedOn(e.target.value)}
                className="w-full appearance-none bg-slate-50/50 border border-slate-100 px-5 py-4 rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer"
              >
                {basedOnOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>

            <div className="relative flex-1 min-w-30">
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                disabled={!basedOn || basedOn === "any"}
                className="w-full appearance-none bg-slate-50/50 border border-slate-100 px-5 py-4 rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer disabled:opacity-50"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Available Properties</h3>
              <p className="text-slate-400 text-sm mt-1">{data.length} listings found in your area</p>
            </div>
            {(search || activeCategory !== "All" || priceRange) && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <FiX /> Reset Filters
                </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-100 bg-white rounded-4xl border border-slate-100 p-4 space-y-4">
                    <div className="w-full h-56 bg-slate-100 rounded-2xl animate-pulse" />
                    <div className="h-6 w-2/3 bg-slate-100 rounded-lg animate-pulse" />
                    <div className="h-4 w-full bg-slate-100 rounded-lg animate-pulse" />
                    <div className="flex gap-2">
                        <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse" />
                        <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse" />
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : data.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {data.map((item) => (
                  <PropertyCard key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-[3rem] py-20 text-center border-2 border-dashed border-slate-200"
              >
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiSearch className="text-3xl text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">No properties found</h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
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

export default Properties;