import React, { useState } from "react";
import { data } from "../../data/data";
import PropertyCard from "../../components/Card/PropertyCard";

const categories = ["All", "House", "Apartment", "Room"];

const Properties = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredData =
    activeCategory === "All"
      ? data
      : data.filter(
          (item) =>
            item.name?.toLowerCase() === activeCategory.toLowerCase()
        );

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
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Property Grid */}
      {filteredData.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((item, index) => (
            <PropertyCard key={index} item={item} />
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
