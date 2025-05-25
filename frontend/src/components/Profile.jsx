import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'
import Project from './Project'


const Profile = () => {
    const { user } = useContext(AppContext)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/project/getallprojects', {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setProjects(data.projects)
            }
        })
    }, [])
    return (
        <div className='p-10'>
            <div className='flex justify-between items-start'>
                <div className='flex gap-5 items-center mb-5'>
                    <img src={user?.profilePic || "../../src/assets/profile.webp"} className='rounded-full w-[100px] h-[100px]' alt="" />
                    <h1 className='font-bold text-4xl'>{user?.name}</h1>
                </div>
                <Link to="/update" className='font-bold text-sm cursor-pointer text-blue-500 hover:underline'>Update Profile</Link>
            </div>
            {
                user?.bio &&
                <div>
                <p className='font-bold text-xl mb-1'>Bio:</p>
                <p className='font-bold border p-2 rounded text-slate-500'>{user?.bio}</p>
            </div>}
            <div className='py-2'>
                <p className='font-bold text-xl mb-1'>Your Posts:</p>
                <div className='p-5 flex gap-5 flex-wrap'>
                    {
                        projects?.length > 0 ?
                            projects.filter((project)=>project.createdBy._id === user._id).map((project) => {
                                return <Project key={project._id} project={project} />
                            }) : <div>No projects found</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile