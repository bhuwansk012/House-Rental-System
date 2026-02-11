import React from 'react'
import Heading from '../Heading/Heading'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

const Aboutsection = () => {
    const navigate = useNavigate()
    return (
        <section className="py-1">
            <Heading heading={"About"} highlighted={"-Us"} />
            <div className="m-6 p-2 ml-30">
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
            </div>
            <div className="mt-10 m-5 mb-10 flex justify-center">
                <Button text={"See More"} handleClick={() => navigate('/about')} />
            </div>
        </section>
    )
}

export default Aboutsection