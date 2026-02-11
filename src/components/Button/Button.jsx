import React from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="w-50 bg-orange-500 text-white py-2 rounded-lg font-medium
                 hover:bg-orange-600 active:scale-95 transition-all duration-300"
    >
      {text}
    </button>
  )
}

export default Button
