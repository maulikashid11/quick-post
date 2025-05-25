import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import { Lock, Mail, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [state, setState] = useState(true)
    const { setLoginOpen, user, setUser } = useContext(AppContext)
    const [details, setDetails] = useState({
        name: '',
        email: "",
        password: ''
    })
    const handleChange = async (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = details
        try {
            if (state) {
                const res = await fetch('https://quick-post-backend.onrender.com/user/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: "include"
                })
                const data = await res.json()
                if (data.success) {
                    toast.success(data.message)
                    const { user } = await (await fetch('https://quick-post-backend.onrender.com/user/getuser', {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    })).json()
                    setUser(user)
                    setLoginOpen(false)
                } else {
                    toast.error(data.message)
                }
            } else {
                const res = await fetch('https://quick-post-backend.onrender.com/user/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password }),
                    credentials: "include"
                })
                const data = await res.json()
                if (data.success) {
                    toast.success(data.message)
                    const { user } = await (await fetch('https://quick-post-backend.onrender.com/user/getuser', {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    })).json()
                    setUser(user)
                    setLoginOpen(false)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className='fixed inset-0 backdrop-blur flex items-center justify-center'>
            <form onSubmit={(e) => { handleSubmit(e) }} className='relative bg-white rounded-md shadow-2xl p-5'>
                <h1 className='text-lg font-bold'>Get Started With Quick Post</h1>
                {
                    !state &&
                    <div className='mt-5'>

                        <label htmlFor="name" className='flex items-center '><User className='w-4 mx-2' /> Name</label>
                        <input onChange={handleChange} value={details.name} className='p-2 rounded-md w-full shadow outline-none border-none' type="text" name='name' placeholder='Name' />
                    </div>
                }
                <div className='mt-5'>
                    <label htmlFor="email" className='flex items-center '> <Mail className='w-4 mx-2' /> Email</label>
                    <input onChange={handleChange} value={details.email} className='p-2 rounded-md w-full shadow outline-none border-none' type="email" name='email' placeholder='Email' />
                </div>
                <div className='mt-5'>
                    <label htmlFor="password" className='flex items-center '> <Lock className='w-4 mx-2' /> Password</label>
                    <input onChange={handleChange} value={details.password} className='p-2 rounded-md w-full shadow outline-none border-none' type="password" name='password' placeholder='Password' />
                </div>
                <button className='bg-blue-500 cursor-pointer text-white my-3 w-full rounded-md p-2'>{state ? 'Login' : 'Signup'}</button>
                {
                    state ?
                        (<p onClick={(e) => { setState(false) }} className='text-blue-500 text-sm cursor-pointer'>Create Account?</p>)
                        :
                        (<p onClick={(e) => { setState(true) }} className='text-blue-500 text-sm cursor-pointer'>Already have account?</p>)
                }
                <p className='absolute top-1 right-2 cursor-pointer' onClick={(e) => setLoginOpen(false)}>X</p>
            </form>
        </div>
    )
}

export default Login 