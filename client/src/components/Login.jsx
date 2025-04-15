import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Login')
    const {setShowLogin, backendUrl, setToken, setUser} = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return toast.error("Please enter a valid email address");
            }
            if(state === 'Login'){
                const{data} = await axios.post(backendUrl + '/api/user/login', {email, password})
                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
                }
                else{
                    toast.error(data.message)
                }
            }
            else{
                const{data} = await axios.post(backendUrl + '/api/user/register', {name, email, password})
                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
                }
                else{
                    toast.error(data.message)
                }
            }     
        } 
        catch (error) {
            toast.error(error.message)            
        }
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return()=>{
            document.body.style.overflow = 'unset';
        }
    },[])
    {/* */}
    return (
    
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 bg-black/30 backdrop-blur flex justify-center items-center'>
        <form onSubmit={onSubmitHandler}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            {/* Sign in */}
            {/* Whenever {state} is not 'login', the 'Full Name' code will be shown (true), else not*/}
            {state !== 'Login' && 
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.user} alt="" width={15}/>
                <input onChange={e => setName(e.target.value)} value={name} type='text' className='outline-none text-sm' placeholder='Full Name' required/>
            </div>}

            {/* Display this in both login and sign up */}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" />
                <input onChange={e => setEmail(e.target.value)} value={email} type='email' className='outline-none text-sm' placeholder='Email id' required/>
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={e => setPassword(e.target.value)} value={password} type='password' className='outline-none text-sm' placeholder='Password' required/>
            </div>

            <button className='bg-blue-600 w-full text-white py-2 my-5 rounded-full'>
                {state === 'Login' ? 'Log in':'Create Account'}
            </button>

            {/* Ternary operator to display either login or on sign up*/}
            {state === 'Login' ? 
            <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign Up</span></p>
            :
            <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>
            }
            
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>
        </form>
    </div>
  )
}

export default Login
