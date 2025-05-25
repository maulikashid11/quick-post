import { Bookmark, Delete, Edit } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AppContext } from '../contexts/AppContext'

const BlogDetail = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:3000/blog/getblog', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id:id }),
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setBlog(data.blog)
            }
        })
    }, [])
    const handleDelete = () => {
        fetch('http://localhost:3000/blog/deleteblog', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: blog._id }),
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            if (data.success) {
                toast.success(data.message)
                navigate('/blogs')
            }
        })
    }

    return (
        <div className='p-5 flex flex-col items-center gap-10'>
            <img src={blog?.image} className='w-[80%] shadow-2xl' alt="" />
            <div>
                <h1 className='text-3xl font-bold'>{blog?.title}</h1>
                <p className='mt-5'>{blog?.description}</p>
                <p className='text-gray-500 font-bold '>Posted At : {new Date(blog?.createdAt).toLocaleDateString()}</p>
                <div className='flex justify-between'>
                    <p className='text-gray-500 text-sm'>@{blog?.createdBy?.name}</p>
                </div>
            </div>
            {
                user?._id === blog?.createdBy?._id &&
                <div className='flex gap-5 mt-3'>
                    <Link to={`/updateblog/${blog?._id}`}><Edit className='h-5 cursor-pointer' /></Link>
                    <Delete onClick={handleDelete} className='h-5 cursor-pointer' />
                </div>
            }
        </div>
    )
}

export default BlogDetail