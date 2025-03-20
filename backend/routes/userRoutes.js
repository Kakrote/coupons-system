const express=require('express')
const {claimCoupon}=require('../controllers/usercontroller')
const rateLimiter=require('../middleware/rateLimiter')
const router=express.Router()

router.post('/claim',rateLimiter,claimCoupon)

module.exports=router
