import React, { useState, useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import OurProperty from "../../components/Categoryproperty/OurProperty";
import Aboutsection from "../../components/section/Aboutsection";
import { getProperty } from "../../service/publicService";
import Propertydash from "../../components/AfterLogged/Propertydash";
import Hero1 from "../../components/AfterLogged/Hero1";

const Home = () => {
  const role = sessionStorage.getItem("role");
  const [data, setData] = useState([]);

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

  return (
    <div className="max-w-380 mx-auto px-6 bg-gray-100 shadow-lg">

      {/* If user is NOT tenant */}
      {role !== "TENANT" ? (
        <>
          <Hero />

          <div className="mt-16">
            <OurProperty data={data} />
          </div>

          <div className="mt-20">
            <Aboutsection />
          </div>
        </>
      ) : (
        <>
          <Hero1 />

          <div className="mt-16">
            <Propertydash data={data} />
          </div>

          <div className="mt-20">
            <Aboutsection />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;