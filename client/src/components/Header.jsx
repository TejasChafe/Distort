import React, { useContext } from 'react'
import { assets } from '../assets/assets'
//import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const {user, setShowLogin} = useContext(AppContext)
    const navigate = useNavigate()
    const onGenerateClick = ()=>{
        if(user){
            navigate('/result')
        }
        else{
            setShowLogin(true)
        }
    }
    // const onEditClick = ()=>{
    //     if(user){
    //         navigate('/edit')
    //     }
    //     else{
    //         setShowLogin(true)
    //     }
    // }

    return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
        
        <h1 className='text-5xl mx-auto mt-10 text-center text-black dark:text-white'>
            <span className='text-blue-600'>Distort</span> images the way you want.
        </h1>
        <p className='text-center max-w-xl mx-auto mt-4 text-gray-600 dark:text-gray-300'>
            Transform your imagination into stunning visuals. Unleash your creativity in a single click!
        </p>
        <button onClick={onGenerateClick} className='sm:text-lg text-white bg-black dark:bg-gray-300 dark:text-black w-auto mt-8 px-10 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 rounded-full'>
            Generate Images
            <img className='h-6' src={assets.fire} alt=""/>
        </button>
        {/* <button onClick={onEditClick} className='sm:text-lg text-white bg-black w-auto mt-8 px-10 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 rounded-full'>
            Edit Images
            <img className='h-6' src={assets.star_icon} alt=""/>
        </button> */}
        <div className='flex flex-wrap justify-center mt-16 gap-3'>
            {Array(2).fill('').map((item, index)=>(
                <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' 
                src={index % 2 === 0 ? assets.dawg : assets.car} 
                alt="" key={index} width={70}
                whileHover={{scale:1.05, duration:0.1}}/>
            ))}
        </div>
        <p className='mt-2 text-gray-400'>Generated images from distort</p>
    </div>
  )
}

export default Header
