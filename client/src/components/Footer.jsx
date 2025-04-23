import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false)
  useEffect(() => {
    if (showAbout) {
      document.body.style.overflow = 'hidden'
    } 
    else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = ''}
  }, [showAbout])

  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20 relative'>
      <Link to='/'>
        <img src={assets.disto} alt="" width={120}/>
      </Link>
      <span className="text-blue-600 cursor-pointer ml-4" onClick={() => setShowAbout(true)}>About Us</span>
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur">
          <div className="bg-white rounded-xl p-8 max-w-md w-full relative text-gray-700">
            <button className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700" onClick={() => setShowAbout(false)} aria-label='Close'>
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-3 text-center">About Us</h2>
            <p className='text-gray-500 text-center justify-center mr-3'>
              Easily bring your ideas to life with our free AI image generator. 
              Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks.
            <br /><span className='text-blue-600'>Imagine it, describe it, and watch it come to life instantly.</span>
            </p>
            <p className='text-gray-500 text-center justify-center mr-3'>
              You can also edit your pictures with the help of our simple and easy to understand image editor.
              Make your images appear more appealing with the help of distort.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Footer
