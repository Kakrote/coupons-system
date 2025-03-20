const express=require('express')
const {adminRegister,adminLogin,getCoupons,addCoupon,deleteCoupon,userHistoy,updateCouponStatus}=require('../controllers/admincontroller')
const authMiddleware=require('../middleware/authMiddleware')

const router=express.Router()

router.post('/register',adminRegister)
router.post('/login',adminLogin)
router.get('/coupons',authMiddleware,getCoupons)
router.post('/addcoupon',authMiddleware,addCoupon)
router.delete('/deletecoupon/:id',authMiddleware,deleteCoupon)
router.get('/history',authMiddleware,userHistoy)
router.put('/coupons/:id',authMiddleware,updateCouponStatus)

module.exports=router
