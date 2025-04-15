import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import DarkModeToggle from './DarkModeToggle'

const Navbar = () => {
  const { user, setShowLogin, logout } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Check if the user is on the Editing page
  const isEditingPage = location.pathname === "/edit"

  return (
    <div className='flex items-center justify-between py-4'>
      <Link to='/'>
        <img src={assets.disto} alt="" className='w-28 sm:w-32 lg:w-40'/>
      </Link>
      <div className='flex items-center gap-2 sm:gap-3'>
        <DarkModeToggle/>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <button 
              onClick={() => navigate(isEditingPage ? '/result' : '/edit')} 
              className='flex items-center gap-2 px-4 py-1.5 rounded-full hover:scale-105 transition-all duration-300'>
              <p className='text-white bg-black px-5 py-2 rounded-full dark:bg-gray-300 dark:text-black'>
                {isEditingPage ? "Image Generator" : "Image Editor"}
              </p>
            </button> 
            <p className='text-gray-600 dark:text-gray-300 max-sm:hidden pl-3'>Hi, {user.name}</p>

            {/* Logout dropdown */}
            <div className='relative'>
              <img src={assets.profile_icon} className='w-10 cursor-pointer' onClick={() => setDropdownOpen(!dropdownOpen)}/>
              {dropdownOpen && (
                <div className='absolute top-10 right-0 z-10 text-black rounded-md bg-white shadow-md p-2'>
                  <ul className='text-sm'>
                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100 rounded'>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            <button onClick={() => setShowLogin(true)} className='bg-black dark:bg-gray-300 text-white dark:text-black px-5 py-2 text-sm sm:px-10 hover:scale-105 transition-all duration-300 rounded-full'>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
