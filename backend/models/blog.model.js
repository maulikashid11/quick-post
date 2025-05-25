import mongoose from 'mongoose'

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
}, { timestamps: true })

const Blog = mongoose.model('blog', BlogSchema)
export default Blog