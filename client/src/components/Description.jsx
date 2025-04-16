import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-12 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>
      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.dawg} alt="" className='w-80 xl:w-96 rounded-lg'/>
        <div>
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Distort Images The Way You Like</h2>
            <p className='text-gray-500 mb-4'>
                Easily bring your ideas to life with our free AI image generator. 
                Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks.
                Imagine it, describe it, and watch it come to life instantly.
            </p>
            <p className='text-gray-500'>
                You can also edit your pictures with the help of our simple and easy to understand image editor.
                Make your images appear more appealing with the help of distort.
            </p>
        </div>
      </div>
    </div>
  )
}

export default Description