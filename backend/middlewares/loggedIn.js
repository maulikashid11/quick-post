import jwt from 'jsonwebtoken'

export const loggedIn = async (req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return res.status(400).json({success:false,message:"Token not found!"})
    }
    const user = jwt.verify(token,process.env.JWT_SECRET)
    if(user.email){
        req.user = user
        next()
    }else{
        return res.status(400).json({success:false,message:"User not found"})
    }
}