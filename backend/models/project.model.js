import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
    name: {
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

const Project = mongoose.model('project', ProjectSchema)
export default Project