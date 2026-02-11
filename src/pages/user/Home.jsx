import React from 'react'
import Hero from '../../components/Hero/Hero'
import OurProperty from '../../components/Categoryproperty/OurProperty'
import Aboutsection from '../../components/section/Aboutsection'
const Home = () => {
  return (
    <div className='max-w-380 mx-auto shadow '>
      <div className='m-0 p-1'>
         <Hero/>
         <OurProperty/>
         <Aboutsection/>
      </div>
    </div>
  )
}

export default Home