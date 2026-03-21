import React from 'react'
import Heading from '../Heading/Heading'
import PropertyCard from '../Card/PropertyCard'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

const OurProperty = ({ data = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="py-10">
      <Heading heading="Explore" highlighted="Properties" />

      {/* Property Grid */}
      <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.length > 0 ? (
          data.slice(0, 3).map((item) => (
            <PropertyCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No properties available
          </p>
        )}
      </div>

      {/* View All Button */}
      <div className="mt-10 flex justify-center">
        <Button
          text="View All Properties"
          handleClick={() => navigate('/properties')}
        />
      </div>
    </section>
  )
}

export default OurProperty