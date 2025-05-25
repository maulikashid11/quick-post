import express from 'express'
import { getUser, loginUser, logout, registerUser, updateUser } from '../controllers/user.controller.js'
import { upload } from '../utils/cloudinary.js'
import { loggedIn } from '../middlewares/loggedIn.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getuser', loggedIn, getUser)
router.get('/logout', loggedIn, logout)
router.put('/update', loggedIn, upload.single('file'), updateUser)

export default router