import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(()=>localStorage.getItem('token') || '');
    const [darkMode, setDarkMode] = useState(()=>{
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme:dark)').matches;
    });

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');

        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [token, user]);
    
    useEffect(()=>{
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if(darkMode){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const generateImage = async(prompt)=>{
        try {
            const{data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers:{token}})
            if(data.success){
                return data.resultImage
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            toast.error(error.message)
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken('')
        setUser(null)
    }
    
    const value = { user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, logout, generateImage, darkMode, toggleDarkMode}
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export const useAuth = () => useContext(AppContext)
export default AppContextProvider