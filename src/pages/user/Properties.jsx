import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/Card/PropertyCard";
import { getAllProperties, searchProperties } from "../../service/publicService";

const categories = ["All", "HOUSE", "APARTMENT", "ROOM"];
const priceRanges = [
  { label: "Any Price", value: "" },
  { label: "Below Rs. 5,000", value: "0-5000" },
  { label: "Rs. 5,000 - 10,000", value: "5000-10000" },
  { label: "Rs. 10,000 - 20,000", value: "10000-20000" },
  { label: "Above Rs. 20,000", value: "20000-" },
];

const Properties = () => {
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");

  const fetchAllProperties = async () => {
    try {
      const response = await getAllProperties();
      const properties = Array.isArray(response.data) ? response.data : [];
      setData(properties.map((item) => ({
        ...item,
        imageUrl: `http://localhost:8080/uploads/properties/${item.imageUrl}`,
      })));
    } catch (error) {
      console.error("Error fetching all properties:", error);
    }
  };

  const fetchFilteredProperties = async () => {
    try {
      const [min, max] = priceRange.split("-");
      const params = {
        keyword: search || undefined,
        type: activeCategory !== "All" ? activeCategory : undefined,
        minPrice: min || undefined,
        maxPrice: max || undefined,
      };
      const response = await searchProperties(params);
      const properties = Array.isArray(response.data) ? response.data : [];
      setData(properties.map((item) => ({
        ...item,
        imageUrl: `http://localhost:8080/uploads/properties/${item.imageUrl}`,
      })));
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
    }
  };

  // Optional dynamic updates when filters change
  useEffect(() => {
    if (search || activeCategory !== "All" || priceRange) {
      fetchFilteredProperties();
    } else {
      fetchAllProperties();
    }
  }, [search, activeCategory, priceRange]);

  return (
    <section className="max-w-380 mx-auto px-6 py-12 bg-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">
          Explore <span className="text-blue-600">Properties</span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-64 focus:outline-none"
          />
          <button
            onClick={fetchFilteredProperties} // still optional for manual search
            className="bg-blue-600 text-white px-5 py-2 hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <PropertyCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No properties found.</p>
      )}
    </section>
  );
};

export default Properties;