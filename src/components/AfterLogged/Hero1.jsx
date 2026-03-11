import React from 'react'
import hero1 from '../../assets/images/heroupdate.png'

const Hero1 = ({ image }) => {

  const backgroundImage = image || hero1

  return (
    <section
      className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Rental System
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Find your perfect home,Room and Apartment easily and quickly
        </p>
      </div>
    </section>
  )
}

export default Hero1