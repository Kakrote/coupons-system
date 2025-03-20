const mongoose=require('mongoose')

const couponSchema=mongoose.Schema({
  code: { type: String, required: true, unique: true },
  status: { type: String, enum: ["available", "claimed"], default: "available" },
  createdAt: { type: Date, default: Date.now },
})

module.exports=mongoose.model('Coupon', couponSchema)
