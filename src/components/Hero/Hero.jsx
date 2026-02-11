import React from "react";
import hero from "../../assets/images/hiro1.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-full py-16">
      <div className="max-w-7xl mx-auto px-8 flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left flex flex-col gap-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Welcome to{" "}
            <span className="text-orange-500">House Rental System</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Browse the best rental properties in your area. Whether you're
            looking for a cozy apartment or a spacious house, we have the
            perfect home for you.
          </p>

          <div className="flex justify-center md:justify-start">
            <Link
              to="/register"
              className="inline-block border-gray-400 border  hover:text-white px-8 py-2 rounded-xl font-semibold hover:bg-purple-600 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-[60%] flex justify-center">
          <img
            src={hero}
            alt="House Rental"
            className="w-full max-w-[90%] rounded-3xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
