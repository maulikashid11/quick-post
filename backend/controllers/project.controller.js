import Project from "../models/project.model.js"
import User from "../models/user.model.js"

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate({
            path: 'createdBy'
        })
        if (projects.length <= 0) {
            return res.status(400).json({ success: false, message: "Something went wrong!" })
        }
        res.status(200).json({ success: true, message: "Projects fetched successfully", projects })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const getProject = async (req, res) => {
    try {
        const { id } = req.body
        const project = await Project.findOne({ id }).populate({
            path: 'createdBy'
        })
        if (!project) {
            return res.status(400).json({ success: false, message: "Something went wrong!" })
        }
        res.status(200).json({ success: true, message: "Project fetched successfully", project })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const createProject = async (req, res) => {
    try {
        const { name } = req.body
        const file = req.file.path
        const user = await User.findOne({ email: req.user.email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Something went wrong!" })
        }
        const project = await Project.create({
            name, createdBy: user._id, image: file
        })
        res.status(201).json({ success: true, message: "Project created successfully", project })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const updateProject = async (req, res) => {
    try {
        const { name, _id } = req.body
        const project = await Project.findOneAndUpdate({ _id }, { name, image: req.file.path })
        res.status(200).json({ success: true, message: "User updated successfully", project })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { _id } = req.body
        const project = await Project.findOneAndDelete({ _id })
        res.status(200).json({ success: true, message: "User deleted sucessfully" })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}