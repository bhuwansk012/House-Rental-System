import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/Card/PropertyCard";
import { getProperty } from "../../service/publicService";

const categories = ["All", "HOUSE", "APARTMENT", "ROOM"];

const Properties = () => {
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const fetchProperty = async () => {
    try {
      const response = await getProperty();

      const updated = response.data.map((item) => ({
        ...item,
        imageUrl: `http://localhost:8080/uploads/properties/${item.imageUrl}`,
      }));

      setData(updated);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  // Filter + Search Logic
  const filteredData = data.filter((item) => {
    const categoryMatch =
      activeCategory === "All" || item.type === activeCategory;

    const searchMatch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <section className="max-w-390 mx-auto px-6 py-12 bg-gray-100">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">
          Explore <span className="text-blue-600">Properties</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Find houses, apartments, and rooms that suit your needs
        </p>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-64 focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-5 py-2 hover:bg-blue-700">
            Search
          </button>
        </div>

      </div>

      {/* Property Grid */}
      {filteredData.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((item) => (
            <PropertyCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No properties found.
        </p>
      )}
    </section>
  );
};

export default Properties;