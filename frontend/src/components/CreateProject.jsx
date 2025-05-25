import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const CreateProject = () => {

    const [details, setDetails] = useState({
        name: '',
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
        formData.append('name', details.name)
        formData.append('file', details.file)

        const data = await (await fetch('http://localhost:3000/project/createproject', {
            method: "POST",
            body: formData,
            credentials: "include"
        })).json()
        if (data.success) {
            toast.success(data.message)
            navigate('/projects')
        } else {
            toast.error(data.message)
        }
    }
    return (
        <form onSubmit={handleSubmit} className='w-[80%] mx-auto'>
            <h1 className='pt-10 font-bold text-xl'>Create Project</h1>
            <div className='mt-5'>
                <label htmlFor="name" className='flex items-center '> Name</label>
                <input onChange={handleChange} value={details.name} className='p-2 rounded-md w-full shadow outline-none border-none' type="text" name='name' placeholder='Name' />
            </div>
            <div className='mt-5'>
                <label htmlFor="file" className='flex items-center '> Picture</label>
                <input onChange={handleFile} className='p-2 rounded-md w-full shadow outline-none border-none' type="file" name='file' placeholder='file' />
            </div>
            <button className='bg-blue-500 cursor-pointer text-white my-3 rounded-md p-2'>Create Project</button>

        </form>
    )
}

export default CreateProject