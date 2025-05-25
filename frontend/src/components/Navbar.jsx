import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'
import { toast } from 'react-toastify'


const Navbar = () => {
    const { setLoginOpen, user, setUser } = useContext(AppContext)

    const navigate = useNavigate()
    useEffect(() => {
        fetch('https://quick-post-backend.onrender.com/user/getuser', {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json()).then((data) => {
            if (data.success) {
                setUser(data.user)
            } else {
                navigate('/')
            }
        })
    }, [])
    const logout = async () => {
        const data = await (await fetch("https://quick-post-backend.onrender.com/user/logout", {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })).json()
        if (data.success) {
            toast.success(data.message)
            setUser(null)
        }
    }
    return (
        <nav className='sticky bg-white top-0 flex items-center justify-between border-b-1 border-gray-300 pb-2 '>
            <Link to="/" className='font-bold text-2xl'>QuickPost</Link>
            <div className='space-x-5'>
                <NavLink className={({ isActive }) => (`${isActive ? 'underline' : ''} font-semibold text-sm `)} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => (`${isActive ? 'underline' : ''} font-semibold text-sm `)} to="/about">About</NavLink>
                <NavLink className={({ isActive }) => (`${isActive ? 'underline' : ''} font-semibold text-sm `)} to="/blogs">Blogs</NavLink>
                <NavLink className={({ isActive }) => (`${isActive ? 'underline' : ''} font-semibold text-sm `)} to="/projects">Projects</NavLink>
                <NavLink className={({ isActive }) => (`${isActive ? 'underline' : ''} font-semibold text-sm `)} to="/services">Services</NavLink>
            </div>
            <div>
                {
                    !user?.name ?
                        <p onClick={e => setLoginOpen(true)} className='text-sm text-blue-500 cursor-pointer'>Login to your Account</p>
                        :
                        <div className='flex gap-2'>
                            <Link to="/profile" className='text-sm cursor-pointer'>Hi, {user?.name}</Link>
                            <p onClick={logout} className='text-sm text-blue-500 cursor-pointer'>Logout</p>
                        </div>
                }
            </div>
        </nav>
    )
}

export default Navbar