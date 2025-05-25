import React, { useEffect, useState } from 'react'
import Project from './Project'
import { Link } from 'react-router-dom'

const Projects = () => {
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
        <div>
            <Link to="/createproject" className='font-bold  text-sm cursor-pointer text-blue-500 hover:underline'>Create Project</Link>

            <div className='p-5 flex gap-5 flex-wrap'>
                {
                    projects?.length > 0 ?
                        projects?.map((project) => {
                            return <Project key={project._id} project={project} />
                        }) : <div>No projects found</div>
                }
            </div>
        </div>
    )
}

export default Projects