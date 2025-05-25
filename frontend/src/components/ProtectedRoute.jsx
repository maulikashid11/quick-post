import React, { useContext, useEffect } from 'react'
import { AppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user, setUser } = useContext(AppContext)
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
    return (
        <>{children}</>
    )
}

export default ProtectedRoute