import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { connectToDb } from './utils/db.js'
import userRoute from './routes/user.route.js'
import projectRoute from './routes/project.route.js'
import blogRoute from './routes/blog.route.js'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary';
config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "https://quick-post-frontend-ten.vercel.app",
    credentials: true
}))
connectToDb()


app.get('/', (req, res) => {
    res.json({ success: true, message: "Ok is good here boss" })
})

app.use('/user', userRoute)
app.use('/project', projectRoute)
app.use('/blog', blogRoute)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})