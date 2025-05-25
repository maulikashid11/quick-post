import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { AppContext } from './contexts/AppContext'
import { lazy, Suspense, useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'

const Home = lazy(() => wait(0).then(() => import('./components/Home')))
const About = lazy(() => wait(0).then(() => import('./components/About')))
const Blogs = lazy(() => wait(0).then(() => import('./components/Blogs')))
const UpdateBlog = lazy(() => wait(0).then(() => import('./components/UpdateBlog')))
const CreateBlog = lazy(() => wait(0).then(() => import('./components/CreateBlog')))
const Services = lazy(() => wait(0).then(() => import('./components/Services')))
const Projects = lazy(() => wait(0).then(() => import('./components/Projects')))
const UpdateProject = lazy(() => wait(0).then(() => import('./components/UpdateProject')))
const CreateProject = lazy(() => wait(0).then(() => import('./components/CreateProject')))
const Profile = lazy(() => wait(0).then(() => import('./components/Profile')))
const Update = lazy(() => wait(0).then(() => import('./components/Update')))
const BlogDetail = lazy(() => wait(0).then(() => import('./components/BlogDetail')))

const wait = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, time)
  })
}

const App = () => {
  const { loginOpen } = useContext(AppContext)

  return (
    <div className='py-5 px-20'>
      <Navbar />
      <ToastContainer position='bottom-right' />
      {
        loginOpen &&
        <Login />
      }
      <Suspense fallback={<h1 className='text-2xl'>Loading...</h1>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<div>Page not found</div>} />
          <Route path='/about' element={<About />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<BlogDetail />} />
          <Route path='/updateblog/:id' element={<ProtectedRoute><UpdateBlog /></ProtectedRoute>} />
          <Route path='/createblog' element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
          <Route path='/services' element={<Services />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/updateproject/:id' element={<ProtectedRoute><UpdateProject /></ProtectedRoute>} />
          <Route path='/createproject' element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/update' element={<ProtectedRoute><Update /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App