import React from "react";
import PropertyCard from "../Card/PropertyCard";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Propertydash = ({ data = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="py-14">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Available <span className="text-blue-600">Properties</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Find the perfect place to live
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.length > 0 ? (
          data.slice(0, 6).map((item) => (
            <PropertyCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No properties available
          </p>
        )}
      </div>

      {/* View All Button */}
      <div className="mt-12 flex justify-center">
        <Button
          text="View All Properties"
          handleClick={() => navigate("/properties")}
        />
      </div>

    </section>
  );
};

export default Propertydash;