const Admin=require('../model/Admin')
const Coupon=require('../model/Coupons')
const UserClaim=require('../model/UserClaim')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//adimin Registration
const adminRegister=async(req,res)=>{
    const {username,password}=req.body
    try{
        const user=await Admin.findOne({username})
        if(user){
            return res.status(400).json({messg:"User already exist"})
        }
        // const newUser=new Admin({username,password})
        const salt=await bcrypt.genSalt(10)
        hashPassword=await bcrypt.hash(password,salt)
        const newUser=new Admin({username,password:hashPassword})
        await newUser.save()
        res.json({messg:"Admin registered successfully"})
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({messg:"Internal server error"})
    }
}



// Admin Login
const adminLogin=async(req,res)=>{
    const {username,password}=req.body
    try{
        const admin=await Admin.findOne({username})
        if(!admin){
            return res.status(400).json({messg:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,admin.password)
        if(!isMatch){
            return res.status(400).json({messg:"Invalid credentials"})
        }
        // genrating token
        const payLord={
            adminId:admin._id,
            username:admin.username
        }
        const token=jwt.sign(payLord,process.env.JWT_SECRET,{expiresIn:"1h"})
        // console.log(token)
        res.json({token})

    }
    catch(err){
        console.log(err)
        res.status(500).json({messg:"Internal server error"})
    }
}

// geting all coupons
const getCoupons=async(req,res)=>{
    try{

        const coupons=await Coupon.find()
        res.json(coupons)
    }
    catch(err){
        console.log(err)
        res.status(500).json({messg:"Internal server error"})
    }
}

// adding new coupons
const addCoupon=async(req,res)=>{
    const {code}=req.body
    try{
        const newCoupon=new Coupon({code})
        await newCoupon.save()
        res.json({messg:"Coupon added successfully"})

    }
    catch(err){
        console.log(err)
        res.status(500).json({messg:"Internal server error"})
    }
}

//deleting coupon
const deleteCoupon=async(req,res)=>{
    try{
        const coupon=await Coupon.findById(req.params.id)
        if(!coupon) return res.status(400).json({msg:"coupon not found"})
        await Coupon.deleteOne({_id:req.params.id})
        res.json({mssg:"delete succesfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({mssg:"the internal error "})
    }
}

// get all claims history
const userHistoy=async(req,res)=>{
    try{
        const claims=await UserClaim.find().populate('couponId','code').select('ip sessionId couponId claimedAt');
        const filterClaims=claims.map(claim=>({
            ip:claim.ip,
            sessionId:claim.sessionId,
            couponCode:claim.couponId?claim.couponId.code:"Unknowm",
            claimedAt:claim.claimedAt
        }))
        res.json(filterClaims)
    }
    catch(err){
        console.log(err)
        res.status(500).json({msgg:"server Error"})
    }
}

// updating coupons
const updateCouponStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const coupon = await Coupon.findById(req.params.id);

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found!" });
        }

        if (!["available", "disabled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Use 'available' or 'disabled'." });
        }

        coupon.status = status;
        await coupon.save();

        res.json({ message: `Coupon ${status === "available" ? "enabled" : "disabled"} successfully!` });
    } catch (err) {
        console.error("Update Coupon Status Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports={adminRegister,adminLogin,getCoupons,addCoupon,deleteCoupon,userHistoy,updateCouponStatus}