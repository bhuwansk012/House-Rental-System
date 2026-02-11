import React from 'react'

const Heading = ({ heading, highlighted }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-gray-800">
        {heading}{' '}
        <span className="text-orange-500">{highlighted}</span>
      </h1>
      <div className="w-20 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
    </div>
  )
}

export default Heading
