import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const About = () => {
  const navigate = useNavigate()
  return (
    <main className=" overflow-hidden w-380  mx-auto shadow-lg ">

      {/* Hero */}


      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-5 text-gray-800">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            RentHouse is a modern rental platform designed to simplify the way
            people discover, evaluate, and rent residential properties.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We provide a secure and transparent environment where property owners
            and tenants connect with confidence.
          </p>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
          alt="Rental Property"
          className="rounded-2xl shadow-lg w-full object-cover"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      </section>

      {/* Mission */}
      <section className="">
        <motion.div
          className="max-w-7xl mx-auto px-6 py-20 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Our Mission
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Our mission is to make the rental process efficient, reliable, and
            accessible by leveraging modern technology and verified property
            data.
          </p>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            What We Do
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {[
              "Discover verified rental properties with accurate details",
              "Compare properties by location, pricing, and amenities",
              "Communicate directly with property owners",
              "Make informed rental decisions with confidence",
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FaCheckCircle className="text-orange-500 text-xl mt-1" />
                <p className="text-gray-600 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="">
        <motion.div
          className="max-w-7xl mx-auto px-6 py-20 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Our Vision
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            We envision a rental ecosystem where finding and managing a home is
            simple, data-driven, and stress-free.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className=" text-gray-400">
        <motion.div
          className="max-w-7xl mx-auto px-6 py-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-700">
            Start Your Rental Journey with Confidence
          </h2>
          <p className="mb-6 text-gray-700">
            Explore verified properties or list your rental with ease.
          </p>
          <button onClick={() => navigate('/properties')} className="bg-gray-100 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Explore Properties
          </button>
        </motion.div>
      </section>

    </main>
  );
};

export default About;
