import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const Blogs = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/blog/getallblogs', {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setBlogs(data.blogs)
      }
    })
  }, [])

  return (
    <div>
      <Link to="/createblog" className='font-bold  text-sm cursor-pointer text-blue-500 hover:underline'>Create Blog</Link>

      <div className='p-5 flex gap-5 flex-wrap'>
        {
          blogs?.length > 0 ?
            blogs.map((blog) => {
              return <Blog key={blog._id} blog={blog} />
            }) : <div>No blogs found</div>
        }
      </div>
    </div>
  )
}

export default Blogs