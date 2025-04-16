import React, { useContext } from 'react'
import { assets } from '../assets/assets'
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

    return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
        
        <h1 className='text-5xl mx-auto mt-1 text-center text-black dark:text-white'>
            <span className='text-blue-600'>Distort</span> images the way you want.
        </h1>
        <p className='text-center max-w-xl mx-auto mt-4 text-gray-600 dark:text-gray-300'>
            Transform your imagination into stunning visuals. Unleash your creativity in a single click!
        </p>
        <button onClick={onGenerateClick} className='sm:text-lg text-white bg-black dark:bg-gray-300 dark:text-black w-auto mt-8 px-10 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 rounded-full'>
            Generate Images
            <img className='h-6' src={assets.fire} alt=""/>
        </button>
    </div>
  )
}

export default Header