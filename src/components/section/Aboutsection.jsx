import React from "react";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Aboutsection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 bg-white">

      {/* Heading */}
      <Heading heading={"About"} highlighted={"Us"} />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center mt-12 space-y-6">

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Who We Are
        </h2>

        <p className="text-slate-500 leading-relaxed text-base md:text-lg">
          RentHouse is a modern rental platform designed to simplify the way
          people discover, evaluate, and rent residential properties.
        </p>

        <p className="text-slate-500 leading-relaxed text-base md:text-lg">
          We provide a secure and transparent environment where property owners
          and tenants connect with confidence.
        </p>

      </div>

      {/* Button */}
      <div className="mt-12 flex justify-center">
        <Button
          text={"See More"}
          handleClick={() => navigate("/about")}
        />
      </div>

    </section>
  );
};

export default Aboutsection;