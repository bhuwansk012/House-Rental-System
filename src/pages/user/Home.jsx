import React, { useState, useEffect } from 'react'
import Hero from '../../components/Hero/Hero'
import OurProperty from '../../components/Categoryproperty/OurProperty'
import Aboutsection from '../../components/section/Aboutsection'
import { getProperty } from '../../service/publicService'
import Propertydash from '../../components/AfterLogged/Propertydash'
import Hero1 from '../../components/AfterLogged/Hero1'

const Home = () => {

  const role = localStorage.getItem('role')
  const [data, setData] = useState([])

  const fetchProperty = async () => {
    try {
      const response = await getProperty()

      const updated = response.data.map((item) => ({
        ...item,
        imageUrl: `http://localhost:8080/uploads/properties/${item.imageUrl}`
      }))

      setData(updated)
    } catch (error) {
      console.error("Error fetching properties:", error)
    }
  }

  useEffect(() => {
    fetchProperty()
  }, [])

  return (
    <div className='max-w-380 mx-auto shadow'>
      {role !== "TENANT" ? (
        <div className='m-0 p-1'>
          <Hero />
          <OurProperty data={data} />
          <Aboutsection />
        </div>
      ) : (
        <div className='m-0 p-1'>
          <Hero1 />
          <Propertydash data={data} />
          <Aboutsection />
        </div>
      )}
    </div>
  )
}

export default Home