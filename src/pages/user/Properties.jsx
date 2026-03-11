import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/Card/PropertyCard";
import { getProperty } from "../../service/publicService";

const categories = ["All", "HOUSE", "APARTMENT", "ROOM"];

const Properties = () => {
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

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

  // Filter Logic
  const filteredData =
    activeCategory === "All"
      ? data
      : data.filter((item) => item.type === activeCategory);

  return (
    <section className="max-w-380 mx-auto px-6 py-12 shadow">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Explore <span className="text-blue-600">Properties</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Find houses, apartments, and rooms that suit your needs
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
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

      {/* Property Grid */}
      {filteredData.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((item) => (
            <PropertyCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No properties found in this category.
        </p>
      )}
    </section>
  );
};

export default Properties;