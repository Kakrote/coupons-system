const jwt=require('jsonwebtoken')
const Admin=require('../model/Admin')

const authMiddleware= async (req,res,next)=>{
    let token
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
    try{
        token=req.headers.authorization.split(' ')[1]
        console.log(token) // checking if it checking the token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.admin=await Admin.findById(decoded.adminId).select('-password')
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({messg:"Invalid token"})
    }
    if(!token){
        res.status(401).json({messg:"Not authorized!"})
    }
}
module.exports=authMiddleware