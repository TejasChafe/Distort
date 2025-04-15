import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const DarkModeToggle = () => {
  const {darkMode, toggleDarkMode} = useContext(AppContext);

  return (
    <button onClick={toggleDarkMode} className='p-2 rounded-full transition-all duration-300 bg-black hover:scale-105
     dark:bg-gray-300' aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <div className='w-6 h-6 flex items-center justify-center transition-transform duration-300 transform'>
        {darkMode ? (<span className='text-yellow-300'>☀️</span>) 
        :(<span className='text-gray-600 dark:text-gray-300'>🌙</span>)}
      </div>
    </button>
  )
}

export default DarkModeToggle
