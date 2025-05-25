import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profilePic: {
        type: String,
    }
}, { timestamps: true })

const User = mongoose.model('user', UserSchema)
export default User