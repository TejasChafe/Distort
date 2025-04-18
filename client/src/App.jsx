import React, { useContext } from 'react'
import { Routes, Route, BrowserRouter, useLocation, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Result from './pages/Result'
import Editing from './pages/Editing'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import DarkModeToggle from './components/DarkModeToggle';
import Comments from './components/Comments';

const App = () => {
  const {showLogin} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-1 lg:px-10 min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <ToastContainer position='bottom-right'/>
      <Navbar>
        <DarkModeToggle/>
      </Navbar>
      {showLogin && <Login/>}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/result' element={<Result/>}/>
          <Route path='/edit' element={<Editing/>}/>
        </Routes>
        <div className='my-10'>
          <Comments/>
        </div>
        <Footer/>
    </div>
  )
}

export default App

