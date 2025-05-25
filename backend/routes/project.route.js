import express from 'express'
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from '../controllers/project.controller.js'
import { loggedIn } from '../middlewares/loggedIn.js'
import { upload } from '../utils/cloudinary.js'
const router = express.Router()

router.get('/getallprojects', getAllProjects)
router.get("/getproject", getProject)
router.post("/createproject", loggedIn,upload.single('file'), createProject)
router.put("/updateproject", loggedIn,upload.single('file'), updateProject)
router.delete('/deleteproject', loggedIn, deleteProject)
export default router