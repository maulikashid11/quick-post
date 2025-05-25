import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from '../controllers/blog.controller.js'
import { loggedIn } from '../middlewares/loggedIn.js'
import { upload } from '../utils/cloudinary.js'
const router = express.Router()

router.get('/getallblogs', getAllBlogs)
router.post("/getblog", getBlog)
router.post("/createblog", loggedIn, upload.single('file'), createBlog)
router.put("/updateblog", loggedIn, upload.single('file'), updateBlog)
router.delete('/deleteblog', loggedIn, deleteBlog)
export default router