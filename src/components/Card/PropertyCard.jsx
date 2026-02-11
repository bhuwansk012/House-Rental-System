import React from 'react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

const PropertyCard = ({ item, index }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden">
      
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800">
          {item.name}
        </h2>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {item.description}
        </p>

        <p className="text-orange-500 font-bold text-lg mt-3">
          Rs.{item.price}
        </p>

        {/* Features */}
        <div className="text-sm text-gray-600 mt-2">
          <span className="font-semibold">Features:</span> {item.feature}
        </div>

        {/* Button */}
        <div className="mt-4">
          <Button
            text="View Details"
            handleClick={() => navigate(`/property-details`)}
          />
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
