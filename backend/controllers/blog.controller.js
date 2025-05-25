import Blog from "../models/blog.model.js"
import User from "../models/user.model.js"

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate({ path: "createdBy" })
        if (blogs.length <= 0) {
            return res.status(400).json({ success: false, message: "Something went wrong!" })
        }
        res.status(200).json({ success: true, message: "Blogs fetched successfully", blogs })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const getBlog = async (req, res) => {
    try {
        const { _id } = req.body
        const blog = await Blog.findOne({ _id }).populate({ path: "createdBy" })
        if (!blog) {
            return res.status(400).json({ success: false, message: "Something went wrong!" })
        }
        res.status(200).json({ success: true, message: "blog fetched successfully", blog })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body
        const file = req.file.path
        const user = await User.findOne({ email: req.user.email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Something went wrong!" })
        }
        const blog = await Blog.create({
            title, description, createdBy: user._id, image: file
        })
        res.status(201).json({ success: true, message: "blog created successfully", blog })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { title, description, _id } = req.body
        const blog = await Blog.findOneAndUpdate({ _id }, { title, description, image: req.file.path })
        res.status(200).json({ success: true, message: "User updated successfully", blog })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { _id } = req.body
        const blog = await Blog.findOneAndDelete({ _id })
        res.status(200).json({ success: true, message: "User deleted sucessfully" })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}