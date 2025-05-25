import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { Delete, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';


const Project = ({ project }) => {
  const { user } = useContext(AppContext)
  const handleDelete = () => {
    fetch('https://quick-post-backend.onrender.com/project/deleteproject', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: project?._id }),
      credentials: 'include'
    }).then(res => res.json()).then(data => {
      if (data.success) {
        toast.success(data.message)
      }
    })
  }

  return (
    <div key={project?._id} className='p-2 rounded-md shadow-xl hover:scale-102 duration-200 max-w-80'>
      <img src={project?.image} alt="" />
      <div className='mt-3'>
        <h1 className='text-xl font-semibold'>{project?.name}</h1>
        <p className='text-gray-500 text-sm'>@{project?.createdBy?.name}</p>
        <p className='text-gray-500 text-sm'>Posted At : {new Date(project?.createdAt).toLocaleDateString()}</p>
      </div>
      {
        user?._id === project?.createdBy?._id &&
        <div className='flex gap-5 mt-3'>
          <Link to={`/updateproject/${project?._id}`}><Edit className='h-5 cursor-pointer' /></Link>
          <Delete onClick={handleDelete} className='h-5 cursor-pointer' />
        </div>
      }
    </div>
  )
}

export default Project