const mongoose=require('mongoose')

const userClaimSchema=mongoose.Schema({
ip: { type: String, required: true },
  sessionId: { type: String, required: true },
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
  claimedAt: { type: Date, default: Date.now },
})

module.exports=mongoose.model('UserClaim', userClaimSchema)