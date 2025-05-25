import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.user.email })
        if (!user) {
            return res.json({ success: false, message: "Something went wrong" })
        }
        res.status(200).json({ success: true, message: "User fetched successfully", user })
    } catch (error) {

        res.json({ success: false, message: error.message })
    }
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const alreadyUser = await User.findOne({ email })
        if (alreadyUser) {
            return res.json({ success: false, message: "User already exists with this email" })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const user = await User.create({
                    name, email, password: hash
                })

                const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)
                res.cookie('token', token)
                res.json({ success: true, message: "User created successfully", user })
            })
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const loginUser = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    try {

        if (!email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const alreadyUser = await User.findOne({ email })
        if (!alreadyUser) {
            return res.json({ success: false, message: "Something went wrong!" })
        }

        const user = await User.findOne({
            email
        })

        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)
                res.cookie('token', token)
                res.json({ success: true, message: "User logged in successfully", user })
            } else {
                return res.json({ success: false, message: "Something went wrong!" })

            }
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { name, email, bio } = req.body;

    try {

        const alreadyUser = await User.findOne({ email: req.user.email })
        if (!alreadyUser) {
            res.json({ success: false, message: "User with this email is not exists" })
        }
        const user = await User.findOneAndUpdate({ email: alreadyUser.email }, { name, email, bio ,profilePic:req.file.path})
        res.json({ success: true, message: "User updated successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    res.cookie('token', '')
    return res.status(200).json({ success: true, message: "Logout successfully" })
}