import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';


const UpdateBlog = () => {

    const { id } = useParams()
    const [details, setDetails] = useState({
        title: '',
        description: '',
        file: ""
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    const handleFile = (e) => {
        setDetails({ ...details, file: e.target.files[0] })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('title', details.title)
        formData.append('description', details.description)
        formData.append('_id', id)
        formData.append('file', details.file)

        const data = await (await fetch('https://quick-post-backend.onrender.com/blog/updateblog', {
            method: "PUT",
            body: formData,
            credentials: "include"
        })).json()
        if (data.success) {
            toast.success(data.message)
            navigate('/blogs')
        } else {
            toast.error(data.message)
        }
    }
    return (
        <form onSubmit={handleSubmit} className='w-[80%] mx-auto'>
            <h1 className='pt-10 font-bold text-xl'>Update Blog</h1>
            <div className='mt-5'>
                <label htmlFor="title" className='flex items-center '> Title</label>
                <input onChange={handleChange} value={details.title} className='p-2 rounded-md w-full shadow outline-none border-none' type="text" name='title' placeholder='Title' />
            </div>
            <div className='mt-5'>
                <label htmlFor="description" className='flex items-center '> Description</label>
                <input onChange={handleChange} value={details.description} className='p-2 rounded-md w-full shadow outline-none border-none' type="text" name='description' placeholder='Description' />
            </div>
            <div className='mt-5'>
                <label htmlFor="file" className='flex items-center '> Picture</label>
                <input onChange={handleFile} className='p-2 rounded-md w-full shadow outline-none border-none' type="file" name='file' placeholder='file' />
            </div>
            <button className='bg-blue-500 cursor-pointer text-white my-3 rounded-md p-2'>Update Blog</button>

        </form>
    )
}

export default UpdateBlog