import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <Link to={`/blogs/${blog._id}`} key={blog._id} className='p-2 rounded-md shadow-xl hover:scale-102 duration-200 max-w-80'>
      <img src={blog.image} alt="" />
      <div className='mt-3'>

        <h1 className='text-xl font-semibold'>{blog.title}</h1>
        <h1 className=''>{blog.description}</h1>
        <p className='text-gray-500 text-sm'>@{blog.createdBy.name}</p>
        <p className='text-gray-500 text-sm'>Posted At : {new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
    </Link>
  )
}

export default Blog